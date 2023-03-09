import { canAdventure, getProperty, itemAmount, Location, userConfirm } from "kolmafia";
import { $item, $location, AutumnAton } from "libram";
import { AdventureInfo } from "../lib/AdventureInfo";
import { estimateAdventuresRemaining } from "../lib/Organs";
import { myMainstat } from "../lib/Utils";
import { buildOrcChasmBridge } from "../tasks/ascension/L09OrcChasm";
import { Task } from "../tasks/Task";

export const UnlockFallbotLocationsTask: Task = {
  name: "Unlock locations for fallbot",
  subtasks: [
    {
      name: "Unlock locations for fallbot",
      available: () => AutumnAton.available() && hasUnlockableLocation(),
      progress: () => getUnlockableLocation(),
      completed: () => Fallbot.allLocationsUnlocked(),
    },
  ],
};

export function fallbotRoutine() {
  if (!AutumnAton.available()) {
    return;
  }

  if (AutumnAton.turnsForQuest() > estimateAdventuresRemaining()) {
    return;
  }

  Fallbot.refresh();

  for (const task of FallbotTasks) {
    if (!Fallbot.availableLocations.includes(task.location)) {
      continue;
    }

    if (!task.todo()) {
      continue;
    }

    if (userConfirm(`Send fallbot to ${task.location.toString()} for task ${task.name}?`)) {
      AutumnAton.sendTo(task.location);
      break;
    }
    else {
      throw new Error("User aborted on fallbot task " + task.name);
    }
  }
}

class Fallbot {
  static availableLocations: Location[] = [];

  static refresh() {
    AutumnAton.upgrade();
    this.availableLocations = AutumnAton.availableLocations();
  }

  static allLocationsUnlocked(): boolean {
    return LocationsToUnlock.every(loc => this.availableLocations.includes(loc));
  }

  static locationsLeftToUnlock(): Location[] {
    return LocationsToUnlock.filter(loc => !this.availableLocations.includes(loc));
  }

  static randomLocation(): Location {
    return this.availableLocations[Math.floor(Math.random() * this.availableLocations.length)];
  }
}

const LocationsToUnlock: Location[] = [
  $location`The Overgrown Lot`,
  $location`The Haunted Kitchen`,
  $location`Infernal Rackets Backstage`,
  $location`The Laugh Floor`,
  $location`Sonofa Beach`,
  $location`The Goatlet`,
  $location`The Smut Orc Logging Camp`,
  $location`Twin Peak`,
  $location`The Beanbat Chamber`,
  $location`The Hidden Temple`,
  $location`The Haunted Library`,
  $location`Whitey's Grove`,
  $location`The Hidden Bowling Alley`,
  $location`The Hole in the Sky`,
];

function hasUnlockableLocation(): boolean {
  Fallbot.refresh();

  for (const loc of Fallbot.locationsLeftToUnlock()) {
    if (canAdventure(loc) && myMainstat() > loc.recommendedStat) {
      return true;
    }
  }

  return false;
}

function getUnlockableLocation(): AdventureInfo | void {
  Fallbot.refresh();

  for (const loc of Fallbot.locationsLeftToUnlock()) {
    if (canAdventure(loc) && myMainstat() > loc.recommendedStat) {
      return {
        location: loc,
        modifiers: [],
      };
    }
  }
}

type FallbotTaskInfo = {
  name: string,
  location: Location,
  todo: () => boolean,
};

