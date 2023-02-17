import { buy, cliExecute, getProperty, haveEffect, haveOutfit, Item, itemAmount, myAdventures, outfit, runCombat, sell, setProperty, use, userConfirm, visitUrl } from "kolmafia";
import { $coinmaster, $effect, $item, $location } from "libram";
import { Constants } from "../../Constants";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier } from "../../lib/Modifier";
import { shoreAdventure } from "../../lib/ShoreInc";
import { Properties } from "../../Properties";
import { Task } from "../Task";

// Part 1 - Unlock island, start war, start arena sidequest, start lighthouse sidequest
// Part 2 - Do junkyard sidequest, clear 64 fratboys, do orchard
// Part 3 - Clear battlefield, buy gauze garters & beer steins, kill hippy boss

export const L12Part1Task: Task = {
  name: "L12: Mysterious Island Part 1",
  subtasks: [
    {
      name: "Unlock Mysterious Island",
      available: () => getProperty(L12QuestProperty) === "started" && myAdventures() >= (3 + Constants.ReservedAdventures) && !islandUnlocked(),
      progress: () => unlockIsland(),
      completed: () => islandUnlocked(),
      mainstat: $location`The Battlefield (Frat Uniform)`.recommendedStat,
    },
    {
      name: "Get Frat Boy Ensemble",
      available: () => getProperty(L12QuestProperty) === "started" && islandUnlocked(),
      progress: () => getFratBoyEnsemble(),
      completed: () => haveOutfit("Frat Boy Ensemble"),
    },
    {
      name: "Get Frat Warrior Fatigues",
      available: () => getProperty(L12QuestProperty) === "started" && haveOutfit("Frat Boy Ensemble"),
      progress: () => getFratWarriorFatigues(),
      completed: () => haveOutfit("Frat Warrior Fatigues"),
    },
    {
      name: "Start the war",
      available: () => getProperty(L12QuestProperty) === "started" && haveOutfit("Frat Warrior Fatigues"),
      progress: () => startTheWar(),
      completed: () => getProperty(L12QuestProperty) !== "started",
    },
    {
      name: "Start Arena Sidequest",
      available: () => getProperty(L12QuestProperty) === "step1" && getProperty(ArenaSidequestProperty) === "none",
      progress: () => visitArenaSidequest(),
      completed: () => itemAmount($item`rock band flyers`) > 0,
    },
    {
      name: "Start Lighthouse Sidequest",
      available: () => getProperty(L12QuestProperty) === "step1" && getProperty(LighthouseSidequestProperty) === "none",
      progress: () => visitLighthouseSidequest(),
      completed: () => getProperty(Properties.Ascension.LighthouseSidequestStarted) === "true",
    },
    {
      name: "Finish Arena Sidequest",
      available: () => getProperty(L12QuestProperty) === "step1" && getProperty(ArenaSidequestProperty) === "none" && parseInt(getProperty(FlyeredMLProperty)) >= 10000,
      progress: () => visitArenaSidequest(),
      completed: () => getProperty(ArenaSidequestProperty) !== "none",
    },
    {
      name: "Finish Lighthouse Sidequest",
      available: () => getProperty(L12QuestProperty) === "step1" && getProperty(LighthouseSidequestProperty) === "none" && itemAmount($item`barrel of gunpowder`) >= 5,
      progress: () => visitLighthouseSidequest(),
      completed: () => getProperty(LighthouseSidequestProperty) !== "none",
    },
  ],
};

