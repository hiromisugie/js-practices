import enquirer from "enquirer";
const { Select } = enquirer;

export class MemoManager {
  constructor(databaseManager) {
    this.databaseManager = databaseManager;
  }

  async addMemo(input) {
    try {
      const db = await this.databaseManager.dbPromise;
      const sql = "INSERT INTO memos (memo) VALUES (?)";
      await db.run(sql, input);
      console.log("New memo added.");
    } catch (err) {
      console.error(`Error when adding a memo: ${err.message}`);
    }
  }

  async listMemos() {
    try {
      const db = await this.databaseManager.dbPromise;
      const rows = await db.all("SELECT id, memo FROM memos");
      if (rows.length === 0) {
        console.log("No memo has been registered yet.");
      } else {
        rows.forEach((row) => {
          const firstLine = this.getFirstLine(row.memo);
          console.log(`${row.memo.substring(0, firstLine)}`);
        });
      }
    } catch (err) {
      console.error(`Error when displaying memo list: ${err.message}`);
    }
  }

  async readMemo() {
    try {
      const db = await this.databaseManager.dbPromise;
      const rows = await db.all("SELECT id, memo FROM memos");
      if (rows.length === 0) {
        console.log("No memo has been registered yet.");
      } else {
        const choices = rows.map((row) => {
          const firstLine = this.getFirstLine(row.memo);
          return {
            name: `${row.memo.substring(0, firstLine)}`,
            value: row.memo,
          };
        });
        const prompt = new Select({
          name: "memo",
          message: "Choose a memo you want to see:",
          choices: choices,
        });

        const selectedName = await prompt.run();
        const fullMemo = choices.find(
          (choice) => choice.name === selectedName,
        ).value;
        console.log(fullMemo);
      }
    } catch (err) {
      console.error(`Error when displaying memo details: ${err.message}`);
    }
  }

  async deleteMemo() {
    try {
      const db = await this.databaseManager.dbPromise;
      const rows = await db.all("SELECT id, memo FROM memos");
      if (rows.length === 0) {
        console.log("No memo has been registered yet.");
      } else {
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
        });

        const selectedId = await prompt.run();
        const sql = "DELETE FROM memos WHERE id = ?";
        await db.run(sql, [parseInt(selectedId, 10)]);
        console.log("Deleted memo.");
      }
    } catch (err) {
      console.error(`Error when deleting a memo: ${err.message}`);
    }
  }

  getFirstLine(memo) {
    return memo.indexOf("\n") === -1 ? memo.length : memo.indexOf("\n");
  }
}
