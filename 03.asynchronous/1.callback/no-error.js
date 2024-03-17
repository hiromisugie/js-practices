import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books(title) VALUES(?)", "独習JavaScript", function () {
      console.log(`新しい本が追加されました: ${this.lastID}`);
      db.each(
        "SELECT * FROM books",
        (_err, row) => {
          console.log(`取得した本: ${row.title}`);
        },
        () => {
          db.close();
        },
      );
    });
  },
);
