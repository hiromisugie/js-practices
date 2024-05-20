#!/usr/bin/env node

import { MemoManager } from "./src/memo-manager.js";
import { CommandManager } from "./src/command-manager.js";

const memoManager = new MemoManager("memos.sqlite3");
const commandManager = new CommandManager(memoManager);

commandManager.handleCommands();
