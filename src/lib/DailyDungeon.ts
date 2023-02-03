import { equippedAmount, itemAmount, Location, myBuffedstat, setProperty, Stat } from "kolmafia";
import { $item } from "libram";
import { AdventureInfo } from "./AdventureInfo";

export function haveDailyDungeonItems(): boolean {
  return itemAmount($item`eleven-foot pole`) > 0 &&
         itemAmount($item`Pick-O-Matic lockpicks`) > 0 &&
         (itemAmount($item`ring of Detect Boring Doors`) > 0 || equippedAmount($item`ring of Detect Boring Doors`) > 0);
}

export function runDailyDungeon(): AdventureInfo {
  setProperty(DoorChoice, "11");
  setProperty(TrapChoice, "2");
  setProperty(FirstChestChoice, "2");
  setProperty(SecondChestChoice, "2");
  setProperty(FatLootChoice, "1");

  return {
    location: Location.get("The Daily Dungeon"),
    modifiers: [],
    expectedNoncombat: "The Final Reward",
  };
}

const DoorChoice = "choiceAdventure692";
const TrapChoice = "choiceAdventure693";
const FirstChestChoice = "choiceAdventure690";
const SecondChestChoice = "choiceAdventure691";
const FatLootChoice = "choiceAdventure689";
