"use strict";

import minimist from "minimist";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";

// メイン関数
function main() {
  let { year, month } = getYearMonth();
  if (year && month) {
    displayCalendar(year, month);
  } else if (year) {
    displayCalendar(year, new Date().getMonth() + 1);
  } else if (month) {
    displayCalendar(new Date().getFullYear(), month);
  } else {
    displayCalendar(new Date().getFullYear(), new Date().getMonth() + 1);
  }
}

// コマンドライン引数から年月を取得
function getYearMonth() {
  let argv = minimist(process.argv.slice(2));
  let year = argv.y;
  let month = argv.m;
  return { year, month };
}

// 指定された年月のカレンダー（年・月・曜日を含む）を表示
function displayCalendar(year, month) {
  console.log(format(new Date(year, month - 1), "     M月 yyyy"));
  console.log("日 月 火 水 木 金 土");
  displayDaysOfMonth(year, month);
}

// 指定された年月のカレンダー（日付部分のみ）を表示
function displayDaysOfMonth(year, month) {
  let date = new Date(year, month - 1);
  let start = startOfMonth(date);
  let end = endOfMonth(date);
  let eachDay = eachDayOfInterval({ start, end });

  let firstDayWeekDay = getDay(start);
  let margin = "   ".repeat(firstDayWeekDay);
  let calendarString = "";

  eachDay.forEach((day) => {
    calendarString += format(day, "d").padStart(2, " ") + " ";
    if (getDay(day) === 6) {
      calendarString += "\n";
    }
  });

  console.log(margin + calendarString);
}

// メイン関数を実行
main();
