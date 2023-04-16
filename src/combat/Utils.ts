import { equippedAmount, getProperty, haveEffect, haveSkill, Item, itemAmount, Location, Monster, myClass, myFamiliar, myLocation, setProperty, Skill, throwItem, throwItems, useSkill } from "kolmafia";
import { $class, $effect, $familiar, $item, $location, $monster, $skill, GreyGoose } from "libram";
import { Properties } from "../Properties";
import { gooseWeight, GreyGooseLocations } from "../shinies/GreyGoose";
import { currentParkaMode, ParkaMode, spikesAvailable } from "../shinies/Parka";
import { monkeyPawRemainingWishes } from "../shinies/MonkeyPaw";

type RoundCallback<State> = (foe: Monster, state: State) => [string, State];

export function combatLoop<State>(foe: Monster, page: string, doRound: RoundCallback<State>, initState: State) {
  let lastResult = page;
  let state = initState;

  updateCMGState(foe);

  const spikolodonResult = checkDoSpikes(foe);
  if (spikolodonResult !== undefined) {
    lastResult = spikolodonResult;
  }

  const bowlingBallResult = checkUseCosmicBowlingBall(foe);
  if (bowlingBallResult !== undefined) {
    const isCurveballBanish = bowlingBallResult.includes("opponent is so impressed");

    if (isCurveballBanish)
      return;

    lastResult = bowlingBallResult;
  }

  const dronesResult = checkDoDrones(foe);
  if (dronesResult !== undefined) {
    lastResult = dronesResult;
  }

  const monkeyBanishResult = checkDoMonkeySlap(foe);
  if (monkeyBanishResult !== undefined) {
    return;
  }

  const freeKillResult = checkDoFreeKill(foe);
  if (freeKillResult !== undefined) {
    lastResult = freeKillResult;
  }

  while (!combatOver(lastResult)) {
    const specialResult = checkSpecialActions(foe, lastResult);
    if (specialResult === undefined) {
      [lastResult, state] = doRound(foe, state);
    }
    else {
      lastResult = specialResult;
    }
  }
}

export function shouldThrowFlyers(): boolean {
  const FlyeredMLProperty = "flyeredML";
  return itemAmount(Item.get("rock band flyers")) > 0 && parseInt(getProperty(FlyeredMLProperty)) < 10000;
}

