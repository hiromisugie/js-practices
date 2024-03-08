import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");

export const runPromise = (sql, params = []) =>
  new Promise(function (resolve, reject) {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });

export const getAllPromise = (sql, params = []) =>
  new Promise(function (resolve, reject) {
    db.all(sql, params, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
