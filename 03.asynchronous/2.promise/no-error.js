import { db, runPromise, getPromise } from "../db-operations.js";

runPromise(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() =>
    runPromise("INSERT INTO books(title) VALUES(?)", ["独習JavaScript"]),
  )
  .then((result) => {
    console.log(`新しい本が追加されました: ${result.lastID}`);
    return getPromise("SELECT * FROM books");
  })
  .then((row) => {
    if (row) {
      console.log(`取得した本: ${row.title}`);
    }
  })
  .finally(() => {
    db.close();
  });
