import { haveEffect, haveSkill, mpCost, myClass, myMaxmp, Skill, toEffect, userConfirm, useSkill } from "kolmafia";
import { $class, $skill } from "libram";
import { Config } from "../Config";
import { Constants } from "../Constants";
import { AdventureInfo } from "./AdventureInfo";
import { Modifier } from "./Modifier";

export function selectBuffs(info: AdventureInfo) {
  tryApplyBuffs(BaseSkills);

  switch (myClass()) {
    case $class`Turtle Tamer`:
      tryApplyBuffs(TurtleTamerSkills);
      break;
    default:
      // Not all classes have specific buffs, do nothing
  }

  info.modifiers.forEach(mod => {
    if (ModifierSkills.has(mod)) {
      tryApplyBuffs(ModifierSkills.get(mod)!);
    }
  });
}

export const ModifierSkills: Map<Modifier, Skill[]> = new Map([
  [Modifier.NonCombat, [
    $skill`Smooth Movement`,
    $skill`The Sonata of Sneakiness`,
  ]],
  [Modifier.DamageAbsorption, [
    $skill`Astral Shell`,
    $skill`Ghostly Shell`,
  ]],
  [Modifier.HotRes, [
    $skill`Elemental Saucesphere`,
    $skill`Astral Shell`,
  ]],
  [Modifier.ColdRes, [
    $skill`Elemental Saucesphere`,
    $skill`Astral Shell`,
  ]],
  [Modifier.StenchRes, [
    $skill`Elemental Saucesphere`,
    $skill`Astral Shell`,
  ]],
  [Modifier.SpookyRes, [
    $skill`Elemental Saucesphere`,
    $skill`Astral Shell`,
  ]],
  [Modifier.SleazeRes, [
    $skill`Elemental Saucesphere`,
    $skill`Astral Shell`,
  ]],
]);

const BaseSkills: Skill[] = [
  $skill`Leash of Linguini`,
  $skill`Fat Leon's Phat Loot Lyric`,
];

const TurtleTamerSkills: Skill[] = [
  $skill`Empathy of the Newt`,
];

function tryApplyBuffs(skills: Skill[]) {
  skills.forEach(skill => tryApplyBuff(skill));
}

function tryApplyBuff(skill: Skill) {
  if (!haveSkill(skill) || haveEffect(toEffect(skill)) > 1 || mpCost(skill) + Constants.BuffCastMPBuffer > myMaxmp()) {
    return;
  }

  if (!Config.PromptBuffs || userConfirm("Cast buff skill " + skill.name + "?")) {
    useSkill(1, skill);
  }
  else {
    throw new Error("User aborted on buff " + skill.name);
  }
}
