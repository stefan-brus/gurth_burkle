import { attack, haveSkill, Monster, steal, throwItem, useSkill, willUsuallyMiss } from "kolmafia";
import { $item, $skill } from "libram";
import { checkSpecialActions, combatOver, shouldThrowFlyers } from "./Utils";

export function consultDiscoBandit(initRound: number, foe: Monster, page: string) {
  let lastResult = page;
  let state = InitState;

  while (!combatOver(lastResult)) {
    const specialResult = checkSpecialActions(foe, lastResult);
    if (specialResult === undefined) {
      [lastResult, state] = doRound(foe, state);
    }
    else {
      lastResult = specialResult;
    }
  }
}

type CombatState = {
  pickpocketed: boolean,
  flyered: boolean,
  dance1: boolean,
  dance2: boolean,
  dance3: boolean,
};

const InitState: CombatState = {
  pickpocketed: false,
  flyered: false,
  dance1: false,
  dance2: false,
  dance3: false,
};

function doRound(foe: Monster, state: CombatState): [string, CombatState] {
  let newState = { ...state };
  let resultPage = "";

  if (!state.pickpocketed) {
    newState.pickpocketed = true;
    resultPage = steal();
  }
  else if (shouldThrowFlyers() && !state.flyered) {
    newState.flyered = true;
    resultPage = throwItem($item`rock band flyers`);
  }
  else if (willUsuallyMiss()) {
    if (!state.dance1 && haveSkill($skill`Disco Dance of Doom`)) {
      newState.dance1 = true;
      resultPage = useSkill($skill`Disco Dance of Doom`);
    }
    else if (!state.dance2 && haveSkill($skill`Disco Dance II: Electric Boogaloo`)) {
      newState.dance2 = true;
      resultPage = useSkill($skill`Disco Dance II: Electric Boogaloo`);
    }
    else if (!state.dance3 && haveSkill($skill`Disco Dance 3: Back in the Habit`)) {
      newState.dance3 = true;
      resultPage = useSkill($skill`Disco Dance 3: Back in the Habit`);
    }
    else {
      resultPage = attack();
    }
  }
  else {
    resultPage = attack();
  }

  return [resultPage, newState];
}
