import { equip, haveOutfit, Item, itemAmount, lockFamiliarEquipment, myClass, outfit, Slot, toSlot } from "kolmafia";
import { $class, $item, $location, $slot } from "libram";
import { AdventureInfo } from "../lib/AdventureInfo";
import { Modifier } from "../lib/Modifier";
import { selectTurtleTamerGear } from "./GearTurtleTamer";
import { findEquippedAccSlot } from "./Utils";

export function selectEquipment(info: AdventureInfo) {
  let reservedSlots = selectAdventureEquipment(info);
  reservedSlots = selectModifierEquipment(info, reservedSlots);

  switch (myClass()) {
    case $class`Turtle Tamer`:
      selectTurtleTamerGear(reservedSlots);
      break;
    default:
      throw new Error("No gear selection logic for " + myClass().toString());
  }

  selectFamiliarEquipment();
}

const AdventureModifiers: Modifier[] = [
  Modifier.StenchRes,
]

const ModifierGear = {
  [Modifier.StenchRes]: [
    $item`Whoompa Fur Pants`,
    $item`Pants of the Slug Lord`,
    $item`ass hat`,
    $item`bum cheek`,
    $item`Pine-Fresh air freshener`,
  ],
};

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

        result.push($slot`hat`, $slot`pants`, findEquippedAccSlot($item`eXtreme mittens`));
      }
      break;
    case $location`The Castle in the Clouds in the Sky (Basement)`:
      if (itemAmount($item`amulet of extreme plot significance`) > 0) {
        equip($slot`acc3`, $item`amulet of extreme plot significance`);
        result.push($slot`acc3`);
      }
      if (itemAmount($item`titanium assault umbrella`) > 0) {
        equip($slot`weapon`, $item`titanium assault umbrella`);
        result.push($slot`weapon`);
      }
      break;
    case $location`The Castle in the Clouds in the Sky (Top Floor)`:
      if (itemAmount($item`mohawk wig`) > 0) {
        equip($slot`hat`, $item`mohawk wig`);
        result.push($slot`hat`);
      }
      break;
  }

  return result;
}

function selectModifierEquipment(info: AdventureInfo, reservedSlots: Slot[]): Slot[] {
  AdventureModifiers.forEach(mod => {
    if (info.modifiers.includes(mod)) {
      reservedSlots = reservedSlots.concat(selectEquipmentModifier(mod, reservedSlots));
    }
  });

  return reservedSlots;
}

function selectEquipmentModifier(mod: Modifier, reservedSlots: Slot[]): Slot[] {
  switch (mod) {
    case Modifier.StenchRes:
      return tryEquipGear(ModifierGear[mod], reservedSlots);
    default:
      return [];
  }
}

function tryEquipGear(items: Item[], reservedSlots: Slot[]): Slot[] {
  let result: Slot[] = [];

  items.filter(item => itemAmount(item) > 0).forEach(item => {
    const slot = tryEquipItem(item, reservedSlots);
    if (slot !== null) {
      result.push(slot);
    }
  });

  return result;
}

function tryEquipItem(item: Item, reservedSlots: Slot[]): Slot | null {
  const itemSlot = toSlot(item);
  if (itemSlot === $slot`acc1`) {
    if (reservedSlots.includes($slot`acc1`)) {
      if (reservedSlots.includes($slot`acc2`)) {
        if (!reservedSlots.includes($slot`acc3`)) {
          equip($slot`acc3`, item);
          return $slot`acc3`;
        }
      }
      else {
        equip($slot`acc2`, item);
        return $slot`acc2`;
      }
    }
    else {
      equip($slot`acc1`, item);
      return $slot`acc1`;
    }
  }
  else if (itemSlot !== $slot`none` && !reservedSlots.includes(itemSlot)) {
    equip(itemSlot, item);
    return itemSlot;
  }
  
  return null;
}
