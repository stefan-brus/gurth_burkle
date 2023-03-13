import { adv1, buy, canAdventure, changeMcd, create, dispensaryAvailable, equip, equippedItem, getProperty, haveEquipped, haveOutfit, itemAmount, knollAvailable, myLevel, myMeat, runChoice, setProperty, use, visitUrl } from "kolmafia";
import { $item, $location, $slot } from "libram";
import { AdventureInfo } from "../lib/AdventureInfo";
import { Modifier } from "../lib/Modifier";
import { ascensionDaysLeft, checkUseClover, myMainstat } from "../lib/Utils";
import { Properties } from "../Properties";
import { Task } from "./Task";

// TODO: Adjust for non-gnoll moonsigns
export const AcquireMcdTask: Task = {
  name: "Acquire Mind Control Device",
  subtasks: [
    {
      name: "Acquire Mind Control Device",
      available: () => knollAvailable() && myLevel() >= 5 && itemAmount($item`detuned radio`) < 1 && myMeat() > 1000,
      progress: () => { buy(1, $item`detuned radio`); changeMcd(10); },
      completed: () => itemAmount($item`detuned radio`) > 0,
      mainstat: 50,
    },
  ],
};

const questMeatcarProperty = "questG01Meatcar";

// TODO: Adjust for non-gnoll moonsigns
export const BitchinMeatcarTask: Task = {
  name: "Acquire Bitchin' Meatcar",
  subtasks: [
    {
      name: "Talk to Paco",
      available: () => knollAvailable() && getProperty(questMeatcarProperty) === "unstarted",
      progress: () => { visitUrl("guild.php?place=paco"); },
      completed: () => getProperty(questMeatcarProperty) !== "unstarted",
    },
    {
      name: "Create Bitchin' Meatcar",
      available: () => knollAvailable() && getProperty(questMeatcarProperty) === "started" && myMeat() > 1000,
      progress: () => { create(1, $item`bitchin' meatcar`); },
      completed: () => itemAmount($item`bitchin' meatcar`) > 0,
    },
    {
      name: "Return to Paco",
      available: () => getProperty(questMeatcarProperty) === "started" && itemAmount($item`bitchin' meatcar`) > 0,
      progress: () => { visitUrl("guild.php?place=paco"); },
      completed: () => getProperty(questMeatcarProperty) === "finished",
    },
  ],
};

const questWhiteCitadelProperty = "questG02Whitecastle";

export const UnlockWhiteysGroveTask: Task = {
  name: "Unlock Whitey's Grove",
  subtasks: [
    {
      name: "Get White Citadel quest",
      available: () => getProperty(questMeatcarProperty) === "finished",
      progress: () => { visitUrl("guild.php?place=paco"); runChoice(1); },
      completed: () => getProperty(questWhiteCitadelProperty) === "started" || getProperty(Properties.Ascension.WhiteysGroveVisited) === "true",
    },
    {
      name: "Visit Whitey's Grove",
      available: () => getProperty(questWhiteCitadelProperty) === "started",
      progress: () => { adv1($location`Whitey's Grove`); setProperty(Properties.Ascension.WhiteysGroveVisited, "true"); },
      completed: () => getProperty(Properties.Ascension.WhiteysGroveVisited) === "true",
      mainstat: $location`Whitey's Grove`.recommendedStat,
    },
  ],
};

export const UnlockDispensaryTask: Task = {
  name: "Unlock Dispensary",
  subtasks: [
    {
      name: "Unlock Dispensary",
      available: () => haveOutfit("Knob Goblin Elite Guard Uniform"),
      progress: () => { return { location: $location`Cobb's Knob Barracks`, modifiers: [] }},
      completed: () => getProperty("lastDispensaryOpen") === getProperty("knownAscensions"),
    },
  ],
};

export const CreateBadassBeltTask: Task = {
  name: "Create badass belt",
  subtasks: [
    {
      name: "Create badass belt",
      available: () => itemAmount($item`skull of the bonerdagon`) > 0 && (itemAmount($item`batskin belt`) > 0 || haveEquipped($item`batskin belt`)),
      progress: () => createBadassBelt(),
      completed: () => itemAmount($item`badass belt`) > 0 || haveEquipped($item`badass belt`),
    },
  ],
};

function createBadassBelt() {
  const batbelt = $item`batskin belt`;
  
  if (itemAmount(batbelt) === 0) {
    if (equippedItem($slot`acc1`) === batbelt) {
      equip($slot`acc1`, $item`none`);
    }
    else if (equippedItem($slot`acc2`) === batbelt) {
      equip($slot`acc2`, $item`none`);
    }
    else if (equippedItem($slot`acc3`) === batbelt) {
      equip($slot`acc3`, $item`none`);
    }
    else {
      throw new Error("Cannot find batskin belt");
    }
  }

  if (!create(1, $item`badass belt`)) {
    throw new Error("Unable to create badass belt");
  }
}

export const AcquireMeatMaidTask: Task = {
  name: "Acquire meat maid",
  subtasks: [
    {
      name: "Acquire meat maid",
      available: () => canAdventure($location`The VERY Unquiet Garves`) && itemAmount($item`11-leaf clover`) > 0 && ascensionDaysLeft() > 1 && knollAvailable(),
      progress: () => acquireMeatMaid(),
      completed: () => getProperty(Properties.Ascension.MeatMaidInstalled) === "true",
    },
  ],
};

function acquireMeatMaid() {
  checkUseClover("Acquire meat maid");

  if (!adv1($location`The VERY Unquiet Garves`)) {
    throw new Error("Unable to adventure for meat maid");
  }

  if (!create(1, $item`meat maid`)) {
    throw new Error("Unable to create meat maid");
  }

  if (!use(1, $item`meat maid`)) {
    throw new Error("Unable to install meat maid");
  }

  setProperty(Properties.Ascension.MeatMaidInstalled, "true");
}

export const UnlockHoleInTheSkyTask: Task = {
  name: "Unlock The Hole in the Sky",
  subtasks: [
    {
      name: "Unlock The Hole in the Sky",
      available: () => canAdventure($location`The Castle in the Clouds in the Sky (Top Floor)`),
      progress: () => unlockHole(),
      completed: () => canAdventure($location`The Hole in the Sky`),
      spikesTask: true,
    },
  ],
};

function unlockHole(): AdventureInfo {
  const CopperChoice = "choiceAdventure677";
  setProperty(CopperChoice, "2");

  return {
    location: $location`The Castle in the Clouds in the Sky (Top Floor)`,
    modifiers: [Modifier.NonCombat],
  };
}
