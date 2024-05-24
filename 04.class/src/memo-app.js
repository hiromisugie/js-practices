import sqlite3 from "sqlite3";
import { open } from "sqlite";
import enquirer from "enquirer";
const { Select } = enquirer;

export class MemoApp {
  constructor(databaseFile) {
    this.dbPromise = open({
      filename: databaseFile,
      driver: sqlite3.Database,
    });
  }

  async fetchMemos() {
    const db = await this.dbPromise;
    return await db.all("SELECT id, memo FROM memos ORDER BY id ASC");
  }

  async addMemo(input) {
    try {
      const db = await this.dbPromise;
      const sql = "INSERT INTO memos (memo) VALUES (?)";
      await db.run(sql, input);
      console.log("New memo added.");
    } catch (err) {
      console.error(`Error when adding a memo: ${err.message}`);
    }
  }

  async listMemos() {
    try {
      const rows = await this.fetchMemos();
      if (rows.length === 0) {
        console.log("No memo has been registered yet.");
        return;
      }
      rows.forEach((row) => {
        const firstLine = this.getFirstLine(row.memo);
        console.log(`${row.memo.substring(0, firstLine)}`);
      });
    } catch (err) {
      console.error(`Error when displaying memo list: ${err.message}`);
    }
  }

  async readMemo() {
    try {
      const rows = await this.fetchMemos();
      if (rows.length === 0) {
        console.log("No memo has been registered yet.");
        return;
      }
      const choices = rows.map((row) => {
        const firstLine = this.getFirstLine(row.memo);
        return {
          name: `${row.memo.substring(0, firstLine)}`,
          value: row.id,
        };
      });
      const prompt = new Select({
        name: "memo",
        message: "Choose a memo you want to see:",
        choices: choices,
        result(names) {
          return this.map(names);
        },
      });

      const db = await this.dbPromise;
      const selectedId = await prompt.run();
      const sql = "SELECT memo FROM memos WHERE id = ?";
      const memo = await db.get(sql, [parseInt(Object.values(selectedId))]);
      console.log(memo ? memo.memo : "Memo not found.");
    } catch (err) {
      console.error(`Error when displaying memo details: ${err.message}`);
    }
  }

  async deleteMemo() {
    try {
      const rows = await this.fetchMemos();
      if (rows.length === 0) {
        console.log("No memo has been registered yet.");
        return;
      }
      const choices = rows.map((row) => {
        const firstLine = this.getFirstLine(row.memo);
        return {
          name: `${row.memo.substring(0, firstLine)}`,
          value: row.id,
        };
      });
      const prompt = new Select({
        name: "memo",
        message: "Choose a memo you want to delete:",
        choices: choices,
        result(names) {
          return this.map(names);
        },
      });

      const db = await this.dbPromise;
      const selectedId = await prompt.run();
      const sql = "DELETE FROM memos WHERE id = ?";
      await db.run(sql, [parseInt(Object.values(selectedId))]);
      console.log("Deleted memo.");
    } catch (err) {
      console.error(`Error when deleting a memo: ${err.message}`);
    }
  }

  getFirstLine(memo) {
    return memo.indexOf("\n") === -1 ? memo.length : memo.indexOf("\n");
  }

  async close() {
    const db = await this.dbPromise;
    await db.close();
  }
}
