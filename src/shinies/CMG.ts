import { equippedAmount, getProperty } from "kolmafia";
import { $item, $location } from "libram";
import { AdventureInfo } from "../lib/AdventureInfo";
import { nextDelayLocation } from "../lib/Delay";
import { Properties } from "../Properties";
import { Task } from "../tasks/Task";

export const CMGFreeFightsTask: Task = {
  name: "CMG Free Fights",
  subtasks: [
    {
      name: "CMG Free Fight",
      available: () => equippedAmount($item`cursed magnifying glass`) > 0 && cmgReady(),
      progress: () => doCMGFreeFight(),
      completed: () => cmgDone() || nextDelayLocation() === $location`none`,
    },
  ],
};

export function cmgDone(): boolean {
  return parseInt(getProperty(Properties.Daily.CMGFightsDone)) >= 5;
}

const CMGCountProperty = "cursedMagnifyingGlassCount";

function cmgReady(): boolean {
  return parseInt(getProperty(CMGCountProperty)) === 13;
}

function doCMGFreeFight(): AdventureInfo | void {
  const delayLoc = nextDelayLocation();
  if (delayLoc !== $location`none`) {
    return {
      location: delayLoc,
      modifiers: [],
    };
  }
}
