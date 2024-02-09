import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE numbers(id INTEGER PRIMARY KEY AUTOINCREMENT)",
  function () {
    db.run(
      "INSERT INTO numbers(non_existent_column) VALUES(?)",
      [1],
      function (err) {
        if (err) {
          console.error(`レコード追加時のエラー: ${err.message}`);
        } else {
          console.log(`次のIDが自動採番されました: ${this.lastID}`);
        }
        db.get("SELECT non_existent_column FROM numbers", function (err, row) {
          if (err) {
            console.error(`レコード取得時のエラー: ${err.message}`);
          } else {
            console.log(`次のIDが取得されました: ${row.id}`);
          }
          db.close();
        });
      },
    );
  },
);
