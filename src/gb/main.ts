import { print, printHtml } from "kolmafia";
import { Commands } from "./cli/commands";
import { parseArguments, printArguments } from "./cli/Arguments";

export function main(argStr: string) {
  if (!argStr) {
    print("Available commands: ")
    Commands.forEach(cmd => {
      print(cmd.name);
    });

    return;
  }

  const argv = argStr.split(" ");
  const cmdName = argv[0];
  const cmdArgs = parseArguments(argv.slice(1));
  printHtml(printArguments(cmdArgs));

  if (!Commands.has(cmdName)) {
    print(`Unknown command: ${cmdName}`);
    
    return;
  }

  const cmd = Commands.get(cmdName)!;
  cmd.run(cmdArgs);
}
