import { getProperty, Location } from "kolmafia"
import { AdventureInfo } from "../lib/AdventureInfo";

export const Oliver = {
  fightsDone: oliverFightsDone,
  freeFight: oliverFreeFight,
};

const OliverFightsProperty = "_speakeasyFreeFights";

function oliverFightsDone(): number {
  return parseInt(getProperty(OliverFightsProperty));
}

function oliverFreeFight(): AdventureInfo {
  if (oliverFightsDone() >= 3) {
    throw new Error("Oliver's Place fights are no longer free");
  }

  return {
    location: Location.get("An Unusually Quiet Barroom Brawl"),
    modifiers: [],
  };
}
