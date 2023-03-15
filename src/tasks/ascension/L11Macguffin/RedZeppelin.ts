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
      name: "Clear protesters (with clovers)",
      available: () => getProperty(L11RedZeppelinProperty) === "step1" && 
                       itemAmount($item`11-leaf clover`) > 5 && 
                       protestersRemaining() >= 40 && 
                       myAdventures() > (4 + Constants.ReservedAdventures),
      progress: () => doProtestersClovers(),
      completed: () => protestersRemaining() < 40,
    },
    {
      name: "Clear protesters (sleaze)",
      available: () => getProperty(L11RedZeppelinProperty) === "step1",
      progress: () => doProtestersSleaze(),
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

function protestersRemaining(): number {
  const ProtestersRemaining = "zeppelinProtestors";
  const ProtestersToKill = 80;

  return ProtestersToKill - parseInt(getProperty(ProtestersRemaining));
}

function doProtestersClovers() {
  const MobLuckyChoice = "choiceAdventure866";
  const MobFireChoice = "choiceAdventure858";

  setProperty(MobLuckyChoice, "3");
  setProperty(MobFireChoice, "1");

  checkUseClover("Get 3 Flamin' Whatshisnames");
  adv1($location`The Copperhead Club`);

  checkUseClover("Clear protesters with fire");
  adv1($location`A Mob of Zeppelin Protesters`);
  checkUseClover("Clear protesters with fire");
  adv1($location`A Mob of Zeppelin Protesters`);
  checkUseClover("Clear protesters with fire");
  adv1($location`A Mob of Zeppelin Protesters`);
}

function doProtestersSleaze(): AdventureInfo {
  const MobBenchChoice = "choiceAdventure857";
  setProperty(MobBenchChoice, "1");

  return {
    location: $location`A Mob of Zeppelin Protesters`,
    modifiers: [Modifier.SleazeDmg, Modifier.SleazeSpellDmg, Modifier.NonCombat],
    expectedNoncombat: "Not So Much With The Humanity",
  };
}
