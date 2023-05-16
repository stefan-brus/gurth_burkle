import { Location } from "kolmafia";

export enum ActionResult {
  // Default value, this should never be explicitly set
  Undefined,

  // Action failed, considered an error
  Fail,

  // Action completed successfully
  Success,
}

export type ModifierInfo = {
  name: string,
  weight: number,
  min?: number,
  max?: number,
};

// Interface for all actions
export interface Action {
  name: string;
  do(): ActionResult;
}

// Interface for actions with a condition to be checked for completion
export interface WithCondition {
  completed(): boolean;
}

// Interface for actions that require modifiers
export interface WithModifiers {
  modifiers(): ModifierInfo[];
}
