export default async function handler(req: any, res: any) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { sheet_name, row_data } = req.body;

        if (!sheet_name || !row_data || !Array.isArray(row_data)) {
            return res.status(400).json({ error: 'Missing sheet_name or row_data array' });
        }

        const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = (process.env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)?.replace(/\\n/g, '\n');
        const sheetId = process.env.GOOGLE_SHEET_ID;

        // Debug logging (Careful not to log full keys)
        console.log(`[Register] Attempting to write to Sheet ID: ${sheetId?.slice(0, 5)}...`);
        console.log(`[Register] Target Tab: "${sheet_name}"`);
        console.log(`[Register] Service Account: ${serviceAccountEmail}`);

        if (!serviceAccountEmail || !privateKey || !sheetId) {
            console.error('[Register] Missing environment variables:', {
                hasEmail: !!serviceAccountEmail,
                hasKey: !!privateKey,
                hasSheetId: !!sheetId
            });
            return res.status(500).json({ error: 'Server configuration error (Missing Credentials)' });
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

        // Base64url encode
        const base64urlEncode = (obj: any) => {
            const str = JSON.stringify(obj);
            const base64 = Buffer.from(str).toString('base64');
            return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        };

        const encodedHeader = base64urlEncode(header);
        const encodedPayload = base64urlEncode(payload);
        const signatureInput = `${encodedHeader}.${encodedPayload}`;

        // Sign with private key
        const crypto = await import('crypto');
        const sign = crypto.createSign('RSA-SHA256');
        sign.update(signatureInput);
        const signature = sign.sign(privateKey, 'base64');
        const encodedSignature = signature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        const jwt = `${signatureInput}.${encodedSignature}`;

        // Exchange JWT for access token
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
            console.error('[Register] Token exchange failed:', tokenError);
            return res.status(500).json({ error: 'Failed to authenticate with Google (Token Exchange Failed)' });
        }

        const tokenData = await tokenResponse.json() as { access_token: string };
        const accessToken = tokenData.access_token;

        // Append data to Google Sheets
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
            const sheetsErrorRaw = await sheetsResponse.text();
            let errorMessage = `Failed to write to Google Sheets. Status: ${sheetsResponse.status}`;
            console.error('[Register] Sheets API error raw:', sheetsErrorRaw);

            try {
                const errorJson = JSON.parse(sheetsErrorRaw);
                const googleMessage = errorJson.error?.message;

                if (sheetsResponse.status === 403) {
                    errorMessage = `Permission denied. Ensure '${serviceAccountEmail}' is an Editor on the Sheet.`;
                } else if (sheetsResponse.status === 404) {
                    errorMessage = `Sheet not found. Check GOOGLE_SHEET_ID (${sheetId}).`;
                } else if (sheetsResponse.status === 400) {
                    if (googleMessage?.includes('Unable to parse range')) {
                        errorMessage = `Tab '${sheet_name}' not found in the Sheet. Please check the tab name.`;
                    } else {
                        errorMessage = `Bad Request: ${googleMessage}`;
                    }
                } else if (googleMessage) {
                    errorMessage = `Google Error: ${googleMessage}`;
                }
            } catch (e) {
                // Keep default message if parsing fails
            }

            return res.status(sheetsResponse.status).json({ error: errorMessage });
        }

        const result = await sheetsResponse.json() as { updates?: { updatedRange?: string } };
        return res.status(200).json({
            success: true,
            message: 'Registration successful',
            updatedRange: result.updates?.updatedRange
        });

    } catch (error) {
        console.error('[Register] Internal error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
