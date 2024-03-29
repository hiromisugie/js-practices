import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    // 意図的にエラーを発生させるために、nullを挿入する
    db.run("INSERT INTO books (title) VALUES(?)", null, function (err) {
      if (err) {
        console.error(`新しい本を追加する時のエラー: ${err.message}`);
      } else {
        console.log(`新しい本が追加されました: ${this.lastID}`);
      }
      // 意図的にエラーを発生させるために、存在しないusersを参照する
      db.get("SELECT * FROM users", (err, row) => {
        if (err) {
          console.error(`本を取得する時のエラー: ${err.message}`);
        } else {
          console.log(`取得した本: ${row.title}`);
        }
        db.close();
      });
    });
  },
);
