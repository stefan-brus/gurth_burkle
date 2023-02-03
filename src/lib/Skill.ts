import { haveSkill, myClass, myLevel, myMeat, Skill, userConfirm, useSkill, visitUrl } from "kolmafia";
import { $class, $skill } from "libram";

export function myUseSkill(qty: number, skill: Skill) {
  if (!useSkill(qty, skill)) {
    throw new Error(`Unable to use skill ${skill.name} ${qty} time(s)`);
  }
};

export function acquireTrainableSkills() {
  switch (myClass()) {
    case $class`Turtle Tamer`:
      checkTrainSkills(TurtleTamerSkills);
      break;
    default:
      throw new Error("No trainable skill list for class " + myClass().toString());
  }
}

type SkillInfo = {
  skill: Skill,
  urlId: number,
};

const TurtleTamerSkills: SkillInfo[] = [
  {
    skill: $skill`Skin of the Leatherback`,
    urlId: 4,
  },
  {
    skill: $skill`Ghostly Shell`,
    urlId: 7,
  },
  {
    skill: $skill`Ghostly Shell`,
    urlId: 7,
  },
];

function checkTrainSkills(skills: SkillInfo[]) {
  skills.forEach(info => {
    if (!haveSkill(info.skill) && myLevel() >= info.skill.level && myMeat() > info.skill.traincost) {
      if (userConfirm(`Train skill ${info.skill.name} for ${info.skill.traincost} meat?`)) {
        visitUrl(`guild.php?action=buyskill&skillid=${info.urlId}`)
      }
      else {
        throw new Error("User aborted on skill training");
      }
    }
  });
}
