import sqlite3 from "sqlite3";
import { runPromise, getPromise, closePromise } from "../db-operations.js";

const db = new sqlite3.Database(":memory:");

try {
  await runPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  // 意図的にエラーを発生させるために、nullを挿入する
  const result = await runPromise(db, "INSERT INTO books(title) VALUES(?)", [
    null,
  ]);
  console.log(`新しい本が追加されました: ${result.lastID}`);
} catch (err) {
  console.error(`新しい本を追加する時のエラー: ${err.message}`);
}
try {
  // 意図的にエラーを発生させるために、存在しないusersを参照する
  const row = await getPromise(db, "SELECT * FROM users");
  if (row) {
    console.log(`取得した本: ${row.title}`);
  }
} catch (err) {
  console.error(`本を取得する時のエラー: ${err.message}`);
} finally {
  await closePromise(db);
}
