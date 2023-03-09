import { equip, equippedAmount, getProperty, itemAmount, Location, runChoice, visitUrl } from "kolmafia";
import { $item, $location, $slot } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { myMaximize } from "../../lib/Maximize";
import { Modifier } from "../../lib/Modifier";
import { Task } from "../Task";

export const DigitalKeyTask: Task = {
  name: "Acquire digital key",
  subtasks: [
    {
      name: "Get continuum transfunctioner",
      available: () => itemAmount($item`continuum transfunctioner`) < 1 && equippedAmount($item`continuum transfunctioner`) < 1,
      progress: () => getTransfunctioner(),
      completed: () => itemAmount($item`continuum transfunctioner`) > 0 || equippedAmount($item`continuum transfunctioner`) > 0,
    },
    {
      name: "Build score",
      available: () => (itemAmount($item`continuum transfunctioner`) > 0 || equippedAmount($item`continuum transfunctioner`) > 0) && parseInt(getProperty(RealmScoreProperty)) < 10000,
      progress: () => buildScore(),
      completed: () => parseInt(getProperty(RealmScoreProperty)) >= 10000,
    },
    {
      name: "Get digital key",
      available: () => parseInt(getProperty(RealmScoreProperty)) >= 10000,
      progress: () => getDigitalKey(),
      completed: () => itemAmount($item`digital key`) > 0 || getProperty("nsTowerDoorKeysUsed").includes("digital key"),
    },
  ],
};

const RealmColorProperty = "8BitColor";
const RealmScoreProperty = "8BitScore";

const RealmLocationColor: Map<string, Location> = new Map([
  ["black", $location`Vanya's Castle`],
  ["blue", $location`Megalo-City`],
  ["green", $location`Hero's Field`],
  ["red", $location`The Fungus Plains`],
]);

function getTransfunctioner() {
  visitUrl("place.php?whichplace=forestvillage&action=fv_mystic");
  runChoice(1);
  runChoice(1);
  runChoice(1);
}

function getDigitalKey() {
  if (equippedAmount($item`continuum transfunctioner`) < 1)
    equip($slot`acc3`, $item`continuum transfunctioner`);
    
  visitUrl("place.php?whichplace=8bit&action=8treasure");
  runChoice(1);
}

function buildScore(): AdventureInfo {
  const vanyaScore = potentialLocationScore($location`Vanya's Castle`);
  const megaloScore = potentialLocationScore($location`Megalo-City`);
  const heroScore = potentialLocationScore($location`Hero's Field`);
  const fungusScore = potentialLocationScore($location`The Fungus Plains`);

  let location = $location`none`;
  let modifiers: Modifier[] = [];

  if (vanyaScore >= megaloScore && vanyaScore >= heroScore && vanyaScore >= fungusScore) {
    location = $location`Vanya's Castle`;
    modifiers.push(Modifier.Initiative);
  }
  else if (megaloScore > vanyaScore && megaloScore >= heroScore && megaloScore >= fungusScore) {
    location = $location`Megalo-City`;
    modifiers.push(Modifier.DamageAbsorption);
  }
  else if (heroScore >= vanyaScore && heroScore >= megaloScore && heroScore >= fungusScore) {
    location = $location`Hero's Field`;
    modifiers.push(Modifier.ItemDrop);
  }
  else if (fungusScore >= vanyaScore && fungusScore >= megaloScore && fungusScore >= heroScore) {
    location = $location`The Fungus Plains`;
    modifiers.push(Modifier.MeatDrop);
  }
  else {
    throw new Error("Error choosing 8-bit Realm location");
  }

  return {
    location: location,
    modifiers: modifiers,
    getSpecialEffects: true,
  };
}

function potentialLocationScore(loc: Location): number {
  let result = 50;
  const bonusLoc = RealmLocationColor.get(getProperty(RealmColorProperty))!;

  switch (loc) {
    case $location`Vanya's Castle`:
      const potentialInit = myMaximize(Modifier.Initiative, true);
      result += Math.max(0, Math.min(600, potentialInit) - 300) / 2;
      if (bonusLoc === $location`Vanya's Castle`) result *= 2;
      break;
    case $location`Megalo-City`:
      const potentialDA = myMaximize(Modifier.DamageAbsorption, true);
      result += Math.max(0, Math.min(600, potentialDA) - 300) / 2;
      if (bonusLoc === $location`Megalo-City`) result *= 2;
      break;
    case $location`Hero's Field`:
      const potentialItem = myMaximize(Modifier.ItemDrop, true);
      result += Math.max(0, Math.min(400, potentialItem) - 300) / 2;
      if (bonusLoc === $location`Hero's Field`) result *= 2;
      break;
    case $location`The Fungus Plains`:
      const potentialMeat = myMaximize(Modifier.MeatDrop, true);
      result += Math.max(0, Math.min(450, potentialMeat) - 300) / 2;
      if (bonusLoc === $location`The Fungus Plains`) result *= 2;
      break;
    default:
      throw new Error("Unknown 8-bit Realm location");
  }

  return result;
}
