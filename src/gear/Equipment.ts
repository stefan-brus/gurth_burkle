import { equip, equippedAmount, haveOutfit, haveSkill, Item, itemAmount, lockFamiliarEquipment, myClass, outfit, Slot, toSlot } from "kolmafia";
import { $class, $item, $location, $skill, $slot } from "libram";
import { maxModifierReached } from "../lib/Adventure";
import { AdventureInfo } from "../lib/AdventureInfo";
import { Modifier } from "../lib/Modifier";
import { cmgDone } from "../shinies/CMG";
import { selectParkaMode } from "../shinies/Parka";
import { selectAccordionThiefGear } from "./GearAccordionThief";
import { selectDiscoBanditGear } from "./GearDiscoBandit";
import { selectPastamancerGear } from "./GearPastamancer";
import { selectSaucerorGear } from "./GearSauceror";
import { selectSealClubberGear } from "./GearSealClubber";
import { selectTurtleTamerGear } from "./GearTurtleTamer";
import { findEquippedAccSlot } from "./Utils";
import { adjustUmbrella, selectUmbrellaMode, UmbrellaModeModifiers } from "../shinies/Umbrella";

export function selectEquipment(info: AdventureInfo) {
  let reservedSlots = selectAdventureEquipment(info);
  reservedSlots = selectModifierEquipment(info, reservedSlots);
  reservedSlots = selectShinyEquipment(info, reservedSlots);
  
  switch (myClass()) {
    case $class`Seal Clubber`:
      selectSealClubberGear(reservedSlots);
      break;
    case $class`Turtle Tamer`:
      selectTurtleTamerGear(reservedSlots);
      break;
    case $class`Pastamancer`:
      selectPastamancerGear(reservedSlots);
      break;
    case $class`Sauceror`:
      selectSaucerorGear(reservedSlots);
      break;
    case $class`Disco Bandit`:
      selectDiscoBanditGear(reservedSlots);
      break;
    case $class`Accordion Thief`:
      selectAccordionThiefGear(reservedSlots);
      break;
    default:
      throw new Error("No gear selection logic for " + myClass().toString());
  }
}

export const ModifierGear: Map<Modifier, Item[]> = new Map([
  [Modifier.Muscle, [
    // hats
    $item`mesh cap`,
    
    // weapons
    $item`antique machete`,

    // pants
    $item`Orcish cargo shorts`,

    // accessories
    $item`headhunter necktie`,
    $item`Nickel Gamma of Frugality`,
    $item`badass belt`,
  ]],
  [Modifier.Combat, [
    // cloaks
    $item`thermal blanket`,
  ]],
  [Modifier.NonCombat, [
    // accessories
    $item`atlas of local maps`,
  ]],
  [Modifier.MonsterLevel, [
    // accessories
    $item`crank-powered radio on a lanyard`,
  ]],
  [Modifier.ItemDrop, [
    // hats
    $item`headlamp`,

    // accessories
    $item`Nickel Gamma of Frugality`,
    $item`autumn leaf pendant`,
    $item`observational glasses`,
  ]],
  [Modifier.Initiative, [
    // shirts
    $item`unrequired jacket`,

    // pants
    $item`grubby wool trousers`,

    // accessories
    $item`Lord Spookyraven's ear trumpet`,
    $item`sk8board`,
    $item`infernal insoles`,
  ]],
  [Modifier.DamageReduction, [
    // pants
    $item`grubby wool trousers`,
  ]],
  [Modifier.DamageAbsorption, [
    // hats
    $item`beer helmet`,

    // shirts
    $item`midriff scrubs`,
    $item`unrequired jacket`,
    $item`surgical apron`,
    $item`punk rock jacket`,

    // pants
    $item`bullet-proof corduroys`,
  ]],
  [Modifier.ColdRes, [
    // accessories,
    $item`grubby wool scarf`,
  ]],
  [Modifier.StenchRes, [
    // hats
    $item`ass hat`,
    $item`bum cheek`,

    // pants
    $item`Whoompa Fur Pants`,
    $item`Pants of the Slug Lord`,

    // accessories
    $item`grubby wool scarf`,
    $item`Pine-Fresh air freshener`,
  ]],
  [Modifier.StenchDmg, [
    // hats
    $item`grubby wool hat`,
  ]],
  [Modifier.SleazeDmg, [
    // hats
    $item`grubby wool hat`,
  ]],
]);

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
      if (itemAmount($item`survival knife`) > 0 || equippedAmount($item`survival knife`) > 0) {
        equip($slot`weapon`, $item`survival knife`);
        result.push($slot`weapon`);
      }
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
  info.modifiers.forEach(mod => {
    if (ModifierGear.has(mod) && !maxModifierReached(info, mod)) {
      reservedSlots = reservedSlots.concat(tryEquipGear(ModifierGear.get(mod)!, reservedSlots));
    }
  });

  return reservedSlots;
}

