import { Logger } from "../log/Logger";
import { Action, ActionResult, WithCondition, WithModifiers } from "./Action";

export function runActions(actions: Action[]) {
  Logger.info(`Running these ${actions.length} actions: ${actions.map(action => action.name).join(", ")}`);

  actions.forEach(action => {
    runAction(action);
  });
}

const hasCondition = (object: any): boolean => "completed" in object
const hasModifiers = (object: any): boolean => "modifiers" in object

function runAction(action: Action) {
  Logger.info(`Running action: ${action.name}`);

  if (hasCondition(action)) {
    runUntilCondition(action as Action & WithCondition);
  }
  else {
    doAction(action);
  }
}

function runUntilCondition(action: Action & WithCondition) {
  while (!action.completed()) {
    Logger.debug(`Condition for ${action.name} not yet completed`);
    doAction(action);
  }
}

function doAction(action: Action) {
  if (action.do() === ActionResult.Fail) {
    Logger.error(`Error running action: ${action.name}, aborting`);
    throw new Error("Error running action");
  }
}
