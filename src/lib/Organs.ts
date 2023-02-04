import { fullnessLimit, inebrietyLimit, myAdventures, myFullness, myInebriety } from "kolmafia";
import { Constants } from "../Constants";

export function estimateAdventuresRemaining() {
  return myAdventures() +
    Constants.AdventuresPerFullness * stomachRemaining() +
    Constants.AdventuresPerInebriety * liverRemaining();
}

export function stomachRemaining(): number {
  return fullnessLimit() - myFullness();
}

export function liverRemaining(): number {
  return inebrietyLimit() - myInebriety();
}
