import { adv1, buy, cliExecute, equippedAmount, getProperty, itemAmount, myAdventures, myMeat, setProperty } from "kolmafia";
import { $item, $location } from "libram";
import { Constants } from "../../../Constants";
import { AdventureInfo } from "../../../lib/AdventureInfo";
import { Modifier } from "../../../lib/Modifier";
import { checkUseClover } from "../../../lib/Utils";
import { Task } from "../../Task";

export const L11RedZeppelinTask: Task = {
  name: "L11: Red Zeppelin",
  subtasks: [
    {
      name: "Do Protester Mob intro",
      available: () => getProperty(L11RedZeppelinProperty) === "started",
      progress: () => { return { location: $location`A Mob of Zeppelin Protesters`, modifiers:[], expectedNoncombat: "Too Much Humanity", }; },
      completed: () => getProperty(L11RedZeppelinProperty) !== "started",
    },
    {
      name: "Clear protesters",
      available: () => getProperty(L11RedZeppelinProperty) === "step1",
      progress: () => doProtesters(),
      completed: () => getProperty(L11RedZeppelinProperty) !== "step1",
    },
    {
      name: "Buy Red Zeppelin ticket",
      available: () => getProperty(L11RedZeppelinProperty) === "step2" && itemAmount($item`Red Zeppelin ticket`) < 1 && myMeat() > 5000,
      progress: () => { buy(1, $item`Red Zeppelin ticket`); },
      completed: () => itemAmount($item`Red Zeppelin ticket`) > 0,
    },
    {
      name: "Do Red Zeppelin intro",
      available: () => getProperty(L11RedZeppelinProperty) === "step2" && itemAmount($item`Red Zeppelin ticket`) > 0,
      progress: () => { return { location: $location`The Red Zeppelin`, modifiers: [], expectedNoncombat: "Zeppelintro" }; },
      completed: () => getProperty(L11RedZeppelinProperty) !== "step2",
    },
    {
      name: "Kill Ron Copperhead",
      available: () => getProperty(L11RedZeppelinProperty) === "step3" || getProperty(L11RedZeppelinProperty) === "step4",
      progress: () => { return { location: $location`The Red Zeppelin`, modifiers: [], }; },
      completed: () => getProperty(L11RedZeppelinProperty) === "finished",
    },
    {
      name: "Create Talisman o' Namsilat",
      available: () => getProperty(L11RedZeppelinProperty) === "finished" && itemAmount($item`Talisman o' Namsilat`) < 0 && equippedAmount($item`Talisman o' Namsilat`) < 0,
      progress: () => { cliExecute("create Talisman o' Namsilat"); },
      completed: () => itemAmount($item`Talisman o' Namsilat`) > 0 || equippedAmount($item`Talisman o' Namsilat`) > 0,
    },
  ],
};

const L11RedZeppelinProperty = "questL11Ron";

function doProtesters(): AdventureInfo {
  const MobLuckyChoice = "choiceAdventure866";
  const MobAmbushChoice = "choiceAdventure856";
  const MobBenchChoice = "choiceAdventure857";
  const MobFireChoice = "choiceAdventure858";

  setProperty(MobLuckyChoice, "2");
  setProperty(MobAmbushChoice, "1");
  setProperty(MobBenchChoice, "1");
  setProperty(MobFireChoice, "1");

  if (itemAmount($item`11-leaf clover`) >= 2) {
    checkUseClover("Clear protesters with sleaze");
  }

  return {
    location: $location`A Mob of Zeppelin Protesters`,
    modifiers: [Modifier.SleazeDmg, Modifier.SleazeSpellDmg, Modifier.NonCombat],
    expectedNoncombat: "Not So Much With The Humanity",
  };
}
