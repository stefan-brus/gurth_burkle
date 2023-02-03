import { equip, itemAmount, lockFamiliarEquipment, myClass } from "kolmafia";
import { $class, $item } from "libram";
import { AdventureInfo } from "../lib/AdventureInfo";
import { selectTurtleTamerGear } from "./GearTurtleTamer";

export function selectEquipment(info: AdventureInfo) {
  switch (myClass()) {
    case $class`Turtle Tamer`:
      selectTurtleTamerGear();
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