function selectShinyEquipment(info: AdventureInfo, reservedSlots: Slot[]): Slot[] {
  // June Cleaver
  if (!reservedSlots.includes($slot`weapon`)) {
    if (equippedAmount($item`June cleaver`) < 1) {
      equip($slot`weapon`, $item`June cleaver`);
    }

    reservedSlots.push($slot`weapon`);
  }
  
  // Off-hand
  if (!reservedSlots.includes($slot`off-hand`)) {
    selectShinyOffhand(info, reservedSlots);
    reservedSlots.push($slot`off-hand`);
  }

  // Parka
  if (!reservedSlots.includes($slot`shirt`) && haveSkill($skill`Torso Awareness`)) {
    if (equippedAmount($item`Jurassic Parka`) < 1) {
      equip($slot`shirt`, $item`Jurassic Parka`);
    }

    selectParkaMode(info);

    reservedSlots.push($slot`shirt`);
  }

  // Designer Sweatpants
  if (!reservedSlots.includes($slot`pants`)) {
    if (equippedAmount($item`designer sweatpants`) < 1) {
      equip($slot`pants`, $item`designer sweatpants`);
    }

    reservedSlots.push($slot`pants`);
  }

  // Combat Lover's Locket
  reservedSlots = tryEquipShinyAcc($item`combat lover's locket`, reservedSlots);

  // Cursed Monkey's Paw
  reservedSlots = tryEquipShinyAcc($item`cursed monkey's paw`, reservedSlots);

  // Cincho de Mayo
  reservedSlots = tryEquipShinyAcc($item`Cincho de Mayo`, reservedSlots);

  // Stillsuit
  if (!reservedSlots.includes($slot`familiar`)) {
    if (equippedAmount($item`tiny stillsuit`) < 1) {
      equip($slot`familiar`, $item`tiny stillsuit`);
    }

    reservedSlots.push($slot`familiar`);
  }

  return reservedSlots;
}

type ShinyOffhandPriorityInfo = {
  item: Item,
  shouldUse: (info: AdventureInfo) => boolean,
};

const ShinyOffhandPriorities: ShinyOffhandPriorityInfo[] = [
  {
    item: $item`unbreakable umbrella`,
    shouldUse: (info: AdventureInfo) => info.modifiers.some(mod => UmbrellaModeModifiers.has(mod)),
  },
  {
    item: $item`cursed magnifying glass`,
    shouldUse: () => !cmgDone(),
  },
  {
    item: $item`unbreakable umbrella`,
    shouldUse: () => true,
  },
];

function selectShinyOffhand(info: AdventureInfo, reservedSlots: Slot[]) {
  let offhandItem = $item`none`;

  for (const prio of ShinyOffhandPriorities) {
    if (prio.shouldUse(info)) {
      offhandItem = prio.item;
      break;
    }
  }

  if (offhandItem === $item`none`)
    throw new Error("Error choosing shiny offhand item")

  if (equippedAmount(offhandItem) < 1) {
    equip($slot`off-hand`, offhandItem);
  }

  if (offhandItem === $item`unbreakable umbrella`) {
    selectUmbrellaMode(info);
  }
}

function tryEquipShinyAcc(acc: Item, reservedSlots: Slot[]): Slot[] {
  if (![$slot`acc1`, $slot`acc2`, $slot`acc3`].every(slot => reservedSlots.includes(slot))) {
    let accSlot = $slot`none`;
    if (equippedAmount(acc) < 1) {
      accSlot = !reservedSlots.includes($slot`acc1`) ? $slot`acc1` : !reservedSlots.includes($slot`acc2`) ? $slot`acc2` : $slot`acc3`;
      equip(accSlot, acc);
    }
    else {
      accSlot = findEquippedAccSlot(acc);
    }

    reservedSlots.push(accSlot);
  }

  return reservedSlots;
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
    if (!result.includes(toSlot(item))) {
      const slot = tryEquipItem(item, reservedSlots);
      if (slot !== null) {
        result.push(slot);
      }
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
