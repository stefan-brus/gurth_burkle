import { adv1, buy, chew, create, getProperty, handlingChoice, haveEffect, itemAmount, maximize, runChoice, setProperty, visitUrl } from "kolmafia";
import { $coinmaster, $effect, $item, $location, ensureEffect } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier } from "../../lib/Modifier";
import { checkUseClover, haveIngredients } from "../../lib/Utils";
import { Properties } from "../../Properties";
import { Task } from "../Task";

export const L13SorceressTask: Task = {
  name: "L13: Sorceress",
  subtasks: [
    {
      name: "Visit registration desk",
      available: () => getProperty(L13SorceressProperty) === "started",
      progress: () => visitDesk(),
      completed: () => getProperty(Properties.Ascension.NSRegistrationDeskVisited) === "true",
    },
    {
      name: "Register initiative contest",
      available: () => contestantsRemaining(1) === -1,
      progress: () => registerInitContest(),
      completed: () => contestantsRemaining(1) !== -1,
    },
    {
      name: "Register stat contest",
      available: () => contestantsRemaining(2) === -1,
      progress: () => registerStatContest(),
      completed: () => contestantsRemaining(2) !== -1,
    },
    {
      name: "Register element contest",
      available: () => contestantsRemaining(3) === -1,
      progress: () => registerElementContest(),
      completed: () => contestantsRemaining(3) !== -1,
    },
    {
      name: "Win contests",
      available: () => contestantsRemaining(1) > 0 || contestantsRemaining(2) > 0 || contestantsRemaining(3) > 0,
      progress: () => winContests(),
      completed: () => contestantsRemaining(1) === 0 && contestantsRemaining(2) === 0 && contestantsRemaining(3) === 0,
    },
    {
      name: "Acquire sash",
      available: () => getProperty(L13SorceressProperty) === "step2",
      progress: () => acquireSash(),
      completed: () => getProperty(L13SorceressProperty) !== "step2",
    },
    {
      name: "Meet Frank",
      available: () => getProperty(L13SorceressProperty) === "step3",
      progress: () => meetFrank(),
      completed: () => getProperty(L13SorceressProperty) !== "step3",
    },
    {
      name: "Navigate hedge maze",
      available: () => getProperty(L13SorceressProperty) === "step4",
      progress: () => doHedgeMaze(),
      completed: () => getProperty(L13SorceressProperty) !== "step4",
    },
    {
      name: "Unlock tower door",
      available: () => getProperty(L13SorceressProperty) === "step5",
      progress: () => unlockTowerDoor(),
      completed: () => getProperty(L13SorceressProperty) !== "step5",
    },
    {
      name: "Kill wall of skin",
      available: () => getProperty(L13SorceressProperty) === "step6" && itemAmount($item`beehive`) > 0,
      progress: () => { return { location: $location`Tower Level 1`, modifiers: [] }; },
      completed: () => getProperty(L13SorceressProperty) !== "step6",
    },
    {
      name: "Kill wall of meat",
      available: () => getProperty(L13SorceressProperty) === "step7",
      progress: () => killWallOfMeat(),
      completed: () => getProperty(L13SorceressProperty) !== "step7",
    },
    {
      name: "Get electric boning knife",
      available: () => getProperty(L13SorceressProperty) === "step8" && itemAmount($item`electric boning knife`) < 1,
      progress: () => getBoningKnife(),
      completed: () => itemAmount($item`electric boning knife`) > 0,
    },
    {
      name: "Kill wall of bones",
      available: () => getProperty(L13SorceressProperty) === "step8" && itemAmount($item`electric boning knife`) > 0,
      progress: () => { return { location: $location`Tower Level 3`, modifiers: [] }; },
      completed: () => getProperty(L13SorceressProperty) !== "step8",
    },
    {
      name: "Get Wand of Nagamar",
      available: () => getProperty(L13SorceressProperty) === "step9" && itemAmount($item`Wand of Nagamar`) < 1,
      progress: () => getWandOfNagamar(),
      completed: () => itemAmount($item`Wand of Nagamar`) > 0,
    },
    {
      name: "Look into mirror",
      available: () => getProperty(L13SorceressProperty) === "step9" && itemAmount($item`Wand of Nagamar`) > 0,
      progress: () => doMirror(),
      completed: () => getProperty(L13SorceressProperty) !== "step9",
    },
    {
      name: "Kill shadow",
      available: () => getProperty(L13SorceressProperty) === "step10",
      progress: () => { return { location: $location`Tower Level 5`, modifiers: [] }; },
      completed: () => getProperty(L13SorceressProperty) !== "step10",
    },
    {
      name: "Kill Naughty Sorceress",
      available: () => getProperty(L13SorceressProperty) === "step11",
      progress: () => { return { location: $location`The Naughty Sorceress' Chamber`, modifiers: [] }; },
      completed: () => getProperty(L13SorceressProperty) !== "step11",
    },
  ],
};

