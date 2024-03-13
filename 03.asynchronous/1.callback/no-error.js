import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE numbers(id INTEGER PRIMARY KEY AUTOINCREMENT)",
  function () {
    db.run("INSERT INTO numbers DEFAULT VALUES", function () {
      console.log(`次のIDが自動採番されました: ${this.lastID}`);
      db.each(
        "SELECT * FROM numbers",
        function (_err, row) {
          console.log(`次のIDが取得されました: ${row.id}`);
        },
        function () {
          db.close();
        },
      );
    });
  },
);
