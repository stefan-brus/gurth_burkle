import { ascendCommand } from "./Ascend";
import { Command } from "./Command";
import { statusCommand } from "./Status";

export const Commands: Map<string, Command> = new Map([
  ["status", {
    name: "status",
    description: "Print Gurth Burkle's status",
    run: statusCommand,
  }],
  ["ascend", {
    name: "ascend",
    description: "Ascend!",
    run: ascendCommand,
  }],
]);
