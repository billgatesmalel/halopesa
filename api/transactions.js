import { getDb } from './db.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const sql = getDb();

  // If Neon DB is not yet connected via DATABASE_URL, return fallback mock data
  if (!sql) {
    if (req.method === 'GET') {
      return res.status(200).json({
        source: 'local_fallback',
        transactions: [
          {
            id: 'HP918274102',
            title: 'Salary Deposit (Halotel Payroll)',
            amount: 450000,
            fee: 0,
            date: 'Today, 08:30 AM',
            category: 'deposit',
            network: 'HALOPESA'
          },
          {
            id: 'LP481029482',
            title: 'LUKU Electricity TANESCO',
            amount: -30000,
            fee: 300,
            date: 'Yesterday, 06:15 PM',
            category: 'bill',
            network: 'LUKU'
          },
          {
            id: 'HP771928410',
            title: 'Sent to Juma Rashid (0622 918 201)',
            amount: -15000,
            fee: 450,
            date: '20 Nov, 02:40 PM',
            category: 'transfer',
            network: 'HALOPESA'
          },
          {
            id: 'AT192847291',
            title: 'Halotel Royal Bundle Top-up',
            amount: -10000,
            fee: 0,
            date: '19 Nov, 11:20 AM',
            category: 'airtime',
            network: 'HALOTEL'
          }
        ]
      });
    }

    if (req.method === 'POST') {
      const tx = req.body;
      return res.status(201).json({
        source: 'local_fallback',
        success: true,
        transaction: {
          id: tx.id || ('HP' + Math.floor(100000000 + Math.random() * 900000000)),
          title: tx.title || 'HaloPesa Transaction',
          amount: parseFloat(tx.amount) || 0,
          fee: parseFloat(tx.fee) || 0,
          date: 'Just now',
          category: tx.category || 'transfer',
          network: tx.network || 'HALOPESA'
        }
      });
    }
  }

  try {
    if (req.method === 'GET') {
      const rows = await sql`
        SELECT 
          tx_reference as id, 
          title, 
          amount::float, 
          fee::float, 
          category, 
          network, 
          TO_CHAR(created_at, 'DD Mon, HH12:MI AM') as date 
        FROM transactions 
        ORDER BY created_at DESC 
        LIMIT 30;
      `;
      return res.status(200).json({ source: 'neondb', transactions: rows });
    }

    if (req.method === 'POST') {
      const { id, title, amount, fee = 0, category = 'transfer', recipient = '', network = 'HALOPESA' } = req.body;
      const refId = id || ('HP' + Math.floor(100000000 + Math.random() * 900000000));
      const numAmount = parseFloat(amount);
      const numFee = parseFloat(fee);

      // Insert transaction into Neon DB
      await sql`
        INSERT INTO transactions (tx_reference, title, category, amount, fee, recipient, network)
        VALUES (${refId}, ${title}, ${category}, ${numAmount}, ${numFee}, ${recipient}, ${network});
      `;

      // Update primary account balance
      await sql`
        UPDATE accounts 
        SET balance = balance + ${numAmount} - ${numFee}, updated_at = CURRENT_TIMESTAMP
        WHERE phone_number = '+255 628 123 456';
      `;

      return res.status(201).json({
        source: 'neondb',
        success: true,
        transaction: {
          id: refId,
          title,
          amount: numAmount,
          fee: numFee,
          category,
          recipient,
          network,
          date: 'Just now'
        }
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Neon DB Query Error:', error);
    return res.status(500).json({ error: 'Database query failed', message: error.message });
  }
}