export const L12Part2Task: Task = {
  name: "L12: Mysterious Island Part 2",
  subtasks: [
    {
      name: "Do Junkyard Sidequest",
      available: () => getProperty(L12QuestProperty) === "step1" && getProperty(JunkyardSidequestProperty) === "none" &&
                       getProperty(ArenaSidequestProperty) !== "none" && getProperty(LighthouseSidequestProperty) !== "none",
      progress: () => doJunkyardSidequest(),
      completed: () => getProperty(JunkyardSidequestProperty) !== "none",
      mainstat: $location`The Battlefield (Frat Uniform)`.recommendedStat,
    },
    {
      name: "Unlock Orchard",
      available: () => getProperty(L12QuestProperty) === "step1" && getProperty(JunkyardSidequestProperty) !== "none" &&
                       getProperty(ArenaSidequestProperty) !== "none" && getProperty(LighthouseSidequestProperty) !== "none" && 
                       parseInt(getProperty(HippiesDefeatedProperty)) < 64,
      progress: () => { return { location: $location`The Battlefield (Frat Uniform)`, modifiers: [] }; },
      completed: () => parseInt(getProperty(HippiesDefeatedProperty)) >= 64,
      mainstat: $location`The Battlefield (Frat Uniform)`.recommendedStat,
    },
    {
      name: "Do Orchard Sidequest",
      available: () => getProperty(L12QuestProperty) === "step1" && getProperty(OrchardSidequestProperty) === "none" && parseInt(getProperty(HippiesDefeatedProperty)) >= 64,
      progress: () => doOrchardSidequest(),
      completed: () => getProperty(OrchardSidequestProperty) !== "none",
      mainstat: $location`The Battlefield (Frat Uniform)`.recommendedStat,
    },
  ],
};

export const L12Part3Task: Task = {
  name: "L12: Mysterious Island Part 3",
  subtasks: [
    {
      name: "Clear Battlefield",
      available: () => getProperty(L12QuestProperty) === "step1" && getProperty(OrchardSidequestProperty) !== "none",
      progress: () => { return { location: $location`The Battlefield (Frat Uniform)`, modifiers: []}; },
      completed: () => parseInt(getProperty(HippiesDefeatedProperty)) >= 1000,
    },
    {
      name: "Trade with Quartersmaster",
      available: () => getProperty(L12QuestProperty) === "step1" && parseInt(getProperty(HippiesDefeatedProperty)) >= 1000 && 
                       getProperty(Properties.Ascension.WarItemsSold) !== "true",
      progress: () => tradeWithQuartersmaster(),
      completed: () => getProperty(Properties.Ascension.WarItemsSold) === "true",
    },
    {
      name: "Kill Hippy Boss",
      available: () => getProperty(L12QuestProperty) === "step1" && getProperty(Properties.Ascension.WarItemsSold) === "true",
      progress: () => killHippyBoss(),
      completed: () => getProperty(L12QuestProperty) === "finished",
    },
  ],
};

const L12QuestProperty = "questL12War";
const IslandUnlockProperty = "lastIslandUnlock";
const HippiesDefeatedProperty = "hippiesDefeated";
const ArenaSidequestProperty = "sidequestArenaCompleted";
const FlyeredMLProperty = "flyeredML";
const LighthouseSidequestProperty = "sidequestLighthouseCompleted";
const JunkyardSidequestProperty = "sidequestJunkyardCompleted";
const OrchardSidequestProperty = "sidequestOrchardCompleted";

function islandUnlocked() {
  return parseInt(getProperty(IslandUnlockProperty)) === parseInt(getProperty("knownAscensions"));
}

function unlockIsland(): AdventureInfo | void {
  if (itemAmount($item`dinghy plans`) < 1 && itemAmount($item`Shore Inc. Ship Trip Scrip`) < 3) {
    return shoreAdventure();
  }

  if (itemAmount($item`dinghy plans`) < 1 && !buy($coinmaster`The Shore, Inc. Gift Shop`, 1, $item`dinghy plans`)) {
    throw new Error("Unable to buy dinghy plans");
  }

  if (itemAmount($item`dingy planks`) < 1 && !buy(1, $item`dingy planks`)) {
    throw new Error("Unable to buy dingy planks");
  }

  use(1, $item`dinghy plans`);
}

function getFratBoyEnsemble(): AdventureInfo {
  return {
    location: $location`Frat House`,
    modifiers: [Modifier.NonCombat],
  };
}

function getFratWarriorFatigues(): AdventureInfo {
  return {
    location: $location`Frat House`,
    modifiers: [Modifier.NonCombat],
  };
}

function startTheWar(): AdventureInfo {
  const StartWarChoice = "choiceAdventure142";
  setProperty(StartWarChoice, "3");

  return {
    location: $location`Wartime Hippy Camp (Frat Disguise)`,
    modifiers: [Modifier.NonCombat],
  };
}

function visitArenaSidequest() {
  // Sometimes Mafia tracks the flyeredML incorrectly and we need to do some more flyering...
  if (parseInt(getProperty(FlyeredMLProperty)) >= 10000 && itemAmount($item`rock band flyers`) > 0) {
    setProperty(FlyeredMLProperty, "9900");
  }
  
  outfit("Frat Warrior Fatigues");
  visitUrl("bigisland.php?place=concert");
}

