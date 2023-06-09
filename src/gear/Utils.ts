import { canEquip, equip, equippedItem, Item, itemAmount, Slot, userConfirm, weaponHands } from "kolmafia";
import { $slot } from "libram";
import { Config } from "../Config";

export function selectGear(
  reservedSlots: Slot[], 
  hats: Item[],
  cloaks: Item[],
  shirts: Item[],
  weapons: Item[],
  offhands: Item[],
  pants: Item[],
  accessories: Item[],
  familiar: Item[],
) {
  if (!reservedSlots.includes($slot`hat`))
    selectForSlot($slot`hat`, hats);

  if (!reservedSlots.includes($slot`back`))
    selectForSlot($slot`back`, cloaks);

  if (!reservedSlots.includes($slot`shirt`))
    selectForSlot($slot`shirt`, shirts);
    
  if (!reservedSlots.includes($slot`weapon`)) {
    if (reservedSlots.includes($slot`off-hand`))
      selectForSlot($slot`weapon`, weapons.filter(item => weaponHands(item) === 1))
    else
      selectForSlot($slot`weapon`, weapons);
  }
    
  if (!reservedSlots.includes($slot`off-hand`) && weaponHands(equippedItem($slot`weapon`)) === 1)
    selectForSlot($slot`off-hand`, offhands);

  if (!reservedSlots.includes($slot`pants`))
    selectForSlot($slot`pants`, pants);

  if (!reservedSlots.includes($slot`acc1`))
    selectForSlot($slot`acc1`, accessories);

  if (!reservedSlots.includes($slot`acc2`))
    selectForSlot($slot`acc2`, accessories);

  if (!reservedSlots.includes($slot`acc3`))
    selectForSlot($slot`acc3`, accessories);

  if (!reservedSlots.includes($slot`familiar`))
    selectForSlot($slot`familiar`, familiar);
}

export function findEquippedAccSlot(acc: Item): Slot {
  if (equippedItem($slot`acc1`) === acc)
    return $slot`acc1`;
  else if (equippedItem($slot`acc2`) === acc)
    return $slot`acc2`;
  else if (equippedItem($slot`acc3`) === acc)
    return $slot`acc3`;
  else
    throw new Error("Accessory " + acc.name + " is not equipped");
}

function selectForSlot(slot: Slot, items: Item[]) {
  const curItem = equippedItem(slot);
  const newItem = chooseItemFromPriorityList(items, curItem);

  if (newItem !== curItem && canEquip(newItem)) {
    if (!Config.PromptGear || userConfirm(`Equip ${newItem} to slot ${slot.toString()}?`)) {
      equip(slot, newItem);
    }
    else {
      throw new Error("User aborted on equipment change");
    }
  }
}

function chooseItemFromPriorityList(gearList: Item[], current: Item): Item {
  /**
   * Selects the highest priority item from the list that is available, that is of higher priority than the currently equipped one.
   */

  let result = current;

  for (const item of gearList) {
    if (item === current || itemAmount(item) > 0) {
      result = item;
      break;
    }
  }

  return result;
}
