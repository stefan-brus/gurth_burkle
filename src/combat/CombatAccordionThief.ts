import { attack, equippedAmount, haveSkill, Item, itemAmount, Monster, mpCost, myMp, Skill, steal, throwItem, useSkill, willUsuallyMiss } from "kolmafia";
import { $skill } from "libram";
import { combatLoop, shouldThrowFlyers } from "./Utils";

export function consultAccordionThief(initRound: number, foe: Monster, page: string) {
  combatLoop(foe, page, doRound, InitState);
}

type CombatState = {
  accordionStolen: boolean,
  pickpocketed: boolean,
  flyered: boolean,
  bashed: boolean,
};

const InitState: CombatState = {
  accordionStolen: false,
  pickpocketed: false,
  flyered: false,
  bashed: false,
};

function doRound(foe: Monster, state: CombatState): [string, CombatState] {
  let newState = { ...state };
  let resultPage = "";

  if (hasStealableAccordion(foe) && !state.accordionStolen) {
    newState.accordionStolen = true;
    resultPage = useSkill($skill`Steal Accordion`);
  }
  else if (!state.pickpocketed) {
    newState.pickpocketed = true;
    resultPage = steal();
  }
  else if (haveSkill($skill`Accordion Bash`) && !state.bashed) {
    newState.bashed = true;
    resultPage = useSkill($skill`Accordion Bash`);
  }
  else if (shouldThrowFlyers() && !state.flyered) {
    newState.flyered = true;
    resultPage = throwItem(Item.get("rock band flyers"));
  }
  else if (willUsuallyMiss() && myMp() > mpCost($skill`Cannelloni Cannon`)) {
    resultPage = useSkill($skill`Cannelloni Cannon`);
  }
  else {
    resultPage = attack();
  }

  return [resultPage, newState];
}

function hasStealableAccordion(foe: Monster): boolean {
  const AccordionMonsters: { [key: string]: Item } = {
    "hellion": Item.get("accord ion"),
    "Knob Goblin Accountant": Item.get("accordion file"),
    "1335 HaXx0r": Item.get("Accordion of Jordion"),
    "Drab Bard": Item.get("accordionoid rocca"),
    "alert mariachi": Item.get("alarm accordion"),
    "Steampunk Giant": Item.get("autocalliope"),
    "Depressing French accordionist": Item.get("Bal-musette accordion"),
    "bar": Item.get("baritone accordion"),
    "drunken half-orc hobo": Item.get("beer-battered accordion"),
    "hung-over half-orc hobo": Item.get("beer-battered accordion"),
    "toothy sklelton": Item.get("bone bandoneon"),
    "Lively Cajun accordionist": Item.get("Cajun accordion"),
    "skeletal sommelier": Item.get("ghost accordion"),
    "perpendicular bat": Item.get("guancertina"),
    "werecougar": Item.get("mama's squeezebox"),
    "cubist bull": Item.get("non-Euclidean non-accordion"),
    "War Hippy (space) cadet": Item.get("peace accordion"),
    "Ninja Snowman (Chopsticks)": Item.get("pentatonic accordion"),
    "drunk pygmy": Item.get("pygmy concertinette"),
    "Quirky indie-rock accordionist": Item.get("quirky accordion"),
  };

  if (!AccordionMonsters.hasOwnProperty(foe.name)) {
    return false;
  }

  if (equippedAmount(AccordionMonsters[foe.name]) > 0 || itemAmount(AccordionMonsters[foe.name])) {
    return false;
  }

  return true;
}