function visitLighthouseSidequest() {
  outfit("Frat Warrior Fatigues");
  visitUrl("bigisland.php?place=lighthouse&action=pyro&pwd");
  setProperty(Properties.Ascension.LighthouseSidequestStarted, "true");
}

function doJunkyardSidequest(): AdventureInfo | void {
  outfit("Frat Warrior Fatigues");
  visitUrl("bigisland.php?action=junkman&pwd");

  if (getProperty(JunkyardSidequestProperty) !== "none") {
    return;
  }

  if (itemAmount($item`molybdenum magnet`) < 1) {
    throw new Error("Failed to obtain molybdenum magnet");
  }

  if (getProperty("currentJunkyardLocation") === "Yossarian") {
    visitUrl("bigisland.php?action=junkman&pwd");
  }

  return {
    location: $location`${getProperty("currentJunkyardLocation")}`,
    modifiers: [],
  };
}

function doOrchardSidequest(): AdventureInfo | void {
  outfit("Frat Warrior Fatigues");
  visitUrl("bigisland.php?place=orchard&action=stand&pwd");

  if (getProperty(OrchardSidequestProperty) !== "none") {
    return;
  }

  use(itemAmount($item`filthworm royal guard scent gland`), $item`filthworm royal guard scent gland`);
  if (haveEffect($effect`Filthworm Guard Stench`) > 0) {
    return {
      location: $location`The Filthworm Queen's Chamber`,
      modifiers: [],
    };
  }

  use(itemAmount($item`filthworm drone scent gland`), $item`filthworm drone scent gland`);
  if (haveEffect($effect`Filthworm Drone Stench`) > 0) {
    return {
      location: $location`The Royal Guard Chamber`,
      modifiers: [Modifier.ItemDrop],
    };
  }

  use(itemAmount($item`filthworm hatchling scent gland`), $item`filthworm hatchling scent gland`);
  if (haveEffect($effect`Filthworm Larva Stench`) > 0) {
    return {
      location: $location`The Feeding Chamber`,
      modifiers: [Modifier.ItemDrop],
    };
  }

  return {
    location: $location`The Hatching Chamber`,
    modifiers: [Modifier.ItemDrop],
  };
}

function tradeWithQuartersmaster() {
  const SellableItems: Item[] = [
    $item`hippy protest button`,
    $item`Lockenstock™ sandals`,
    $item`didgeridooka`,
    $item`bullet-proof corduroys`,
    $item`round purple sunglasses`,
    $item`wicker shield`,
    $item`oversized pipe`,
    $item`reinforced beaded headband`,
    $item`fire poi`,
    $item`communications windchimes`,
    $item`Gaia beads`,
    $item`pink clay bead`,
    $item`purple clay bead`,
    $item`green clay bead`,
    $item`hippy medical kit`,
    $item`flowing hippy skirt`,
    $item`round green sunglasses`,
  ];

  const QuartersProperty = "availableQuarters";

  SellableItems.forEach(item => sell(item.buyer, itemAmount(item), item));

  // Get at least 20 gauze garters + however many is needed for available quarters to be divisible by 5, then buy steins for meat
  let gauzeGarterAmount = 20;
  const availableQuarters = parseInt(getProperty(QuartersProperty));

  while ((availableQuarters - (gauzeGarterAmount * 2)) % 5 !== 0) {
    gauzeGarterAmount++;
  }

  const steinAmount = Math.floor((availableQuarters - (gauzeGarterAmount * 2)) / 5);

  if (!userConfirm(`Buy ${gauzeGarterAmount} gauze garters and ${steinAmount} steins?`)) {
    throw new Error("User aborted on buying war supplies");
  }

  buy($coinmaster`Quartersmaster`, gauzeGarterAmount, $item`gauze garter`);
  buy($coinmaster`Quartersmaster`, steinAmount, $item`commemorative war stein`);

  setProperty(Properties.Ascension.WarItemsSold, "true");
}

function killHippyBoss() {
  outfit("Frat Warrior Fatigues");
  visitUrl("bigisland.php?place=camp&whichcamp=1&confirm7=1");
  visitUrl("bigisland.php?action=bossfight&pwd");
  runCombat();
  visitUrl("main.php");
}
