import { getProperty, itemAmount, myAscensions, setProperty, use } from "kolmafia";
import { $item, $location } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier } from "../../lib/Modifier";
import { Task } from "../Task";

export const HiddenTempleTask: Task = {
  name: "Unlock The Hidden Temple",
  subtasks: [
    {
      name: "Get tree-holed coin",
      available: () => !templeUnlocked() && itemAmount($item`tree-holed coin`) < 1 && itemAmount($item`Spooky Temple map`) < 1,
      progress: () => getTreeHoledCoin(),
      completed: () => templeUnlocked() || itemAmount($item`tree-holed coin`) > 0 || itemAmount($item`Spooky Temple map`) > 0,
      spikesTask: true,
    },
    {
      name: "Get Spooky Temple map",
      available: () => !templeUnlocked() && itemAmount($item`Spooky Temple map`) < 1,
      progress: () => getSpookyTempleMap(),
      completed: () => templeUnlocked() || itemAmount($item`Spooky Temple map`) > 0,
      spikesTask: true,
    },
    {
      name: "Get Spooky-Gro fertilizer",
      available: () => !templeUnlocked() && itemAmount($item`Spooky-Gro fertilizer`) < 1,
      progress: () => getSpookyGroFertilizer(),
      completed: () => templeUnlocked() || itemAmount($item`Spooky-Gro fertilizer`) > 0,
      spikesTask: true,
    },
    {
      name: "Get spooky sapling",
      available: () => !templeUnlocked() && itemAmount($item`spooky sapling`) < 1,
      progress: () => getSpookySapling(),
      completed: () => templeUnlocked() || itemAmount($item`spooky sapling`) > 0,
      spikesTask: true,
    },
    {
      name: "Unlock temple",
      available: () => !templeUnlocked() && itemAmount($item`Spooky Temple map`) > 0 && itemAmount($item`spooky sapling`) > 0,
      progress: () => { use(1, $item`Spooky Temple map`); },
      completed: () => templeUnlocked(),
      spikesTask: true,
    },
  ],
};

const TempleUnlockProperty = "lastTempleUnlock";

export function templeUnlocked(): boolean {
  return parseInt(getProperty(TempleUnlockProperty)) === myAscensions();
}

const ArborealChoice = "choiceAdventure502";
const RoadChoice = "choiceAdventure503";
const TreeChoice = "choiceAdventure504";
const StreamChoice = "choiceAdventure505";
const ThicketChoice = "choiceAdventure506";
const LithChoice = "choiceAdventure507";

const SpookyForestAdvInfo: AdventureInfo = {
  location: $location`The Spooky Forest`,
  modifiers: [Modifier.NonCombat],
};

function getTreeHoledCoin(): AdventureInfo {
  setProperty(ArborealChoice, "2");
  setProperty(StreamChoice, "2");

  return SpookyForestAdvInfo;
}

function getSpookyTempleMap(): AdventureInfo {
  setProperty(ArborealChoice, "3");
  setProperty(ThicketChoice, "3");
  setProperty(LithChoice, "1");

  return SpookyForestAdvInfo;
}

function getSpookyGroFertilizer(): AdventureInfo {
  setProperty(ArborealChoice, "3");
  setProperty(ThicketChoice, "2");

  return SpookyForestAdvInfo;
}

function getSpookySapling(): AdventureInfo {
  setProperty(ArborealChoice, "1");
  setProperty(RoadChoice, "3");
  setProperty(TreeChoice, "3");

  return SpookyForestAdvInfo;
}
