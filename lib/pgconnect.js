// lib/db.js
import { Pool } from "pg";

let pool;

export const connectDB = () => {
  if (!pool) {
    pool = new Pool({
      user: process.env.POSTGRESQL_USER_NAME,
      host: process.env.POSTGRESQL_DB_HOST,
      database: process.env.POSTGRESQL_DB_NAME,
      password: process.env.POSTGRESQL_PASSWORD,
      port: 5432, // Change this to your PostgreSQL port
    });
  }

  return pool;
};
