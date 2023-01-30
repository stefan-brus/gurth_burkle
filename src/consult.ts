import { Class, Monster, myClass } from "kolmafia";
import { consultAccordionThief } from "./combat/CombatAccordionThief";

export function main(initRound: number, foe: Monster, page: string) {
  switch (myClass()) {
    case Class.get("Accordion Thief"):
      consultAccordionThief(initRound, foe, page);
      break;
    default:
      throw new Error("No consult script for " + myClass().toString());
  }
}
