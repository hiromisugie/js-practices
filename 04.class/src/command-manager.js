import { argv } from "process";

const ARG_LENGTH_WITHOUT_COMMAND = 2;
const ARG_LENGTH_WITH_COMMAND = 3;

export class CommandManager {
  constructor(memoManager) {
    this.memoManager = memoManager;
  }

  async handleCommands() {
    if (argv.length === ARG_LENGTH_WITHOUT_COMMAND) {
      console.log("Enter memo (Ctrl+d to exit):");
      let content = "";
      process.stdin.on("data", (data) => {
        content += data;
      });
      await new Promise((resolve) => process.stdin.on("end", resolve));
      await this.memoManager.addMemo(content.trim());
    } else if (argv.length === ARG_LENGTH_WITH_COMMAND) {
      const command = argv[2];
      switch (command) {
        case "-l":
          await this.memoManager.listMemos();
          break;
        case "-r":
          await this.memoManager.readMemo();
          break;
        case "-d":
          await this.memoManager.deleteMemo();
          break;
        default:
          console.error("Execute with l, r, or d option.");
      }
    } else {
      console.error("Only one option can be specified.");
    }
    await this.memoManager.databaseManager.close();
  }
}
