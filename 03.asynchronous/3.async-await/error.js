import { db, runPromise, getAllPromise } from "../functions.js";

async function main() {
  try {
    await runPromise("CREATE TABLE numbers(id INTEGER PRIMARY KEY AUTOINCREMENT)");
    try {
      const id = await runPromise("INSERT INTO numbers(non_existent_column) VALUES(?)");
      console.log(`次のIDが自動採番されました: ${id}`);
    } catch (error) {
      console.error('レコード追加時のエラーが発生しました:', error);
    }
    const rows = await getAllPromise("SELECT * FROM non_existent_column");
    rows.forEach(function (row) {
      console.log(`次のIDが取得されました: ${row.id}`);
    });
  } catch (error) {
    console.error('レコード取得時のエラーが発生しました:', error);
  } finally {
    db.close();
  }
}

main();
