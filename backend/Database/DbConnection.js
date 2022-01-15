import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

const connection = async () => {
  try {
    await pool.connect();
    console.log("Database connected successful!!!!!!");
  } catch (error) {
    console.log(error.message);
  }
};
connection();

export { pool as default };
