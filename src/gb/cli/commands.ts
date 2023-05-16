import { ascendCommand } from "./cmd/Ascend";
import { Command } from "./Command";
import { statusCommand } from "./cmd/Status";

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
