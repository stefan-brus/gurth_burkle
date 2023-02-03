import { attack, haveSkill, Item, Monster, monsterHp, Skill, throwItem, useSkill } from "kolmafia";
import { combatOver, shouldThrowFlyers } from "./Utils";

export function consultSauceror(initRound: number, foe: Monster, page: string) {
  let lastResult = page;
  let state = InitState;

  while (!combatOver(lastResult)) {
    [lastResult, state] = doRound(foe, state);
  }
}

type CombatState = {
  cursed: boolean,
  flyered: boolean,
};

const InitState: CombatState = {
  cursed: false,
  flyered: false,
};

function doRound(foe: Monster, state: CombatState): [string, CombatState] {
  let newState = { ...state };
  let resultPage = "";

  if (haveSkill(Skill.get("Curse of Weaksauce")) && !state.cursed) {
    newState.cursed = true;
    resultPage = useSkill(Skill.get("Curse of Weaksauce"));
  }
  else if (shouldThrowFlyers() && !state.flyered) {
    newState.flyered = true;
    resultPage = throwItem(Item.get("rock band flyers"));
  }
  else if (haveSkill(Skill.get("Saucegeyser")) && monsterHp() > 250) {
    resultPage = useSkill(Skill.get("Saucegeyser"));
  }
  else if (haveSkill(Skill.get("Saucecicle")) && monsterHp() > 100) {
    resultPage = useSkill(Skill.get("Saucecicle"));
  }
  else if (haveSkill(Skill.get("Saucestorm"))) {
    resultPage = useSkill(Skill.get("Saucestorm"));
  }
  else {
    resultPage = attack();
  }

  return [resultPage, newState];
}