const FallbotTasks: FallbotTaskInfo[] = [
  {
    name: "Left arm upgrade",
    location: $location`The Haunted Pantry`,
    todo: () => !AutumnAton.currentUpgrades().includes("leftarm1"),
  },
  {
    name: "Left leg upgrade",
    location: $location`Noob Cave`,
    todo: () => !AutumnAton.currentUpgrades().includes("leftleg1"),
  },
  {
    name: "Right arm upgrade",
    location: $location`The Overgrown Lot`,
    todo: () => !AutumnAton.currentUpgrades().includes("rightarm1"),
  },
  {
    name: "Right leg upgrade",
    location: $location`The Haunted Kitchen`,
    todo: () => !AutumnAton.currentUpgrades().includes("rightleg1"),
  },
  {
    name: "Azazel bus passes",
    location: $location`Infernal Rackets Backstage`,
    todo: () => getProperty("questM10Azazel") !== "finished" && 
                itemAmount($item`bus pass`) < 5,
  },
  {
    name: "Azazel imp airs",
    location: $location`The Laugh Floor`,
    todo: () => getProperty("questM10Azazel") !== "finished" && 
                itemAmount($item`imp air`) < 5,
  },
  {
    name: "Barrels of gunpowder",
    location: $location`Sonofa Beach`,
    todo: () => getProperty("questL12War") === "step1" &&
                getProperty("sidequestLighthouseCompleted") === "none" &&
                itemAmount($item`barrel of gunpowder`) < 5,
  },
  {
    name: "Goat cheese",
    location: $location`The Goatlet`,
    todo: () => getProperty("questL08Trapper") === "step1" &&
                itemAmount($item`goat cheese`) < 3,
  },
  {
    name: "Bridge parts",
    location: $location`The Smut Orc Logging Camp`,
    todo: () => getProperty("questL09Topping") === "started" &&
                buildOrcChasmBridge() < 30,
  },
  {
    name: "Rusty hedge trimmers",
    location: $location`Twin Peak`,
    todo: () => getProperty("questL09Topping") === "step2" &&
                AutumnAton.turnsForQuest() === 11 &&
                parseInt(getProperty("twinPeakProgress")) < 15 &&
                itemAmount($item`rusty hedge trimmers`) < 3,
  },
  {
    name: "Enchanted bean",
    location: $location`The Beanbat Chamber`,
    todo: () => (
                  getProperty("questL10Garbage") === "unstarted" || 
                  getProperty("questL10Garbage") === "started"
                ) &&
                itemAmount($item`enchanted bean`) < 1,
  },
  {
    name: "Stone wool",
    location: $location`The Hidden Temple`,
    todo: () => (
                  getProperty("questL11Worship") === "unstarted" ||
                  getProperty("questL11Worship") === "started" ||
                  getProperty("questL11Worship") === "step1"
                ) &&
                itemAmount($item`stone wool`) < 2,
  },
  {
    name: "Lion oil & bird rib",
    location: $location`Whitey's Grove`,
    todo: () => (
                  getProperty("questL11Palindome") !== "finished" &&
                  getProperty("questL11Palindome") !== "step5" &&
                  getProperty("questL11Palindome") !== "step4"
                ) &&
                itemAmount($item`wet stunt nut stew`) < 1 &&
                (
                  itemAmount($item`lion oil`) < 1 ||
                  itemAmount($item`bird rib`) < 1
                ),
  },
  {
    name: "Bowling balls",
    location: $location`The Hidden Bowling Alley`,
    todo: () => getProperty("questL11Spare") === "started" &&
                AutumnAton.turnsForQuest() === 11 &&
                parseInt(getProperty("hiddenBowlingAlleyProgress")) < 6 &&
                itemAmount($item`bowling ball`) < (6 - parseInt(getProperty("hiddenBowlingAlleyProgress"))),
  },
  {
    name: "Star key parts",
    location: $location`The Hole in the Sky`,
    todo: () => !getProperty("nsTowerDoorKeysUsed").includes("Richard's star key") &&
                itemAmount($item`Richard's star key`) < 1 &&
                (
                  itemAmount($item`star chart`) < 1 ||
                  itemAmount($item`star`) < 8 ||
                  itemAmount($item`line`) < 7
                ),
  },
  {
    name: "Farm shadow bricks",
    location: $location`Shadow Rift (The Misspelled Cemetary)`,
    todo: () => true,
  },
  {
    name: "Farm booze",
    location: $location`An Unusually Quiet Barroom Brawl`,
    todo: () => true,
  },
  {
    name: "Random location",
    location: Fallbot.randomLocation(),
    todo: () => true,
  },
];
