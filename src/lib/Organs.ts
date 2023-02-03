import { fullnessLimit, inebrietyLimit, myAdventures, myFullness, myInebriety } from "kolmafia";
import { Constants } from "../Constants";

export function estimateAdventuresRemaining() {
  return myAdventures() +
    Constants.AdventuresPerFullness * stomachRemaining() +
    Constants.AdventuresPerInebriety * liverRemaining();
}

function stomachRemaining(): number {
  return fullnessLimit() - myFullness();
}

function liverRemaining(): number {
  return inebrietyLimit() - myInebriety();
}
