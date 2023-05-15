import { Logger } from "../log/Logger";
import { Arguments } from "./Arguments";

export function ascendCommand(args: Arguments) {
  const turnsToSpend = args.valueArgs.has("turns") ? parseInt(args.valueArgs.get("turns")!) : 1000;
  Logger.info(`Ascension script starting, running for ${turnsToSpend} turns`);
}
