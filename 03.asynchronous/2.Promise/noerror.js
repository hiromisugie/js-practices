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
    db.run("INSERT INTO numbers DEFAULT VALUES", function () {
      console.log(`次のIDが自動採番されました: ${this.lastID}`);
      resolve(db);
    });
  });
}

// レコードを取得し、IDを標準出力に出力する
function selectRecord(db) {
  return new Promise(function (resolve) {
    db.each(
      "SELECT * FROM numbers",
      function (_err, row) {
        console.log(`次のIDが取得されました: ${row.id}`);
      },
      function () {
        resolve(db);
      },
    );
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
