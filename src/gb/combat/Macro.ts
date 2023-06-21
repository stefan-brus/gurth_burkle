import { Location, Monster, equippedAmount, equippedItem, getProperty, haveEffect, itemAmount, itemType, myClass, myFamiliar, myLocation, setProperty, toLocation } from "kolmafia";
import { $class, $effect, $familiar, $item, $location, $monster, $skill, $slot, GreyGoose, Macro } from "libram";
import { Properties } from "../../Properties";
import { GreyGooseLocations, gooseWeight } from "../../shinies/GreyGoose";
import { CMGMonsters } from "../../shinies/CMG";
import { monkeyPawRemainingWishes } from "../../shinies/MonkeyPaw";

export function genCcsMacro(foe: Monster, loc: Location): Macro {
  const macro = new Macro();

  if (getProperty(Properties.Daily.CombatSpikes) === "true") {
    macro.trySkill($skill`Launch spikolodon spikes`);
  }

  if (loc === $location`The Hidden Bowling Alley`) {
    macro.tryItem($item`cosmic bowling ball`);
  }

  if (locationSpecific(macro, foe, loc)) {
    return macro;
  }

  if (monsterSpecific(macro, foe)) {
    return macro;
  }

  if (shouldBanish(macro, foe, loc)) {
    return macro;
  }

  if (shouldYellowRay(macro, foe)) {
    return macro;
  }

  if (shouldFreeKill(macro, foe, loc)) {
    return macro;
  }

  checkDoDrones(macro, foe, loc);
  generateCombat(macro, foe);

  return macro;
}

function locationSpecific(macro: Macro, foe: Monster, loc: Location): boolean {
  // Cigarette lighter to clear protesters
  if (loc === $location`A Mob of Zeppelin Protesters` && itemAmount($item`cigarette lighter`) > 0) {
    macro.tryItem($item`cigarette lighter`);
    return true;
  }
  
  // Glark cable for free red zeppelin fights
  if (loc === $location`The Red Zeppelin` && itemAmount($item`glark cable`) > 0 && foe !== $monster`Ron "The Weasel" Copperhead`) {
    macro.tryItem($item`glark cable`);
    return true;
  }
  
  // Shadow in Sorceress' tower
  if (loc === $location`Tower Level 5` && itemAmount($item`gauze garter`) > 2) {
    macro.tryItem($item`gauze garter`, $item`gauze garter`);
    return true;
  }

  return false;
}

function monsterSpecific(macro: Macro, foe: Monster): boolean {
  // Wall of Skin
  if (foe === $monster`wall of skin` && itemAmount($item`beehive`) > 0) {
    macro.tryItem($item`beehive`);
    return true;
  }
  
  // Wall of Bones
  if (foe === $monster`wall of bones` && itemAmount($item`electric boning knife`) > 0) {
    macro.tryItem($item`electric boning knife`);
    return true;
  }

  // Tomb rat (summon rat king)
  if (foe === $monster`tomb rat` && itemAmount($item`tangle of rat tails`) > 0) {
    macro.tryItem($item`tangle of rat tails`);
    return true;
  }

  // Bob Racecar/Racecar Bob (get photograph)
  if ((foe === $monster`Racecar Bob` || foe === $monster`Bob Racecar`) && itemAmount($item`disposable instant camera`) > 0) {
    macro.tryItem($item`disposable instant camera`);
    generateCombat(macro, foe);
    return true;
  }

  // Yossarian's tools
  const ToolMonsters = [
    $monster`batwinged  gremlin (tool)`,
    $monster`erudite gremlin (tool)`,
    $monster`spider gremlin (tool)`,
    $monster`vegetable gremlin (tool)`,
  ];

  if (ToolMonsters.includes(foe)) {
    macro.while_("!match whips out", new Macro().trySkill($skill`Sing`));
    macro.if_("match whips out", new Macro().tryItem($item`molybdenum magnet`));
    return true;
  }

  return false;
}

function shouldBanish(macro: Macro, foe: Monster, loc: Location): boolean {
  function checkUseBowlingBall(): boolean {
    if (itemAmount($item`cosmic bowling ball`) > 0) {
      macro.trySkill($skill`Bowl a Curveball`);
      return true;
    }

    return false;
  }

  function checkUseMonkeySlap(): boolean {
    const lastSlapLocationStr = getProperty(Properties.Daily.LastMonkeySlapLocation);
    const lastSlapLocation = lastSlapLocationStr.length > 0 ? toLocation(lastSlapLocationStr) : $location`none`;
    
    if (equippedAmount($item`cursed monkey's paw`) > 0 && monkeyPawRemainingWishes() === 5 && lastSlapLocation !== myLocation()) {
      setProperty(Properties.Daily.LastMonkeySlapLocation, myLocation().toString());
      macro.trySkill($skill`Monkey Slap`);
      return true;
    }

    return false;
  }

  function checkUseBatterUp(): boolean {
    const lastBatterLocationStr = getProperty(Properties.Daily.LastBatterUpLocation);
    const lastBatterLocation = lastBatterLocationStr.length > 0 ? toLocation(lastBatterLocationStr) : $location`none`;

    if (myClass() === $class`Seal Clubber` && itemType(equippedItem($slot`weapon`)) === "club" && lastBatterLocation !== myLocation()) {
      setProperty(Properties.Daily.LastBatterUpLocation, myLocation().toString());
      macro.trySkill($skill`Batter Up!`);
      return true;
    }

    return false;
  }
  
  if (BanishLocations.includes(loc) && !ImportantFoes.includes(foe) && !foe.boss && !isFreeCombat(foe, loc)) {
    return checkUseBowlingBall() || checkUseMonkeySlap() || checkUseBatterUp();
  }

  return false;
}

