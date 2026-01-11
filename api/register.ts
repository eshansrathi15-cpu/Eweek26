import { google } from 'googleapis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { eventName, user, registrationData } = req.body;

    if (!eventName || !user || !registrationData) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // 1. Authenticate with Service Account
        // Note: In production, use private key from env variables with proper newline handling
        const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');
        const auth = new google.auth.JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: privateKey,
            scopes: SCOPES,
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // 2. Prepare Data Row
        // Format: [Timestamp, Email, Name, Team Name, Captain Name, Captain Phone, Members...]
        // You might want to customize columns based on eventName if sheets differ significantly
        const timestamp = new Date().toISOString();

        // Flatten registration data logic depends on expected sheet columns
        // This is a generic flat mapper for the example
        const commonFields = [
            timestamp,
            user.email,
            user.name,
            registrationData.teamName || 'N/A',
            registrationData.captain?.name || 'N/A',
            registrationData.captain?.phone || 'N/A',
            registrationData.captain?.id || 'N/A',
            registrationData.numMembers || 'N/A',
        ];

        // Helper to format members
        const members = registrationData.members || [];
        const memberFields = members.map((m: any) => `${m.name} (${m.id})`).join(', ');

        const rowData = [
            ...commonFields,
            memberFields,
            JSON.stringify(registrationData) // Dump full JSON as backup in last column
        ];

        // 3. Append to Sheet
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: `${eventName}!A:H`, // targeting the sheet named after eventName
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [rowData],
            },
        });

        return res.status(200).json({ success: true, data: response.data });

    } catch (error: any) {
        console.error('Sheet Error:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}
