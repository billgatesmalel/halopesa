import { getDb } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sql = getDb();

  if (!sql) {
    return res.status(200).json({
      source: 'local_fallback',
      phone_number: '+255 628 123 456',
      account_name: 'Amina Juma Mohamed',
      balance: 485250,
      currency: 'TZS'
    });
  }

  try {
    const rows = await sql`
      SELECT phone_number, account_name, balance::float, currency 
      FROM accounts 
      WHERE phone_number = '+255 628 123 456'
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return res.status(200).json({
        source: 'neondb_default',
        phone_number: '+255 628 123 456',
        account_name: 'Amina Juma Mohamed',
        balance: 485250,
        currency: 'TZS'
      });
    }

    return res.status(200).json({ source: 'neondb', ...rows[0] });
  } catch (error) {
    console.error('Neon DB Balance Error:', error);
    return res.status(500).json({ error: 'Database query failed', message: error.message });
  }
}
