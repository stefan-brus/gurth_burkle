import { getProperty } from "kolmafia";
import { $item, $location } from "libram";
import { questPropertyStepGTE } from "../../../lib/Utils";
import { TaskFactory } from "../Factory";

const L13Property = "questL13Final";

const AcquireWandOfNagamar = TaskFactory.acquireItemTask($item`Wand of Nagamar`);

const LookIntoMirror = TaskFactory.adventureChoiceTask(
  "Look into mirror",
  $location`Tower Level 4`,
  1015, 1,
  isMirrorDone,
  [AcquireWandOfNagamar],
);

function isMirrorDone(): boolean {
  return questPropertyStepGTE(L13Property, 10);
}

const KillShadow = TaskFactory.adventureTask(
  "Kill my shadow",
  $location`Tower Level 5`,
  isShadowDead,
  [LookIntoMirror],
);

function isShadowDead(): boolean {
  return questPropertyStepGTE(L13Property, 11);
}

const KillNaughtySorceress = TaskFactory.adventureTask(
  "Kill the naughty sorceress",
  $location`The Naughty Sorceress' Chamber`,
  isSorceressDead,
  [KillShadow],
);

function isSorceressDead(): boolean {
  return questPropertyStepGTE(L13Property, 12);
}

export const FreeKingRalph = TaskFactory.urlTask(
  "Free King Ralph",
  "place.php?whichplace=nstower&action=ns_11_prism",
  isKingLiberated,
  [KillNaughtySorceress],
);

function isKingLiberated(): boolean {
  const KingLiberatedProperty = "kingLiberated";
  return getProperty(KingLiberatedProperty) === "true";
}
