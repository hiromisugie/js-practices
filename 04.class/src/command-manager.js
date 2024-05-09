import { argv } from "process";

export class CommandManager {
  constructor(memoManager) {
    this.memoManager = memoManager;
  }

  async handleCommands() {
    try {
      if (argv.length === 2) {
        console.log("Enter memo (Ctrl+d to exit):");
        let content = "";
        process.stdin.on("data", (data) => {
          content += data;
        });
        await new Promise((resolve) => process.stdin.on("end", resolve));
        await this.memoManager.addMemo(content.trim());
      } else if (argv.length === 3) {
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
    } finally {
      await this.memoManager.databaseManager.close();
    }
  }
}
