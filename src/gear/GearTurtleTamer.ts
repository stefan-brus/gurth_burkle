import { equip, equippedItem, Item, userConfirm } from "kolmafia";
import { $item, $slot } from "libram";
import { chooseItemFromPriorityList } from "./Utils";

export function selectTurtleTamerGear() {
  const curWeapon = equippedItem($slot`weapon`);
  const newWeapon = chooseItemFromPriorityList(TurtleTamerWeapons, curWeapon);
  if (newWeapon !== curWeapon) {
    if (userConfirm(`Equip ${newWeapon} to weapon slot?`)) {
      equip(newWeapon);
    }
    else {
      throw new Error("User aborted on equipment change");
    }
  }
  
  const curHat = equippedItem($slot`hat`);
  const newHat = chooseItemFromPriorityList(TurtleTamerHats, curHat);
  if (newHat !== curHat) {
    if (userConfirm(`Equip ${newHat} to hat slot?`)) {
      equip(newHat);
    }
    else {
      throw new Error("User aborted on equipment change");
    }
  }
  
  const curPants = equippedItem($slot`pants`);
  const newPants = chooseItemFromPriorityList(TurtleTamerPants, curPants);
  if (newPants !== curPants) {
    if (userConfirm(`Equip ${newPants} to pants slot?`)) {
      equip(newPants);
    }
    else {
      throw new Error("User aborted on equipment change");
    }
  }
}

const TurtleTamerWeapons: Item[] = [
  $item`turtle totem`,
];

const TurtleTamerHats: Item[] = [
  $item`helmet turtle`,
];

const TurtleTamerPants: Item[] = [
  $item`old sweatpants`,
];
