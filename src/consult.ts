import { Monster, myClass } from "kolmafia";
import { $class } from "libram";
import { consultAccordionThief } from "./combat/CombatAccordionThief";
import { consultDiscoBandit } from "./combat/CombatDiscoBandit";
import { consultPastamancer } from "./combat/CombatPastamancer";
import { consultSauceror } from "./combat/CombatSauceror";
import { consultSealClubber } from "./combat/CombatSealClubber";
import { consultTurtleTamer } from "./combat/CombatTurtleTamer";

export function main(initRound: number, foe: Monster, page: string) {
  switch (myClass()) {
    case $class`Seal Clubber`:
      consultSealClubber(initRound, foe, page);
      break;
    case $class`Turtle Tamer`:
      consultTurtleTamer(initRound, foe, page);
      break;
    case $class`Pastamancer`:
      consultPastamancer(initRound, foe, page);
      break;
    case $class`Sauceror`:
      consultSauceror(initRound, foe, page);
      break;
    case $class`Disco Bandit`:
      consultDiscoBandit(initRound, foe, page);
      break;
    case $class`Accordion Thief`:
      consultAccordionThief(initRound, foe, page);
      break;
    default:
      throw new Error("No consult script for " + myClass().toString());
  }
}
