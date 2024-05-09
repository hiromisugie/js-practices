import { DatabaseManager } from "./src/database-manager.js";
import { MemoManager } from "./src/memo-manager.js";
import { CommandManager } from "./src/command-manager.js";

const databaseManager = new DatabaseManager("memos.sqlite3");
const memoManager = new MemoManager(databaseManager);
const commandManager = new CommandManager(memoManager);

commandManager.handleCommands();
