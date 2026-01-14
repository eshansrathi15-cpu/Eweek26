import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: 'api-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/register' && req.method === 'POST') {
            try {
              // Parse body
              const buffers = [];
              for await (const chunk of req) {
                buffers.push(chunk);
              }
              const data = Buffer.concat(buffers).toString();
              const body = JSON.parse(data);

              // --- LOGIC FROM api/register.ts ---
              const { sheet_name, row_data } = body;

              if (!sheet_name || !row_data || !Array.isArray(row_data)) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing sheet_name or row_data array' }));
                return;
              }

              const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL;
              const privateKey = (process.env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)?.replace(/\\n/g, '\n');
              const sheetId = process.env.GOOGLE_SHEET_ID;

              if (!serviceAccountEmail || !privateKey || !sheetId) {
                console.error('Missing environment variables');
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Server configuration error: Missing Env Vars' }));
                return;
              }

              // Create JWT for service account authentication
              const header = {
                alg: 'RS256',
                typ: 'JWT',
              };

              const now = Math.floor(Date.now() / 1000);
              const payload = {
                iss: serviceAccountEmail,
                scope: 'https://www.googleapis.com/auth/spreadsheets',
                aud: 'https://oauth2.googleapis.com/token',
                iat: now,
                exp: now + 3600,
              };

              const base64urlEncode = (obj: any) => {
                const str = JSON.stringify(obj);
                const base64 = Buffer.from(str).toString('base64');
                return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
              };

              const encodedHeader = base64urlEncode(header);
              const encodedPayload = base64urlEncode(payload);
              const signatureInput = `${encodedHeader}.${encodedPayload}`;

              const crypto = await import('crypto');
              const sign = crypto.createSign('RSA-SHA256');
              sign.update(signatureInput);
              const signature = sign.sign(privateKey, 'base64');
              const encodedSignature = signature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

              const jwt = `${signatureInput}.${encodedSignature}`;

              const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                  grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                  assertion: jwt,
                }),
              });

              if (!tokenResponse.ok) {
                const tokenError = await tokenResponse.text();
                console.error('Token exchange failed:', tokenError);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to authenticate with Google' }));
                return;
              }

              const tokenData = await tokenResponse.json();
              const accessToken = tokenData.access_token;

              const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheet_name)}!A:Z:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

              const sheetsResponse = await fetch(sheetsUrl, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  values: [row_data],
                }),
              });

              if (!sheetsResponse.ok) {
                const sheetsError = await sheetsResponse.text();
                console.error('Sheets API error:', sheetsError);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to write to Google Sheets' }));
                return;
              }

              const result = await sheetsResponse.json();
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                message: 'Registration successful',
                updatedRange: result.updates?.updatedRange
              }));
            } catch (error) {
              console.error('Middleware Error:', error);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
          } else {
            next();
          }
        });
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
