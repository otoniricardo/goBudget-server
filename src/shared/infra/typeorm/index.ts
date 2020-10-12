import { createConnections } from 'typeorm';

createConnections();

async function createConnectionsAndRunMigrations() {
  const [connection] = await createConnections();
  await connection.runMigrations();
}

createConnectionsAndRunMigrations();
