import { getProperty, haveEffect, Item, itemAmount, Monster, myClass, myLocation, setProperty, Skill, throwItem, throwItems, useSkill } from "kolmafia";
import { $class, $effect, $item, $location, $monster, $skill } from "libram";
import { Properties } from "../Properties";

type RoundCallback<State> = (foe: Monster, state: State) => [string, State];

export function combatLoop<State>(foe: Monster, page: string, doRound: RoundCallback<State>, initState: State) {
  let lastResult = page;
  let state = initState;

  updateCMGState(foe);

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
  $monster`Baa'baa'bu'ran`,

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

function checkDoFreeKill(foe: Monster): string | void {
  if (foe.boss || ImportantFoes.includes(foe) || isFreeCombat(foe)) {
    return;
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
