import { getProperty } from "kolmafia";
import { Task } from "../Task";
import { Action } from "../../action/Action";
import { ActionsFactory } from "../../action/Factory";
import { $location } from "libram";

export const FreeKingRalph: Task = {
  name: "Free King Ralph",
  actions: () => { throw "TODO: Ralph URL" },
  completed: () => isKingLiberated(),
  requires: [],
};

function isKingLiberated(): boolean {
  const KingLiberatedProperty = "kingLiberated";
  return getProperty(KingLiberatedProperty) === "true";
}

const KillNaughtySorceress: Task = {
  name: "Kill the naughty sorceress",
  actions: () => killNSActions(),
  completed: () => isSorceressDead(),
  council: true,
};

function killNSActions(): Action[] {
  const KillSorceressAction = ActionsFactory.adventure(
    "Kill the naughty sorceress",
    $location`The Naughty Sorceress' Chamber`,
    isSorceressDead,
  );

  return [KillSorceressAction];
}

function isSorceressDead(): boolean {
  const L13Property = "questL13Final";
  const Values = ["step12", "step13", "finished"];

  return Values.includes(getProperty(L13Property));
}
