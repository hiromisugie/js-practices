import { argv } from "process";

const ARG_LENGTH_WITHOUT_COMMAND = 2;
const ARG_LENGTH_WITH_COMMAND = 3;

export class Command {
  constructor(memoApp) {
    this.memoApp = memoApp;
  }

  async handleCommands() {
    if (argv.length === ARG_LENGTH_WITHOUT_COMMAND) {
      console.log("Enter memo (Ctrl+d to exit):");
      let content = "";
      process.stdin.on("data", (data) => {
        content += data;
      });
      await new Promise((resolve) => process.stdin.on("end", resolve));
      await this.memoApp.addMemo(content.trim());
    } else if (argv.length === ARG_LENGTH_WITH_COMMAND) {
      const command = argv[2];
      switch (command) {
        case "-l":
          await this.memoApp.listMemos();
          break;
        case "-r":
          await this.memoApp.readMemo();
          break;
        case "-d":
          await this.memoApp.deleteMemo();
          break;
        default:
          console.error("Execute with l, r, or d option.");
      }
    } else {
      console.error("Only one option can be specified.");
    }
    await this.memoApp.close();
  }
}
