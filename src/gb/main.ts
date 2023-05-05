import { print } from "kolmafia";
import { Commands } from "./cli/commands";

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
  const cmdArgs = argv.slice(1);

  if (!Commands.has(cmdName)) {
    print(`Unknown command: ${cmdName}`);
    
    return;
  }

  const cmd = Commands.get(cmdName)!;
  cmd.run();
}
