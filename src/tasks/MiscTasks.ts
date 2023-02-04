import { adv1, buy, changeMcd, create, dispensaryAvailable, getProperty, haveOutfit, itemAmount, knollAvailable, myMeat, runChoice, setProperty, visitUrl } from "kolmafia";
import { $item, $location } from "libram";
import { Properties } from "../Properties";
import { Task } from "./Task";

// TODO: Adjust for non-gnoll moonsigns
export const AcquireMcdTask: Task = {
  name: "Acquire Mind Control Device",
  subtasks: [
    {
      name: "Acquire Mind Control Device",
      available: () => knollAvailable() && itemAmount($item`detuned radio`) < 1 && myMeat() > 1000,
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
      completed: () => getProperty(questWhiteCitadelProperty) === "started",
    },
    {
      name: "Visit Whitey's Grove",
      available: () => getProperty(questWhiteCitadelProperty) === "started",
      progress: () => { adv1($location`Whitey's Grove`); setProperty(Properties.Ascension.WhiteysGroveVisited, "true"); },
      completed: () => getProperty(Properties.Ascension.WhiteysGroveVisited) === "true",
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
      completed: () => dispensaryAvailable(),
    },
  ],
};
