import { equip, itemAmount, lockFamiliarEquipment, myClass, Slot } from "kolmafia";
import { $class, $item, $location, $slot } from "libram";
import { AdventureInfo } from "../lib/AdventureInfo";
import { selectTurtleTamerGear } from "./GearTurtleTamer";

export function selectEquipment(info: AdventureInfo) {
  const reservedSlots = selectAdventureEquipment(info);

  switch (myClass()) {
    case $class`Turtle Tamer`:
      selectTurtleTamerGear(reservedSlots);
      break;
    default:
      throw new Error("No gear selection logic for " + myClass().toString());
  }

  selectFamiliarEquipment();
}

function selectFamiliarEquipment() {
  if (itemAmount($item`astral pet sweater`) > 0) {
    equip($item`astral pet sweater`);
    lockFamiliarEquipment(true);
  }
}

function selectAdventureEquipment(info: AdventureInfo): Slot[] {
  let result: Slot[] = [];

  if (info.location === $location`The Daily Dungeon`) {
    equip($slot`acc3`, $item`ring of Detect Boring Doors`);
    result.push($slot`acc3`);
  }

  return result;
}
