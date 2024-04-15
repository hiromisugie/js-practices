import sqlite3 from "sqlite3";
import { runPromise, getPromise, closePromise } from "../db-operations.js";

const db = new sqlite3.Database(":memory:");

runPromise(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() =>
    runPromise(db, "INSERT INTO books(title) VALUES(?)", "独習JavaScript"),
  )
  .then((result) => {
    console.log(`新しい本が追加されました: ${result.lastID}`);
    return getPromise(db, "SELECT * FROM books");
  })
  .then((row) => {
    console.log(`取得した本: ${row.title}`);
    return runPromise(db, "DROP TABLE books");
  })
  .then(() => closePromise(db));
