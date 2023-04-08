import { adv1, canAdventure, getProperty, itemAmount, myAdventures, runCombat, setProperty, use, visitUrl } from "kolmafia";
import { $item, $location } from "libram";
import { Constants } from "../../../Constants";
import { AdventureInfo } from "../../../lib/AdventureInfo";
import { Modifier } from "../../../lib/Modifier";
import { generateAdventures } from "../../../lib/Turngen";
import { Properties } from "../../../Properties";
import { Task } from "../../Task";

export const L11PyramidTask: Task = {
  name: "L11: Pyramid",
  subtasks: [
    {
      name: "Unlock Pyramid",
      available: () => getProperty("questL11Desert") === "finished",
      progress: () => { visitUrl("place.php?whichplace=desertbeach&action=db_pyramid1"); },
      completed: () => getProperty(L11PyramidProperty) !== "unstarted",
    },
    {
      name: "Unlock The Middle Chamber",
      available: () => getProperty(L11PyramidProperty) === "started" && canAdventure($location`The Upper Chamber`),
      progress: () => unlockMiddleChamber(),
      completed: () => getProperty(L11PyramidProperty) !== "started",
    },
    {
      name: "Unlock The Lower Chambers",
      available: () => getProperty(L11PyramidProperty) === "step1" && canAdventure($location`The Middle Chamber`),
      progress: () => unlockLowerChambers(),
      completed: () => getProperty(L11PyramidProperty) !== "step1",
    },
    {
      name: "Unlock The Control Room",
      available: () => getProperty(L11PyramidProperty) === "step2" && canAdventure($location`The Middle Chamber`),
      progress: () => unlockControlRoom(),
      completed: () => getProperty(L11PyramidProperty) !== "step2",
    },
    {
      name: "Get crumbling wooden wheels",
      available: () => getProperty(L11PyramidProperty) === "step3" && false, // Disabled for now
      progress: () => getWoodenWheels(),
      completed: () => getProperty(Properties.Ascension.PyramidWheelsGathered) === "true",
      spikesTask: true,
    },
    {
      name: "Get tomb ratchets",
      available: () => getProperty(L11PyramidProperty) === "step3",
      progress: () => getTombRatchets(),
      completed: () => getProperty(Properties.Ascension.PyramidWheelsGathered) === "true",
    },
    {
      name: "Unlock Ed's tomb",
      available: () => getProperty(Properties.Ascension.PyramidWheelsGathered) === "true" && myAdventures() >= (3 + Constants.ReservedAdventures),
      progress: () => unlockTomb(),
      completed: () => getProperty(BombUsedProperty) === "true",
    },
    {
      name: "Kill Ed the Undying",
      available: () => getProperty(BombUsedProperty) === "true",
      progress: () => killEd(),
      completed: () => getProperty(L11PyramidProperty) === "finished",
    },
    {
      name: "Use confetti",
      available: () => itemAmount($item`handful of confetti`) > 0,
      progress: () => useConfetti(),
      completed: () => getProperty(Properties.Ascension.ConfettiUsed) === "true",
    },
  ],
};

const L11PyramidProperty = "questL11Pyramid";
const BombUsedProperty = "pyramidBombUsed";

function unlockMiddleChamber(): AdventureInfo {
  return {
    location: $location`The Upper Chamber`,
    modifiers: [Modifier.NonCombat],
    expectedNoncombat: "Down Dooby-Doo Down Down",
  };
}

function unlockLowerChambers(): AdventureInfo {
  return {
    location: $location`The Middle Chamber`,
    modifiers: [Modifier.ItemDrop],
    expectedNoncombat: "Further Down Dooby-Doo Down Down",
  };
}

function unlockControlRoom(): AdventureInfo {
  return {
    location: $location`The Middle Chamber`,
    modifiers: [Modifier.ItemDrop],
    expectedNoncombat: "Under Control",
  };
}

function getWoodenWheels(): AdventureInfo | void {
  if (itemAmount($item`crumbling wooden wheel`) + itemAmount($item`tomb ratchet`) >= 10) {
    setProperty(Properties.Ascension.PyramidWheelsGathered, "true");
    return;
  }

  return {
    location: $location`The Upper Chamber`,
    modifiers: [Modifier.NonCombat],
  };
}

function getTombRatchets(): AdventureInfo | void {
  if (itemAmount($item`crumbling wooden wheel`) + itemAmount($item`tomb ratchet`) >= 10) {
    setProperty(Properties.Ascension.PyramidWheelsGathered, "true");
    return;
  }

  return {
    location: $location`The Middle Chamber`,
    modifiers: [Modifier.ItemDrop],
  };
}

function unlockTomb() {
  // Acquire token
  rotateWheel(3);
  adv1($location`The Lower Chambers`);

  if (itemAmount($item`ancient bronze token`) < 1)
    throw new Error("Error getting ancient bronze token");

  // Acquire bomb
  rotateWheel(4);
  adv1($location`The Lower Chambers`);

  if (itemAmount($item`ancient bomb`) < 1)
    throw new Error("Error getting ancient bomb");

  // Use bomb
  rotateWheel(3);
  adv1($location`The Lower Chambers`);

  if (getProperty(BombUsedProperty) !== "true")
    throw new Error("Error using ancient bomb");
}

function rotateWheel(amount: number) {
  visitUrl("place.php?whichplace=pyramid&action=pyramid_control");
  
  let rotated = 0;
  while (rotated < amount) {
    if (itemAmount($item`tomb ratchet`) > 0) {
      visitUrl("choice.php?whichchoice=929&option=2&pwd");
    }
    else {
      visitUrl("choice.php?whichchoice=929&option=1&pwd");
    }

    rotated++;
  }

  visitUrl("choice.php?whichchoice=929&option=5&pwd");
}

function killEd() {
  visitUrl("place.php?whichplace=pyramid&action=pyramid_state1a");
  runCombat();
}

function useConfetti() {
  use(1, $item`handful of confetti`);
  setProperty(Properties.Ascension.ConfettiUsed, "true");
}
