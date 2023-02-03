import { equip, equippedItem, Item, Slot, userConfirm } from "kolmafia";
import { $item, $slot } from "libram";
import { chooseItemFromPriorityList } from "./Utils";

export function selectTurtleTamerGear(reservedSlots: Slot[]) {
  if (!reservedSlots.includes($slot`weapon`))
    selectForSlot($slot`weapon`, TurtleTamerWeapons);
  
  if (!reservedSlots.includes($slot`hat`))
    selectForSlot($slot`hat`, TurtleTamerHats);

  if (!reservedSlots.includes($slot`pants`))
    selectForSlot($slot`pants`, TurtleTamerPants);
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

function selectForSlot(slot: Slot, items: Item[]) {
  const curItem = equippedItem(slot);
  const newItem = chooseItemFromPriorityList(items, curItem);

  if (newItem !== curItem) {
    if (userConfirm(`Equip ${newItem} to slot ${slot.toString()}?`)) {
      equip(slot, newItem);
    }
    else {
      throw new Error("User aborted on equipment change");
    }
  }
}