const L13SorceressProperty = "questL13Final";
const KeysUsedProperty = "nsTowerDoorKeysUsed";

function contestantsRemaining(contest: 1 | 2 | 3): number {
  const contestantsProperty = "nsContestants" + contest.toString();
  return parseInt(getProperty(contestantsProperty));
}

function visitDesk() {
  visitUrl("place.php?whichplace=nstower&action=ns_01_contestbooth");
  runChoice(6);
  setProperty(Properties.Ascension.NSRegistrationDeskVisited, "true");
}

function registerInitContest() {
  if (!maximize("initiative -tie", false)) {
    throw new Error("Unable to maximize init contest");
  }

  visitUrl("place.php?whichplace=nstower&action=ns_01_contestbooth");
  runChoice(1);
  runChoice(6);
}

function registerStatContest() {
  const ContestStatProperty = "nsChallenge1";
  const expression = getProperty(ContestStatProperty) + " -tie";

  if (!maximize(expression, false)) {
    throw new Error("Unable to maximize stat contest");
  }

  visitUrl("place.php?whichplace=nstower&action=ns_01_contestbooth");
  runChoice(2);
  runChoice(6);
}

function registerElementContest() {
  const ContestElementProperty = "nsChallenge2";
  const element = getProperty(ContestElementProperty);
  const expression = `${element} damage -tie, ${element} spell damage -tie`;

  if (!maximize(expression, false)) {
    throw new Error("Unable to maximize element contest");
  }

  visitUrl("place.php?whichplace=nstower&action=ns_01_contestbooth");
  runChoice(3);
  runChoice(6);
}

function winContests(): AdventureInfo {
  if (contestantsRemaining(1) > 0) {
    return {
      location: $location`Fastest Adventurer Contest`,
      modifiers: [],
    };
  }
  else if (contestantsRemaining(2) > 0) {
    return {
      location: $location`A Crowd of (Stat) Adventurers`,
      modifiers: [],
    };
  }
  else {
    return {
      location: $location`A Crowd of (Element) Adventurers`,
      modifiers: [],
    };
  }
}

function acquireSash() {
  visitUrl("place.php?whichplace=nstower&action=ns_01_contestbooth");
  runChoice(4);
}

function meetFrank() {
  visitUrl("place.php?whichplace=nstower&action=ns_02_coronation");
  runChoice(1);
  runChoice(1);
  runChoice(1);
}

function doHedgeMaze() {
  visitUrl("place.php?whichplace=nstower&action=ns_03_hedgemaze");

  while (handlingChoice()) {
    runChoice(1);
  }
}

