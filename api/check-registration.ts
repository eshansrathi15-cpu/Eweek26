export default async function handler(req: any, res: any) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ error: 'Missing email parameter' });
        }

        const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = (process.env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)?.replace(/\\n/g, '\n');
        const sheetId = process.env.GOOGLE_SHEET_ID;

        if (!serviceAccountEmail || !privateKey || !sheetId) {
            console.error('Missing environment variables');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Create JWT for service account authentication
        const header = {
            alg: 'RS256',
            typ: 'JWT',
        };

        const now = Math.floor(Date.now() / 1000);
        const payload = {
            iss: serviceAccountEmail,
            scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
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
            console.error('Token exchange failed:', tokenError);
            return res.status(500).json({ error: 'Failed to authenticate with Google' });
        }

        const tokenData = await tokenResponse.json() as { access_token: string };
        const accessToken = tokenData.access_token;

        // Define sheets and ranges to check
        // BEDROCK/DEHACK use column D (index 3) for captain email
        // Others use column C (index 2) for user email
        const ranges = [
            'BEDROCK!D:D',
            'DEHACK!D:D',
            'WOLF_DALAL!C:C',
            'DELIVERY_TEAM!C:C',
            'HANGOVER!C:C',
            'RED_PAPERCLIP!C:C',
            'CROWDFUNDING!C:C',
            'KNIVES_OUT!C:C',
            'WING_TRADE!C:C'
        ];

        const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?${ranges.map(r => `ranges=${encodeURIComponent(r)}`).join('&')}`;

        const sheetsResponse = await fetch(sheetsUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!sheetsResponse.ok) {
            const sheetsError = await sheetsResponse.text();
            console.error('Sheets API error:', sheetsError);
            return res.status(500).json({ error: 'Failed to fetch from Google Sheets' });
        }

        const result = await sheetsResponse.json() as { valueRanges: Array<{ values?: string[][] }> };
        const valueRanges = result.valueRanges;

        const registeredEvents: string[] = [];
        const sheetNames = ['BEDROCK', 'DEHACK', 'WOLF_DALAL', 'DELIVERY_TEAM', 'HANGOVER', 'RED_PAPERCLIP', 'CROWDFUNDING', 'KNIVES_OUT', 'WING_TRADE'];

        valueRanges.forEach((rangeData: any, index: number) => {
            if (rangeData.values) {
                // Flatten values and check for email match (case-insensitive)
                const emails = rangeData.values.flat().map((e: string) => e?.toLowerCase().trim());
                if (emails.includes(email.toLowerCase().trim())) {
                    registeredEvents.push(sheetNames[index]);
                }
            }
        });

        // Map sheet names back to event names if necessary, or just return sheet names
        return res.status(200).json({
            success: true,
            registeredEvents
        });

    } catch (error) {
        console.error('Check registration error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
