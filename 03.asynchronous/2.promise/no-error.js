import { db, runPromise, getAllPromise } from "../db-operations.js";

runPromise("CREATE TABLE numbers(id INTEGER PRIMARY KEY AUTOINCREMENT)")
  .then(() => runPromise("INSERT INTO numbers DEFAULT VALUES"))
  .then(function (id) {
    console.log(`次のIDが自動採番されました: ${id}`);
    return getAllPromise("SELECT * FROM numbers");
  })
  .then(function (rows) {
    rows.forEach(function (row) {
      console.log(`次のIDが取得されました: ${row.id}`);
    });
  })
  .finally(function () {
    db.close();
  });