function shouldYellowRay(macro: Macro, foe: Monster): boolean {
  if (getProperty(Properties.Daily.CombatAcid) === "true") {
    macro.trySkill($skill`Spit jurassic acid`);
    return true;
  }

  return false;
}

function shouldFreeKill(macro: Macro, foe: Monster, loc: Location): boolean {
  if (!foe.boss && !ImportantFoes.includes(foe) && !isFreeCombat(foe, loc)) {
    const ShadowBricksProperty = "_shadowBricksUsed";
    const bricksUsed = parseInt(getProperty(ShadowBricksProperty));

    if (bricksUsed < 13 && itemAmount($item`shadow brick`) > 0) {
      macro.tryItem($item`shadow brick`);
      return true;
    }

    if (itemAmount($item`groveling gravel`) > 0) {
      macro.tryItem($item`groveling gravel`);
      return true;
    }
  }

  return false;
}

function checkDoDrones(macro: Macro, foe: Monster, loc: Location) {
  if (
    !foe.boss &&
    GreyGooseLocations.includes(loc) &&
    myFamiliar() === $familiar`Grey Goose` &&
    GreyGoose.currentDrones() < 1 && 
    gooseWeight() > 5
  ) {
    macro.trySkill($skill`Emit Matter Duplicating Drones`);
  }
}

function generateCombat(macro: Macro, foe: Monster) {
  if (isCombatTrivial())
    macro.attack();
  // TODO: Class-specific combat strategies
  else
    macro.attack();
}

function isCombatTrivial(): boolean {
  return equippedAmount($item`June Cleaver`) > 0;
}

function isFreeCombat(foe: Monster, loc: Location): boolean {
  // Doing Oliver's free fights
  if (loc === $location`An Unusually Quiet Barroom Brawl`) {
    return true;
  }

  // Fighting a CMG monster
  if (CMGMonsters.includes(foe)) {
    return true;
  }

  // Doing Rufus' shadow rift quest
  if (loc === $location`Shadow Rift (The Misspelled Cemetary)` && haveEffect($effect`Shadow Affinity`) > 0) {
    return true;
  }

  return false;
}

const ImportantFoes: Monster[] = [
  // killing jar and desk
  $monster`banshee librarian`,
  $monster`writing desk`,

  // nightstands
  $monster`elegant animated nightstand`,
  $monster`animated ornate nightstand`,
  
  // evil eye
  $monster`spiny skelelton`,
  $monster`toothy sklelton`,

  // dirty old lihc
  $monster`dirty old lihc`,

  // rusty hedge trimmer
  $monster`bearpig topiary animal`,
  $monster`elephant (meatcar?) topiary animal`,
  $monster`spider (duck?) topiary animal`,

  // stone wool
  $monster`baa-relief sheep`,

  // doctor gear
  $monster`pygmy witch surgeon`,

  // bowling ball
  $monster`pygmy bowler`,

  // bottle of Chateau de Vinegar
  $monster`possessed wine rack`,

  // blasting soda
  $monster`cabinet of Dr. Limpieza`,

  // wine bomb
  $monster`monstrous boiler`,

  // stunt nuts & dudes
  $monster`Racecar Bob`,
  $monster`Bob Racecar`,
  $monster`Drab Bard`,

  // cigarette lighters and lynyrd stuff
  $monster`Blue Oyster cultist`,
  $monster`lynyrd skinner`,

  // Ron Copperhead
  $monster`man with the red buttons`,
  $monster`red butler`,
  $monster`red skeleton`,

  // tomb ratchet
  $monster`tomb rat`,
];

const BanishLocations: Location[] = [
  $location`The Haunted Library`,
  $location`The Haunted Bedroom`,
  $location`The Defiled Niche`,
  $location`The Defiled Nook`,
  $location`Twin Peak`,
  $location`The Hidden Temple`,
  $location`The Hidden Hospital`,
  $location`The Hidden Bowling Alley`,
  $location`The Haunted Wine Cellar`,
  $location`The Haunted Laundry Room`,
  $location`The Haunted Boiler Room`,
  $location`Inside the Palindome`,
  $location`A Mob of Zeppelin Protesters`,
  $location`The Red Zeppelin`,
  $location`The Middle Chamber`,
];
