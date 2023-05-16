import { getProperty } from "kolmafia";
import { Task } from "../Task";
import { Action } from "../../action/Action";
import { ActionsFactory } from "../../action/Factory";
import { $location } from "libram";

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

export const FreeKingRalph: Task = {
  name: "Free King Ralph",
  actions: () => freeKingActions(),
  completed: () => isKingLiberated(),
  requires: [KillNaughtySorceress],
};

function freeKingActions(): Action[] {
  const FreeKingAction = ActionsFactory.urlAction(
    "Free King Ralph",
    "place.php?whichplace=nstower&action=ns_11_prism",
  );

  return [FreeKingAction];
}

function isKingLiberated(): boolean {
  const KingLiberatedProperty = "kingLiberated";
  return getProperty(KingLiberatedProperty) === "true";
}
