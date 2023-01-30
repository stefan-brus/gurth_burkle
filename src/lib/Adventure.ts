import { adv1, getProperty } from "kolmafia";
import { AdventureInfo } from "./AdventureInfo";

export function mainAdventure(info: AdventureInfo) {
  if (!adv1(info.location) && getProperty("lastEncounter") != info.expectedNoncombat) {
    throw new Error("Error adventuring in " + info.location.toString());
  }
}
