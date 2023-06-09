import { haveEffect, haveSkill, mpCost, myClass, myMaxmp, Skill, toEffect, userConfirm, useSkill } from "kolmafia";
import { $class, $skill } from "libram";
import { Config } from "../Config";
import { Constants } from "../Constants";
import { maxModifierReached } from "./Adventure";
import { AdventureInfo } from "./AdventureInfo";
import { Modifier } from "./Modifier";

export function selectBuffs(info: AdventureInfo) {
  tryApplyBuffs(BaseSkills);

  info.modifiers.forEach(mod => {
    if (ModifierSkills.has(mod) && !maxModifierReached(info, mod)) {
      tryApplyBuffs(ModifierSkills.get(mod)!);
    }
  });
}

export const ModifierSkills: Map<Modifier, Skill[]> = new Map([
  [Modifier.Muscle, [
    $skill`Rage of the Reindeer`,
  ]],
  [Modifier.Combat, [
    $skill`Musk of the Moose`,
  ]],
  [Modifier.NonCombat, [
    $skill`Smooth Movement`,
  ]],
  [Modifier.MonsterLevel, [
    $skill`Pride of the Puffin`,
  ]],
  [Modifier.Initiative, [
    $skill`Drench Yourself in Sweat`,
    $skill`Springy Fusilli`,
    $skill`Soul Rotation`,
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
