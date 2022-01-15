import pool from "./DbConnection.js";

class Operations {
  constructor(tableName) {
    this.tableName = tableName;
  }
  async selectByColumn(column_name, params, operator = "=") {
    const query = {
      text: `SELECT * FROM ${this.tableName} WHERE ${column_name} ${operator} $1`,
      values: [params],
    };
    try {
      const results = await pool.query(query);
      return results;
    } catch (error) {
      console.log(`Error on select ${error}`);
    }
  }
  async insertData(data) {
    const params = [];
    const chunks = [];
    const values = [];
    const keys = [];
    Object.keys(data).forEach((key) => {
      keys.push(key);
      params.push(data[key]);
      values.push(`$${params.length}`);
    });
    chunks.push(`(${values.join(", ")})`);
    try {
      const insertQuery = {
        text: `INSERT INTO ${this.tableName} (${keys.join(
          ","
        )}) VALUES ${chunks.join(",")} RETURNING *`,
        values: params,
      };
      const results = await pool.query(insertQuery);
      return results;
    } catch (error) {
      console.log(`Error on Insert ${error}`);
    }
  }
}

export { Operations as default };
