import { equip, haveOutfit, itemAmount, lockFamiliarEquipment, myClass, outfit, Slot } from "kolmafia";
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

  switch (info.location) {
    case $location`The Daily Dungeon`:
      equip($slot`acc3`, $item`ring of Detect Boring Doors`);
      result.push($slot`acc3`);
      break;
    case $location`Cobb's Knob Barracks`:
    case $location`Cobb's Knob Kitchens`:
    case $location`Throne Room`:
      if (haveOutfit("Knob Goblin Elite Guard Uniform")) {
        if (!outfit("Knob Goblin Elite Guard Uniform")) {
          throw new Error("Unable to equip Knob Goblin Elite Guard Uniform outfit");
        }
        
        result.push($slot`hat`, $slot`weapon`, $slot`pants`);
      }
      break;
    case $location`The eXtreme Slope`:
    case $location`Mist-Shrouded Peak`:
      if (haveOutfit("eXtreme Cold-Weather Gear")) {
        if (!outfit("eXtreme Cold-Weather Gear")) {
          throw new Error("Unable to equip eXtreme Cold-Weather Gear");
        }

        result.push($slot`hat`, $slot`pants`, $slot`acc1`, $slot`acc2`, $slot`acc3`);
      }
      break;
  }

  return result;
}
