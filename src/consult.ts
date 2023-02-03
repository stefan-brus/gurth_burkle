import { Class, Monster, myClass } from "kolmafia";
import { consultAccordionThief } from "./combat/CombatAccordionThief";
import { consultSauceror } from "./combat/CombatSauceror";

export function main(initRound: number, foe: Monster, page: string) {
  switch (myClass()) {
    case Class.get("Sauceror"):
      consultSauceror(initRound, foe, page);
      break;
    case Class.get("Accordion Thief"):
      consultAccordionThief(initRound, foe, page);
      break;
    default:
      throw new Error("No consult script for " + myClass().toString());
  }
}
