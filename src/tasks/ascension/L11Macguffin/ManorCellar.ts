import { create, equip, equippedAmount, getProperty, itemAmount, use, visitUrl } from "kolmafia";
import { $item, $location, $slot } from "libram";
import { AdventureInfo } from "../../../lib/AdventureInfo";
import { Modifier } from "../../../lib/Modifier";
import { Task } from "../../Task";

export const L11ManorCellarTask: Task = {
  name: "L11: Manor Cellar",
  subtasks: [
    {
      name: "Unlock Manor Cellar",
      available: () => getProperty(L11ManorCellarProperty) === "started",
      progress: () => unlockCellar(),
      completed: () => getProperty(L11ManorCellarProperty) !== "started",
    },
    {
      name: "Get mortar-dissolving recipe",
      available: () => getProperty(L11ManorCellarProperty) === "step1",
      progress: () => getRecipe(),
      completed: () => getProperty(L11ManorCellarProperty) !== "step1",
    },
    {
      name: "Get bottle of Chateau de Vinegar",
      available: () => getProperty(L11ManorCellarProperty) === "step2",
      progress:() => getChateau(),
      completed: () => itemAmount($item`bottle of Chateau de Vinegar`) > 0 || itemAmount($item`unstable fulminate`) > 0 || itemAmount($item`wine bomb`) > 0 || equippedAmount($item`unstable fulminate`) > 0,
    },
    {
      name: "Get blasting soda",
      available: () => getProperty(L11ManorCellarProperty) === "step2",
      progress: () => getBlastingSoda(),
      completed: () => itemAmount($item`blasting soda`) > 0 || itemAmount($item`unstable fulminate`) > 0 || itemAmount($item`wine bomb`) > 0 || equippedAmount($item`unstable fulminate`) > 0,
    },
    {
      name: "Create unstable fulminate",
      available: () => getProperty(L11ManorCellarProperty) === "step2" && itemAmount($item`bottle of Chateau de Vinegar`) > 0 && itemAmount($item`blasting soda`) > 0,
      progress: () => { create(1, $item`unstable fulminate`); },
      completed: () => itemAmount($item`unstable fulminate`) > 0 || itemAmount($item`wine bomb`) > 0 || equippedAmount($item`unstable fulminate`) > 0,
    },
    {
      name: "Create wine bomb",
      available: () => getProperty(L11ManorCellarProperty) === "step2" && itemAmount($item`unstable fulminate`) > 0 || equippedAmount($item`unstable fulminate`) > 0,
      progress: () => createWineBomb(),
      completed: () => itemAmount($item`wine bomb`) > 0,
    },
    {
      name: "Blow up cellar wall",
      available: () => getProperty(L11ManorCellarProperty) === "step2" && itemAmount($item`wine bomb`) > 0,
      progress: () => { visitUrl("place.php?whichplace=manor4&action=manor4_chamberwall"); },
      completed: () => getProperty(L11ManorCellarProperty) === "step3",
    },
    {
      name: "Kill Lord Spookyraven",
      available: () => getProperty(L11ManorCellarProperty) === "step3",
      progress: () => killLordSpookyraven(),
      completed: () => getProperty(L11ManorCellarProperty) === "finished",
    },
  ],
};

const L11ManorCellarProperty = "questL11Manor";

function unlockCellar(): AdventureInfo {
  return {
    location: $location`The Haunted Ballroom`,
    modifiers: [Modifier.NonCombat],
    expectedNoncombat: "We'll All Be Flat",
  };
}

function getRecipe() {
  visitUrl("place.php?whichplace=manor4&action=manor4_chamberwall");
  equip($slot`acc3`, $item`Lord Spookyraven's spectacles`);
  use(1, $item`recipe: mortar-dissolving solution`);
}

function getChateau(): AdventureInfo {
  return {
    location: $location`The Haunted Wine Cellar`,
    modifiers: [],
  };
}

function getBlastingSoda(): AdventureInfo {
  return {
    location: $location`The Haunted Laundry Room`,
    modifiers: [],
  };
}

function createWineBomb(): AdventureInfo {
  return {
    location: $location`The Haunted Boiler Room`,
    modifiers: [Modifier.MonsterLevel],
  };
}

function killLordSpookyraven(): AdventureInfo {
  return {
    location: $location`Summoning Chamber`,
    modifiers: [],
  };
}
