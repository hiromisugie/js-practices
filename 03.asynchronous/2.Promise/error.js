import sqlite3 from "sqlite3";

// データベースを開く
function openDatabase() {
  return new Promise(function (resolve) {
    const db = new sqlite3.Database(":memory:", function () {
      resolve(db);
    });
  });
}

// テーブルを作成する
function createTable(db) {
  return new Promise(function (resolve) {
    db.run(
      "CREATE TABLE numbers(id INTEGER PRIMARY KEY AUTOINCREMENT)",
      function () {
        resolve(db);
      },
    );
  });
}

// レコードを追加し、自動裁判されたIDを標準出力に出力する
function insertRecord(db) {
  return new Promise(function (resolve) {
    // 存在しないカラムへの挿入を試み、意図的にエラーを発生させる
    db.run(
      "INSERT INTO numbers(non_existent_column) VALUES(?)",
      [1],
      function (err) {
        if (err) {
          console.error(`レコード追加時のエラー: ${err.message}`);
          resolve(db);
        } else {
          console.log(`次のIDが自動採番されました: ${this.lastID}`);
          resolve(db);
        }
      },
    );
  });
}

// レコードを取得し、IDを標準出力に出力する
function selectRecord(db) {
  return new Promise(function (resolve) {
    // 存在しないカラムの選択を試み、意図的にエラーを発生させる
    db.get("SELECT non_existent_column FROM numbers", function (err, row) {
      if (err) {
        console.error(`レコード取得時のエラー: ${err.message}`);
        resolve(db);
      } else {
        console.log(`次のIDが取得されました: ${row.id}`);
      }
      resolve(db);
    });
  });
}

// データベースを閉じる
function closeDatabase(db) {
  return new Promise(function (resolve) {
    db.close(function () {
      resolve();
    });
  });
}

function main() {
  openDatabase()
    .then(createTable)
    .then(insertRecord)
    .then(selectRecord)
    .then(closeDatabase);
}

main();
