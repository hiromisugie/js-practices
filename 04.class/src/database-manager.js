import sqlite3 from "sqlite3";
import { open } from "sqlite";

export class DatabaseManager {
  constructor(databaseFile) {
    this.dbPromise = open({
      filename: databaseFile,
      driver: sqlite3.Database,
    });
  }

  async close() {
    const db = await this.dbPromise;
    await db.close();
  }
}