function unlockTowerDoor() {
  // Boris
  if (!getProperty(KeysUsedProperty).includes("Boris")) {
    if (itemAmount($item`Boris's key`) < 1) {
      if (itemAmount($item`fat loot token`) < 1) {
        throw new Error("Not enough fat loot tokens for Naughty Sorceress");
      }

      buy($coinmaster`Vending Machine`, 1, $item`Boris's key`);
    }

    visitUrl("place.php?whichplace=nstower_door&action=ns_lock1");
  }

  // Jarlsberg
  if (!getProperty(KeysUsedProperty).includes("Jarlsberg")) {
    if (itemAmount($item`Jarlsberg's key`) < 1) {
      if (itemAmount($item`fat loot token`) < 1) {
        throw new Error("Not enough fat loot tokens for Naughty Sorceress");
      }

      buy($coinmaster`Vending Machine`, 1, $item`Jarlsberg's key`);
    }

    visitUrl("place.php?whichplace=nstower_door&action=ns_lock2");
  }

  // Sneaky Pete
  if (!getProperty(KeysUsedProperty).includes("Sneaky Pete")) {
    if (itemAmount($item`Sneaky Pete's key`) < 1) {
      if (itemAmount($item`fat loot token`) < 1) {
        throw new Error("Not enough fat loot tokens for Naughty Sorceress");
      }

      buy($coinmaster`Vending Machine`, 1, $item`Sneaky Pete's key`);
    }

    visitUrl("place.php?whichplace=nstower_door&action=ns_lock3");
  }

  // Richard
  if (!getProperty(KeysUsedProperty).includes("Richard")) {
    if (itemAmount($item`Richard's star key`) < 1) {
      if (!create(1, $item`Richard's star key`)) {
        throw new Error("Unable to create Richard's star key");
      }
    }

    visitUrl("place.php?whichplace=nstower_door&action=ns_lock4");
  }

  // digital
  if (!getProperty(KeysUsedProperty).includes("digital")) {
    if (itemAmount($item`digital key`) < 1) {
      throw new Error("No digital key");
    }

    visitUrl("place.php?whichplace=nstower_door&action=ns_lock5");
  }

  // skeleton
  if (!getProperty(KeysUsedProperty).includes("skeleton")) {
    if (itemAmount($item`skeleton key`) < 1) {
      if (!create(1, $item`skeleton key`)) {
        throw new Error("Unable to create skeleton key");
      }
    }

    visitUrl("place.php?whichplace=nstower_door&action=ns_lock6");
  }

  visitUrl("place.php?whichplace=nstower_door&action=ns_doorknob");
}

function killWallOfMeat(): AdventureInfo {
  const ConcertVisitedProperty = "concertVisited";
  if (getProperty(ConcertVisitedProperty) === "false")
    ensureEffect($effect`Winklered`);

  if (haveEffect($effect`Wasabi Sinuses`) < 1) {
    if (itemAmount($item`Knob Goblin nasal spray`) < 1)
      buy(1, $item`Knob Goblin nasal spray`);

    chew(1, $item`Knob Goblin nasal spray`);
  }

  if (itemAmount($item`Knob Goblin nasal spray`) < 1)
    buy(1, $item`Knob Goblin nasal spray`);

  return {
    location: $location`Tower Level 2`,
    modifiers: [Modifier.MeatDrop],
  };
}

function getBoningKnife(): AdventureInfo {
  const FreeRangeChoice = "choiceAdventure1026";
  setProperty(FreeRangeChoice, "2");

  return {
    location: $location`The Castle in the Clouds in the Sky (Ground Floor)`,
    modifiers: [Modifier.NonCombat],
  };
}

function getWandOfNagamar() {
  if (!haveIngredients($item`WA`) || !haveIngredients($item`ND`)) {
    checkUseClover("Get Wand of Nagamar parts");
    adv1($location`The Castle in the Clouds in the Sky (Basement)`);
  }

  if (!create($item`Wand of Nagamar`)) {
    throw new Error("Unable to create Wand of Nagamar");
  }
}

function doMirror(): AdventureInfo {
  const MirrorChoice = "choiceAdventure1015";
  setProperty(MirrorChoice, "1");

  return {
    location: $location`Tower Level 4`,
    modifiers: [],
  };
}
