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

  async getValidMemos() {
    const rows = await this.fetchMemos();
    if (rows.length === 0) {
      console.log("No memo has been registered yet.");
      return;
    }
    return rows;
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
      const rows = await this.getValidMemos();
      if (!rows) return;
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
      const choicedId = await this.promptForMemoChoice(
        "Choose a memo you want to read:",
      );
      if (!choicedId) return;
      const db = await this.dbPromise;
      const sql = "SELECT memo FROM memos WHERE id = ?";
      const memo = await db.get(sql, [parseInt(Object.values(choicedId))]);
      console.log(memo ? memo.memo : "Memo not found.");
    } catch (err) {
      console.error(`Error when displaying memo details: ${err.message}`);
    }
  }

  async deleteMemo() {
    try {
      const choicedId = await this.promptForMemoChoice(
        "Choose a memo you want to delete:",
      );
      if (!choicedId) return;
      const db = await this.dbPromise;
      const sql = "DELETE FROM memos WHERE id = ?";
      await db.run(sql, [parseInt(Object.values(choicedId))]);
      console.log("Deleted memo.");
    } catch (err) {
      console.error(`Error when deleting a memo: ${err.message}`);
    }
  }

  async promptForMemoChoice(message) {
    const rows = await this.getValidMemos();
    if (!rows) return;
    const choices = rows.map((row) => {
      const firstLine = this.getFirstLine(row.memo);
      return {
        name: `${row.memo.substring(0, firstLine)}`,
        value: row.id,
      };
    });
    const prompt = new Select({
      name: "memo",
      message: message,
      choices: choices,
      result(names) {
        return this.map(names);
      },
    });
    return await prompt.run();
  }

  getFirstLine(memo) {
    return memo.indexOf("\n") === -1 ? memo.length : memo.indexOf("\n");
  }

  async close() {
    const db = await this.dbPromise;
    await db.close();
  }
}
