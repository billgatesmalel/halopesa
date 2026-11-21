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
      agents: [
        {
          id: 1,
          agent_code: '882910',
          name: 'Halotel Direct Service Center - Mwenge',
          region: 'Dar es Salaam',
          district: 'Kinondoni',
          address: 'Old Bagamoyo Rd, Opposite Mwenge Complex',
          phone: '+255 622 100 100',
          hours: '08:00 - 20:00 (Mon - Sun)',
          is_verified: true
        },
        {
          id: 2,
          agent_code: '884102',
          name: 'Kariakoo Super Wakala - Msimbazi',
          region: 'Dar es Salaam',
          district: 'Ilala',
          address: 'Msimbazi Street near Big Bon',
          phone: '+255 628 341 902',
          hours: '07:30 - 21:00',
          is_verified: true
        }
      ]
    });
  }

  try {
    const region = req.query?.region;
    let rows;
    if (region && region !== 'All') {
      rows = await sql`
        SELECT id, agent_code, name, region, district, address, phone, hours, is_verified 
        FROM agents 
        WHERE region = ${region}
        ORDER BY name ASC;
      `;
    } else {
      rows = await sql`
        SELECT id, agent_code, name, region, district, address, phone, hours, is_verified 
        FROM agents 
        ORDER BY name ASC;
      `;
    }

    return res.status(200).json({ source: 'neondb', agents: rows });
  } catch (error) {
    console.error('Neon DB Agents Error:', error);
    return res.status(500).json({ error: 'Database query failed', message: error.message });
  }
}
