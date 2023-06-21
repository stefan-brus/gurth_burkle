import { $location, $monster } from "libram";
import { Arguments } from "../Arguments";
import { Logger } from "../../log/Logger";
import { genCcsMacro } from "../../combat/Macro";
import { printHtml } from "kolmafia";

export function ccsMacro(args: Arguments) {
  if (!args.valueArgs.has("foe")) {
    throw new Error("ccs-macro commands expects --foe argument");
  }

  const foeStr = args.valueArgs.get("foe")!.replace(/_/g, " ");
  const foe = $monster`${foeStr}`;
  let loc = $location`none`;

  if (args.valueArgs.has("loc")) {
    const locStr = args.valueArgs.get("loc")!.replace(/_/g, " ");
    loc = $location`${locStr}`;
  }

  Logger.info(`Generating CCS macro for monster ${foe.name}`);

  const macro = genCcsMacro(foe, loc);
  printHtml(macro.toString().replace(/;/g, ";<br/>"));
}
