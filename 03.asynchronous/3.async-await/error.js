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

// レコードを追加し、自動採番されたIDを標準出力に出力する
async function insertRecord(db) {
  try {
    // db.runをPromiseにラップし、非同期処理にした上で意図的にエラーを発生させる
    const result = await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO numbers(non_existent_column) VALUES(?)",
        [1],
        function (err) {
          if (err) reject(err);
          else resolve(this);
        },
      );
    });
    console.log(`次のIDが自動採番されました: ${result.lastID}`);
  } catch (err) {
    console.error(`レコード追加時のエラー: ${err.message}`);
  }
  return db; // 処理の成功・失敗に関わらずdbオブジェクトを返して処理を続ける
}

// レコードを取得し、IDを標準出力に出力する
async function selectRecord(db) {
  try {
    // db.getをPromiseにラップし、非同期処理にした上で意図的にエラーを発生させる
    const row = await new Promise((resolve, reject) => {
      db.get(
        "SELECT non_existent_column FROM numbers",
        [],
        function (err, row) {
          if (err) reject(err);
          else resolve(row);
        },
      );
    });
    console.log(`次のIDが取得されました: ${row.id}`);
  } catch (err) {
    console.error(`レコード取得時のエラー: ${err.message}`);
  }
  return db; // 処理の成功・失敗に関わらずdbオブジェクトを返して処理を続ける
}

// データベースを閉じる
function closeDatabase(db) {
  return new Promise(function (resolve) {
    db.close(function () {
      resolve();
    });
  });
}

async function main() {
  const db = await openDatabase();
  await createTable(db);
  await insertRecord(db);
  await selectRecord(db);
  await closeDatabase(db);
}

main();
