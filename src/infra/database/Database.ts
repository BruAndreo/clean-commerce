import pgp from "pg-promise";
import { config } from "dotenv";

export default class Database {
  constructor() {
    config();
  }

  private openConnection() {
    const username = process.env.POSTGRES_USERNAME;
    const password = process.env.POSTGRES_PASSWORD;
    const host = process.env.POSTGRES_HOST;
    const port = process.env.POSTGRES_PORT;
    const database = process.env.POSTGRES_DATABASE;

    const connection = pgp()(`postgres://${username}:${password}@${host}:${port}/${database}`);
    return connection;
  }

  private async closeConnection(connection: pgp.IDatabase<{}>) {
    connection.$pool.end()
  }

  protected async query(query: string, params: any = []) {
    const conn = this.openConnection()
    const result = await conn.query(query, params);
    await this.closeConnection(conn);
    return result;
  }
}
