import { haveEffect, mpCost, myClass, myMaxmp, Skill, toEffect, userConfirm, useSkill } from "kolmafia";
import { $class, $skill } from "libram";
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

  AdventureModifiers.forEach(mod => {
    if (info.modifiers.includes(mod)) {
      selectBuffsModifier(mod);
    }
  });
}

export function selectBuffsModifier(mod: Modifier) {
  switch (mod) {
    case Modifier.NonCombat:
    case Modifier.HotRes:
    case Modifier.ColdRes:
    case Modifier.StenchRes:
    case Modifier.SpookyRes:
    case Modifier.SleazeRes:
      tryApplyBuffs(ModifierSkills[mod]);
      break;
    default:
      break;
  }
}

const AdventureModifiers: Modifier[] = [
  Modifier.NonCombat,
  Modifier.HotRes,
  Modifier.ColdRes,
  Modifier.StenchRes,
  Modifier.SpookyRes,
  Modifier.SleazeRes,
];

const BaseSkills: Skill[] = [
  $skill`Leash of Linguini`,
  $skill`Fat Leon's Phat Loot Lyric`,
];

const ModifierSkills = {
  [Modifier.NonCombat]: [
    $skill`Smooth Movement`,
    $skill`The Sonata of Sneakiness`,
  ],
  [Modifier.HotRes]: [
    $skill`Elemental Saucesphere`,
    $skill`Astral Shell`,
  ],
  [Modifier.ColdRes]: [
    $skill`Elemental Saucesphere`,
    $skill`Astral Shell`,
  ],
  [Modifier.StenchRes]: [
    $skill`Elemental Saucesphere`,
    $skill`Astral Shell`,
  ],
  [Modifier.SpookyRes]: [
    $skill`Elemental Saucesphere`,
    $skill`Astral Shell`,
  ],
  [Modifier.SleazeRes]: [
    $skill`Elemental Saucesphere`,
    $skill`Astral Shell`,
  ],
};

const TurtleTamerSkills: Skill[] = [
  $skill`Empathy of the Newt`,
];

function tryApplyBuffs(skills: Skill[]) {
  skills.forEach(skill => tryApplyBuff(skill));
}

function tryApplyBuff(skill: Skill) {
  if (haveEffect(toEffect(skill)) > 1) {
    return;
  }

  if (mpCost(skill) + Constants.BuffCastMPBuffer > myMaxmp()) {
    return;
  }

  if (userConfirm("Cast buff skill " + skill.name + "?")) {
    useSkill(1, skill);
  }
  else {
    throw new Error("User aborted on buff " + skill.name);
  }
}
