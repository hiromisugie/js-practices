import { db, runPromise, getAllPromise } from "../db-operations.js";

async function main() {
  try {
    await runPromise(
      "CREATE TABLE numbers(id INTEGER PRIMARY KEY AUTOINCREMENT)",
    );
    const id = await runPromise("INSERT INTO numbers DEFAULT VALUES");
    console.log(`次のIDが自動採番されました: ${id}`);
    const rows = await getAllPromise("SELECT * FROM numbers");
    rows.forEach(function (row) {
      console.log(`次のIDが取得されました: ${row.id}`);
    });
  } finally {
    db.close();
  }
}

main();
