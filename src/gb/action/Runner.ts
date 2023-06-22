import { myTurncount } from "kolmafia";
import { Logger } from "../log/Logger";
import { Action, ActionResult, WithCondition, WithModifiers } from "./Action";

export function runActions(actions: Action[], turns: number): number {
  Logger.info(`Running these ${actions.length} actions: ${actions.map(action => action.name).join(", ")}`);

  let turnsSpent = 0;

  actions.forEach(action => {
    turnsSpent += runAction(action, turns - turnsSpent);
  });

  return turnsSpent;
}

const hasCondition = (object: any): boolean => "completed" in object
const hasModifiers = (object: any): boolean => "modifiers" in object

function runAction(action: Action, turns: number): number {
  Logger.info(`Running action: ${action.name}`);

  if (hasCondition(action)) {
    return runUntilCondition(action as Action & WithCondition, turns);
  }
  else {
    return doAction(action, turns);
  }
}

function runUntilCondition(action: Action & WithCondition, turns: number): number {
  let turnsSpent = 0;

  while (!action.completed()) {
    Logger.debug(`Condition for ${action.name} not yet completed`);
    turnsSpent += doAction(action, turns);
  }

  return turnsSpent;
}

function doAction(action: Action, turns: number): number {
  if (turns === 0)
    // TODO: Handle this more betterly
    throw new Error("Out of turns!");

  const turnCountBefore = myTurncount();

  if (action.do() === ActionResult.Fail) {
    Logger.error(`Error running action: ${action.name}, aborting`);
    throw new Error("Error running action");
  }

  const turnCountAfter = myTurncount();

  return turnCountAfter - turnCountBefore;
}
