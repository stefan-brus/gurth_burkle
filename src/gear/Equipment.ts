import { equip, equippedAmount, haveOutfit, Item, itemAmount, lockFamiliarEquipment, myClass, outfit, Slot, toSlot } from "kolmafia";
import { $class, $item, $location, $slot } from "libram";
import { AdventureInfo } from "../lib/AdventureInfo";
import { Modifier } from "../lib/Modifier";
import { selectDiscoBanditGear } from "./GearDiscoBandit";
import { selectPastamancerGear } from "./GearPastamancer";
import { selectTurtleTamerGear } from "./GearTurtleTamer";
import { findEquippedAccSlot } from "./Utils";

export function selectEquipment(info: AdventureInfo) {
  let reservedSlots = selectAdventureEquipment(info);
  reservedSlots = selectModifierEquipment(info, reservedSlots);

  switch (myClass()) {
    case $class`Turtle Tamer`:
      selectTurtleTamerGear(reservedSlots);
      break;
    case $class`Pastamancer`:
      selectPastamancerGear(reservedSlots);
      break;
    case $class`Disco Bandit`:
      selectDiscoBanditGear(reservedSlots);
      break;
    default:
      throw new Error("No gear selection logic for " + myClass().toString());
  }

  selectFamiliarEquipment();
}

const AdventureModifiers: Modifier[] = [
  Modifier.DamageAbsorption,
  Modifier.StenchRes,
]

const ModifierGear = {
  [Modifier.DamageAbsorption]: [
    $item`beer helmet`,
    $item`midriff scrubs`,
    $item`bullet-proof corduroys`,
  ],
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
      if (itemAmount($item`amulet of extreme plot significance`) > 0 || equippedAmount($item`amulet of extreme plot significance`) > 0) {
        equip($slot`acc3`, $item`amulet of extreme plot significance`);
        result.push($slot`acc3`);
      }
      if (itemAmount($item`titanium assault umbrella`) > 0 || equippedAmount($item`titanium assault umbrella`) > 0) {
        equip($slot`weapon`, $item`titanium assault umbrella`);
        result.push($slot`weapon`);
      }
      break;
    case $location`The Castle in the Clouds in the Sky (Top Floor)`:
      if (itemAmount($item`mohawk wig`) > 0 || equippedAmount($item`mohawk wig`) > 0) {
        equip($slot`hat`, $item`mohawk wig`);
        result.push($slot`hat`);
      }
      break;
    case $location`The Haunted Billiards Room`:
      if (itemAmount($item`pool cue`) > 0 || equippedAmount($item`pool cue`) > 0) {
        equip($slot`weapon`, $item`pool cue`);
        result.push($slot`weapon`);
      }
      break;
    case $location`Frat House`:
      if (haveOutfit("Frat Boy Ensemble")) {
        outfit("Frat Boy Ensemble");
        result.push($slot`hat`, $slot`weapon`, $slot`pants`);
      }
      break;
    case $location`Wartime Hippy Camp (Frat Disguise)`:
    case $location`The Battlefield (Frat Uniform)`:
    case $location`Next to that Barrel with Something Burning in it`:
    case $location`Over Where the Old Tires Are`:
    case $location`Near an Abandoned Refrigerator`:
    case $location`Out by that Rusted-Out Car`:
    case $location`The Hatching Chamber`:
    case $location`The Feeding Chamber`:
    case $location`The Royal Guard Chamber`:
    case $location`The Filthworm Queen's Chamber`:
      if (!outfit("Frat Warrior Fatigues")) {
        throw new Error("Unable to equip Frat Warrior Fatigues");
      }

      result.push($slot`hat`, $slot`pants`, findEquippedAccSlot($item`bejeweled pledge pin`));
      break;
    case $location`The Black Forest`:
      if (itemAmount($item`blackberry galoshes`) > 0 || equippedAmount($item`blackberry galoshes`) > 0) {
        equip($slot`acc3`, $item`blackberry galoshes`);
        result.push($slot`acc3`);
      }
      break;
    case $location`An Overgrown Shrine (Northwest)`:
    case $location`An Overgrown Shrine (Northeast)`:
    case $location`An Overgrown Shrine (Southwest)`:
    case $location`An Overgrown Shrine (Southeast)`:
    case $location`A Massive Ziggurat`:
      equip($slot`weapon`, $item`antique machete`);
      result.push($slot`weapon`);
      break;
    case $location`The Hidden Hospital`:
      if (itemAmount($item`half-size scalpel`) > 0 || equippedAmount($item`half-size scalpel`) > 0) {
        equip($slot`weapon`, $item`half-size scalpel`);
        result.push($slot`weapon`);
      }
      if (itemAmount($item`head mirror`) > 0 || equippedAmount($item`head mirror`) > 0) {
        equip($slot`acc2`, $item`head mirror`);
        result.push($slot`acc2`);
      }
      if (itemAmount($item`surgical mask`) > 0 || equippedAmount($item`surgical mask`) > 0) {
        equip($slot`acc3`, $item`surgical mask`);
        result.push($slot`acc3`);
      }
      if (itemAmount($item`surgical apron`) > 0 || equippedAmount($item`surgical apron`) > 0) {
        equip($slot`shirt`, $item`surgical apron`);
        result.push($slot`shirt`);
      }
      if (itemAmount($item`bloodied surgical dungarees`) > 0 || equippedAmount($item`bloodied surgical dungarees`) > 0) {
        equip($slot`pants`, $item`bloodied surgical dungarees`);
        result.push($slot`pants`);
      }
      break;
    case $location`The Haunted Boiler Room`:
      if (equip($slot`off-hand`, $item`unstable fulminate`)) {
        result.push($slot`off-hand`);
      }
      else {
        throw new Error("Need to equip unstable fulminate to adventure in The Haunted Boiler Room");
      }
      break;
    case $location`Inside the Palindome`:
      equip($slot`acc3`, $item`Talisman o' Namsilat`);
      result.push($slot`acc3`);
      break;
    case $location`The Arid, Extra-Dry Desert`:
      equip($slot`off-hand`, $item`UV-resistant compass`);
      result.push($slot`off-hand`);
      break;
    case $location`Vanya's Castle`:
    case $location`Megalo-City`:
    case $location`Hero's Field`:
    case $location`The Fungus Plains`:
      equip($slot`acc3`, $item`continuum transfunctioner`);
      result.push($slot`acc3`);
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
    case Modifier.DamageAbsorption:
    case Modifier.StenchRes:
      return tryEquipGear(ModifierGear[mod], reservedSlots);
    default:
      return [];
  }
}

function tryEquipGear(items: Item[], reservedSlots: Slot[]): Slot[] {
  let result: Slot[] = [];

  items.forEach(item => {
    if (equippedAmount(item) > 0) {
      if (toSlot(item) === $slot`acc1`) {
        result.push(findEquippedAccSlot(item));
      }
      else {
        result.push(toSlot(item));
      }
    }
  });

  items.filter(item => itemAmount(item) > 0 && equippedAmount(item) < 1).forEach(item => {
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
