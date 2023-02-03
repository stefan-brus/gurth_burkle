import { Monster, myClass } from "kolmafia";
import { $class } from "libram";
import { consultAccordionThief } from "./combat/CombatAccordionThief";
import { consultSauceror } from "./combat/CombatSauceror";
import { consultTurtleTamer } from "./combat/CombatTurtleTamer";

export function main(initRound: number, foe: Monster, page: string) {
  switch (myClass()) {
    case $class`Turtle Tamer`:
      consultTurtleTamer(initRound, foe, page);
      break;
    case $class`Sauceror`:
      consultSauceror(initRound, foe, page);
      break;
    case $class`Accordion Thief`:
      consultAccordionThief(initRound, foe, page);
      break;
    default:
      throw new Error("No consult script for " + myClass().toString());
  }
}