export const BanishLocations: Location[] = [
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

export const ImportantFoes: Monster[] = [
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

const YellowRayFoes: Monster[] = [
  $monster`War Frat 151st Infantryman`,
  $monster`Baa'baa'bu'ran`,
  $monster`pygmy janitor`,
  $monster`Knob Goblin Elite Guard Captain`,
];

const CMGMonsters: Monster[] = [
  $monster`void guy`,
  $monster`void slab`,
  $monster`void spider`,
];

function updateCMGState(foe: Monster) {
  if (CMGMonsters.includes(foe)) {
    const fightsDoneStr = getProperty(Properties.Daily.CMGFightsDone);
    if (fightsDoneStr === "") {
      setProperty(Properties.Daily.CMGFightsDone, "1");
    }
    else {
      setProperty(Properties.Daily.CMGFightsDone, (parseInt(fightsDoneStr) + 1).toString());
    }
  }
}

function checkSpecialActions(foe: Monster, page: string): string | void {
  let result = checkYossarianTools(foe, page);
  if (result !== undefined)
    return result;

  result = checkPalindomeMonster(foe);
  if (result !== undefined)
    return result;
  
  result = checkLocationSpecificActions(foe);
  if (result !== undefined)
    return result;

  result = checkMonsterSpecificActions(foe);
  if (result !== undefined)
    return result;
}

function checkDoSpikes(foe: Monster): string | void {
  // Can use spikes
  if (currentParkaMode() !== ParkaMode.Spikolodon || !spikesAvailable()) {
    return;
  }

  // Should use spikes
  if (getProperty(Properties.Daily.SpikolodonTask) !== "true" || foe.boss || ImportantFoes.includes(foe) || isFreeCombat(foe)) {
    return;
  }

  // Special case for The Hidden Apartment: Use spikes only if lawyers have not been relocated, or if we are thrice-cursed
  const lawyersDone = parseInt(getProperty("relocatePygmyLawyer")) === parseInt(getProperty("knownAscensions"));
  const thriceCursed = haveEffect($effect`Thrice-Cursed`) > 0;
  if (myLocation() === $location`The Hidden Apartment Building` && lawyersDone && !thriceCursed) {
    return;
  }

  return useSkill($skill`Launch spikolodon spikes`);
}

function checkDoMonkeySlap(foe: Monster): string | void {
  if (equippedAmount($item`cursed monkey's paw`) < 1 || monkeyPawRemainingWishes() < 5) {
    return;
  }

  if (foe.boss || ImportantFoes.includes(foe) || isFreeCombat(foe)) {
    return;
  }

  if (BanishLocations.includes(myLocation()) && !ImportantFoes.includes(foe)) {
    return useSkill($skill`Monkey Slap`);
  }
}

function checkDoFreeKill(foe: Monster): string | void {
  if (foe.boss || ImportantFoes.includes(foe) || isFreeCombat(foe)) {
    return;
  }

  if (currentParkaMode() === ParkaMode.Dilophosaur && haveEffect($effect`Everything Looks Yellow`) < 1 && YellowRayFoes.includes(foe)) {
    return useSkill($skill`Spit jurassic acid`);
  }

  const ShadowBricksProperty = "_shadowBricksUsed";
  const bricksUsed = parseInt(getProperty(ShadowBricksProperty));
  if (bricksUsed < 13 && itemAmount($item`shadow brick`) > 0) {
    return throwItem($item`shadow brick`);
  }

  if (itemAmount($item`groveling gravel`) > 0) {
    return throwItem($item`groveling gravel`);
  }
}

function checkDoDrones(foe: Monster): string | void {
  if (
    !foe.boss &&
    GreyGooseLocations.includes(myLocation()) &&
    myFamiliar() === $familiar`Grey Goose` &&
    GreyGoose.currentDrones() < 1 && 
    gooseWeight() >= 6
  ) {
    return useSkill($skill`Emit Matter Duplicating Drones`);
  }
}

function checkUseCosmicBowlingBall(foe: Monster): string | void {
  if (itemAmount($item`cosmic bowling ball`) > 0) {
    if (myLocation() === $location`The Hidden Bowling Alley`) {
      return throwItem($item`cosmic bowling ball`);
    }
    else if (BanishLocations.includes(myLocation()) && !ImportantFoes.includes(foe) && !foe.boss && !isFreeCombat(foe)) {
      return useSkill($skill`Bowl a Curveball`);
    }
  }
}

function isFreeCombat(foe: Monster): boolean {
  const loc = myLocation();

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

function combatOver(page: string): boolean {
  const combatOverRegex = /(WINWINWIN|LOSELOSELOSE)/;
  const match = page.match(combatOverRegex);

  return match != null && match.length > 0;
}

function checkYossarianTools(foe: Monster, page: string): string | void {
  const ToolMonsters = [
    $monster`batwinged  gremlin (tool)`,
    $monster`erudite gremlin (tool)`,
    $monster`spider gremlin (tool)`,
    $monster`vegetable gremlin (tool)`,
  ];

  const ToolMessages = [
    "It whips out a hammer",
    "He whips out a crescent wrench",
    "It whips out a pair of pliers",
    "It whips out a screwdriver",
  ];

  if (ToolMonsters.includes(foe)) {
    if (ToolMessages.some(msg => page.includes(msg))) {
      return throwItem($item`molybdenum magnet`);
    }
    else {
      return useSkill(myLevel0Skill());
    }
  }
}

function checkPalindomeMonster(foe: Monster): string | void {
  if (
      myLocation() === $location`Inside the Palindome` && 
      itemAmount($item`disposable instant camera`) > 0 &&
      (foe === $monster`Racecar Bob` || foe === $monster`Bob Racecar`)
  ) {
    return throwItem($item`disposable instant camera`);
  }
}

function checkLocationSpecificActions(foe: Monster): string | void {
  const loc = myLocation();

  // Cigarette lighter to clear protesters
  if (loc === $location`A Mob of Zeppelin Protesters` && itemAmount($item`cigarette lighter`) > 0)
    return throwItem($item`cigarette lighter`);
  
  // Glark cable for free red zeppelin fights
  if (loc === $location`The Red Zeppelin` && itemAmount($item`glark cable`) > 0 && foe !== $monster`Ron "The Weasel" Copperhead`)
    return throwItem($item`glark cable`);
  
  // Shadow in Sorceress' tower
  if (loc === $location`Tower Level 5` && itemAmount($item`gauze garter`) > 2)
    return throwItems($item`gauze garter`, $item`gauze garter`);
}

function checkMonsterSpecificActions(foe: Monster): string | void {
  // Wall of Skin
  if (foe === $monster`wall of skin` && itemAmount($item`beehive`) > 0)
    return throwItem($item`beehive`);
  
  // Wall of Bones
  if (foe === $monster`wall of bones` && itemAmount($item`electric boning knife`) > 0)
    return throwItem($item`electric boning knife`);

  // Tomb rat (summon rat king)
  if (foe === $monster`tomb rat` && itemAmount($item`tangle of rat tails`) > 0)
    return throwItem($item`tangle of rat tails`);
}

function myLevel0Skill(): Skill {
  switch (myClass()) {
    case $class`Seal Clubber`:
      return $skill`Clobber`;
    case $class`Turtle Tamer`:
      return $skill`Toss`;
    case $class`Pastamancer`:
      return $skill`Spaghetti Spear`;
    case $class`Sauceror`:
      return $skill`Salsaball`;
    case $class`Disco Bandit`:
      return $skill`Suckerpunch`;
    case $class`Accordion Thief`:
      return $skill`Sing`;
    default:
      throw new Error("Unknown level 0 skill for class " + myClass().toString());
  }
}
