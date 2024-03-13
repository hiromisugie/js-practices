import { db, runPromise, getAllPromise } from "../functions.js";

runPromise("CREATE TABLE numbers(id INTEGER PRIMARY KEY AUTOINCREMENT)")
  .then(() => runPromise("INSERT INTO numbers(non_existent_column) VALUES(?)"))
  .then(function (id) {
    console.log(`次のIDが自動採番されました: ${id}`);
    return getAllPromise("SELECT * FROM numbers");
  })
  .catch(function () {
    return getAllPromise("SELECT FROM non_existent_column").catch(
      function (error) {
        console.error("レコード追加時のエラーが発生しました:", error);
      },
    );
  })
  .then(function (rows) {
    rows.forEach(function (row) {
      console.log(`次のIDが取得されました: ${row.id}`);
    });
  })
  .catch(function () {
    return getAllPromise("SELECT FROM non_existent_column").catch(
      function (error) {
        console.error("レコード取得時のエラーが発生しました:", error);
      },
    );
  })
  .finally(function () {
    db.close();
  });
