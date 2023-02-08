import { myPrimestat, setProperty } from "kolmafia";
import { $location, $stat } from "libram";
import { AdventureInfo } from "./AdventureInfo";

export function shoreAdventure(): AdventureInfo {
  if (myPrimestat() === $stat`Muscle`) {
    setProperty(ShoreIncChoice, "1");
  }
  else if (myPrimestat() === $stat`Mysticality`) {
    setProperty(ShoreIncChoice, "2");
  }
  else {
    setProperty(ShoreIncChoice, "3");
  }

  return {
    location: $location`The Shore, Inc. Travel Agency`,
    modifiers: [],
  };
}

const ShoreIncChoice = "choiceAdventure793";
