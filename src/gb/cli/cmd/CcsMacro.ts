import { $monster } from "libram";
import { Arguments } from "../Arguments";
import { Logger } from "../../log/Logger";

export function ccsMacro(args: Arguments) {
  if (!args.valueArgs.has("foe")) {
    throw new Error("ccs-macro commands expects --foe argument");
  }

  const foeStr = args.valueArgs.get("foe")!;
  const foe = $monster`${foeStr}`;

  Logger.info(`Generating CCS macro for monster ${foe.name}`);
}
