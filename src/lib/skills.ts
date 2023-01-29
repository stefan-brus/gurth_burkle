import { Skill, useSkill } from "kolmafia";

export function myUseSkill(qty: number, skill: Skill) {
  if (!useSkill(qty, skill)) {
    throw new Error(`Unable to use skill ${skill.name} ${qty} time(s)`);
  }
};
