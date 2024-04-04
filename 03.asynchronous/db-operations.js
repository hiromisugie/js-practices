import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");

export const runPromise = (sql, params = []) =>
  new Promise(function (resolve, reject) {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });

export const getPromise = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
