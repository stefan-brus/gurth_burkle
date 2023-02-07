import { getProperty, itemAmount, myInebriety, setProperty, use, visitUrl } from "kolmafia";
import { $item, $location } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier } from "../../lib/Modifier";
import { Task } from "../Task";

export function billiardsRoomDone(): boolean {
  return getProperty(Floor1QuestProperty) !== "unstarted" &&
         getProperty(Floor1QuestProperty) !== "started" &&
         getProperty(Floor1QuestProperty) !== "step1" &&
         getProperty(Floor1QuestProperty) !== "step2";
}

export const SpookyravenFloor1Task: Task = {
  name: "Spookyraven Floor 1",
  subtasks: [
    {
      name: "Read telegram from Lady Spookyraven",
      available: () => getProperty(Floor1QuestProperty) === "unstarted" && itemAmount($item`telegram from Lady Spookyraven`) > 0,
      progress: () => { use(1, $item`telegram from Lady Spookyraven`); },
      completed: () => getProperty(Floor1QuestProperty) !== "unstarted",
      mainstat: $location`The Haunted Billiards Room`.recommendedStat,
    },
    {
      name: "Get billiards room key",
      available: () => getProperty(Floor1QuestProperty) === "started",
      progress: () => getBilliardsRoomKey(),
      completed: () => getProperty(Floor1QuestProperty) !== "started",
      mainstat: $location`The Haunted Billiards Room`.recommendedStat,
    },
    {
      name: "Get library key",
      available: () => (getProperty(Floor1QuestProperty) === "step1" || getProperty(Floor1QuestProperty) === "step2") && myInebriety() >= 8 && myInebriety() <= 12,
      progress: () => getLibraryKey(),
      completed: () => getProperty(Floor1QuestProperty) !== "step1" && getProperty(Floor1QuestProperty) !== "step2",
    },
    {
      name: "Get Lady Spookyraven's necklace",
      available: () => getProperty(Floor1QuestProperty) === "step3",
      progress: () => getNecklace(),
      completed: () => getProperty(Floor1QuestProperty) !== "step3",
    },
    {
      name: "Get killing jar",
      available: () => getProperty(Floor1QuestProperty) === "step4",
      progress: () => { return { location: $location`The Haunted Library`, modifiers: [Modifier.ItemDrop] }; },
      completed: () => itemAmount($item`killing jar`) > 0,
    },
    {
      name: "Give necklace to Lady Spookyraven",
      available: () => getProperty(Floor1QuestProperty) === "step4",
      progress: () => { visitUrl("place.php?whichplace=manor1&action=manor1_ladys"); },
      completed: () => getProperty(Floor1QuestProperty) === "finished",
    },
  ],
};

export const SpookyravenFloor2Task: Task = {
  name: "Spookyraven Floor 2",
  subtasks: [
    {
      name: "Talk to Lady Spookyraven on the 2nd floor",
      available: () => getProperty(Floor2QuestProperty) === "started",
      progress: () => { visitUrl("place.php?whichplace=manor2&action=manor2_ladys"); },
      completed: () => getProperty(Floor2QuestProperty) !== "started",
      mainstat: $location`The Haunted Bedroom`.recommendedStat,
    },
    {
      name: "Get Lady Spookyraven's finest gown",
      available: () => getProperty(Floor2QuestProperty) === "step1",
      progress: () => getBedroomThings(),
      completed: () => itemAmount($item`Lady Spookyraven's finest gown`) > 0,
      mainstat: $location`The Haunted Bedroom`.recommendedStat,
    },
    {
      name: "Get Lord Spookyraven's spectacles",
      available: () => getProperty(Floor2QuestProperty) === "step1",
      progress: () => getBedroomThings(),
      completed: () => itemAmount($item`Lord Spookyraven's spectacles`) > 0,
    },
    {
      name: "Get disposable instant camera",
      available: () => getProperty(Floor2QuestProperty) === "step1",
      progress: () => getBedroomThings(),
      completed: () => itemAmount($item`disposable instant camera`) > 0,
    },
    {
      name: "Get Lady Spookyraven's dancing shoes",
      available: () => getProperty(Floor2QuestProperty) === "step1",
      progress: () => getDancingShoes(),
      completed: () => itemAmount($item`Lady Spookyraven's dancing shoes`) > 0,
    },
    {
      name: "Get Lady Spookyraven's powder puff",
      available: () => getProperty(Floor2QuestProperty) === "step1",
      progress: () => getPowderPuff(),
      completed: () => itemAmount($item`Lady Spookyraven's powder puff`) > 0,
    },
    {
      name: "Return items to Lady Spookyraven",
      available: () => getProperty(Floor2QuestProperty) === "step2",
      progress: () => { visitUrl("place.php?whichplace=manor2&action=manor2_ladys"); },
      completed: () => getProperty(Floor2QuestProperty) !== "step2",
    },
    {
      name: "Dance with Lady Spookyraven",
      available: () => getProperty(Floor2QuestProperty) === "step3",
      progress: () => doDance(),
      completed: () => getProperty(Floor2QuestProperty) === "finished",
    },
  ],
};

const Floor1QuestProperty = "questM20Necklace";
const Floor2QuestProperty = "questM21Dance";

function getBilliardsRoomKey(): AdventureInfo {
  return {
    location: $location`The Haunted Kitchen`,
    modifiers: [Modifier.HotRes, Modifier.StenchRes],
  };
}

function getLibraryKey(): AdventureInfo {
  const HustleGhostChoice = "choiceAdventure875";
  setProperty(HustleGhostChoice, "1");

  use(itemAmount($item`handful of hand chalk`), $item`handful of hand chalk`);
  
  return {
    location: $location`The Haunted Billiards Room`,
    modifiers: [Modifier.NonCombat],
  };
}

function getNecklace(): AdventureInfo {
  return {
    location: $location`The Haunted Library`,
    modifiers: [],
  };
}

function getBedroomThings(): AdventureInfo {
  const SimpleChoice = "choiceAdventure866";
  const MahoganyChoice = "choiceAdventure877";
  const OrnateChoice = "choiceAdventure878";
  const RusticChoice = "choiceAdventure879";
  const ElegantChoice = "choiceAdventure880";

  setProperty(SimpleChoice, "1");
  setProperty(MahoganyChoice, "1");
  setProperty(RusticChoice, "1");

  if (itemAmount($item`Lord Spookyraven's spectacles`) < 1) {
    setProperty(OrnateChoice, "3");
  }
  else if (itemAmount($item`disposable instant camera`) < 1) {
    setProperty(OrnateChoice, "4");
  }
  else {
    setProperty(OrnateChoice, "1");
  }

  if (itemAmount($item`Lady Spookyraven's finest gown`) < 1) {
    setProperty(ElegantChoice, "1");
  }
  else {
    setProperty(ElegantChoice, "2");
  }

  return {
    location: $location`The Haunted Bedroom`,
    modifiers: [],
  };
}

function getDancingShoes(): AdventureInfo {
  return {
    location: $location`The Haunted Gallery`,
    modifiers: [Modifier.NonCombat],
  };
}

function getPowderPuff(): AdventureInfo {
  return {
    location: $location`The Haunted Bathroom`,
    modifiers: [Modifier.NonCombat],
  };
}

function doDance(): AdventureInfo {
  return {
    location: $location`The Haunted Ballroom`,
    modifiers: [Modifier.NonCombat],
  };
}
