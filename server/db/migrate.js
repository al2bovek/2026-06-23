import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sql from '../config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function runMigrations() {
  const schema = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8');
  const data   = await fs.readFile(path.join(__dirname, 'data.sql'),   'utf8');

  await sql.unsafe(schema);
  console.log('Schema applied.');

  await sql.unsafe(data);
  console.log('Data applied.');
}