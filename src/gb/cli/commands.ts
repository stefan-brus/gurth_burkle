import { ascendCommand } from "./cmd/Ascend";
import { Command } from "./Command";
import { statusCommand } from "./cmd/Status";
import { ccsMacro } from "./cmd/CcsMacro";
import { books } from "./cmd/Books";

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
  ["ccs-macro", {
    name: "ccs-macro",
    description: "Generate a ccs macro for the given monster",
    run: ccsMacro,
  }],
  ["books", {
    name: "books",
    description: "Check what skill books we have available",
    run: books,
  }],
]);
