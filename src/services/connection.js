import pg from 'pg'
const { Pool } = pg

export const pool = new Pool({
  host: process.env.PGHOST, 
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
