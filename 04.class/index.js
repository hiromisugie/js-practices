#!/usr/bin/env node

import { MemoApp } from "./src/memo-app.js";
import { Command } from "./src/command.js";

const memoApp = new MemoApp("memos.sqlite3");
const command = new Command(memoApp);

command.handleCommands();
