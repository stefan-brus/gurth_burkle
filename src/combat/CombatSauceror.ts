import { attack, haveSkill, Item, Monster, monsterHp, Skill, throwItem, useSkill } from "kolmafia";
import { $skill } from "libram";
import { combatLoop, shouldThrowFlyers } from "./Utils";

export function consultSauceror(initRound: number, foe: Monster, page: string) {
  combatLoop(foe, page, doRound, InitState);
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

  if (haveSkill($skill`Curse of Weaksauce`) && !state.cursed) {
    newState.cursed = true;
    resultPage = useSkill($skill`Curse of Weaksauce`);
  }
  else if (shouldThrowFlyers() && !state.flyered) {
    newState.flyered = true;
    resultPage = throwItem(Item.get("rock band flyers"));
  }
  else if (haveSkill($skill`Saucegeyser`) && monsterHp() > 250) {
    resultPage = useSkill($skill`Saucegeyser`);
  }
  else if (haveSkill($skill`Saucecicle`) && monsterHp() > 100) {
    resultPage = useSkill($skill`Saucecicle`);
  }
  else if (haveSkill($skill`Saucestorm`)) {
    resultPage = useSkill($skill`Saucestorm`);
  }
  else {
    resultPage = attack();
  }

  return [resultPage, newState];
}
