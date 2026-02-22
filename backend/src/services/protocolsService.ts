import { Client } from 'pg';

const dbClient = new Client({ connectionString: process.env.DATABASE_URL });

dbClient.connect();

export async function getAllProtocols() {
  const res = await dbClient.query('SELECT * FROM protocols');
  return res.rows;
}

export async function createProtocol(name: string, description: string) {
  const res = await dbClient.query(
    'INSERT INTO protocols (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return res.rows[0];
}
