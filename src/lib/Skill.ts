import { guildStoreAvailable, haveSkill, myClass, myLevel, myMeat, Skill, userConfirm, useSkill, visitUrl } from "kolmafia";
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
    case $class`Disco Bandit`:
      checkTrainSkills(DiscoBanditSkills);
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
    skill: $skill`Empathy of the Newt`,
    urlId: 9,
  },
  {
    skill: $skill`Testudinal Teachings`,
    urlId: 35,
  },
  {
    skill: $skill`Wisdom of the Elder Tortoises`,
    urlId: 11,
  },
  {
    skill: $skill`Astral Shell`,
    urlId: 12,
  },
  {
    skill: $skill`Cold-Blooded Fearlessness`,
    urlId: 16,
  },
  {
    skill: $skill`Hero of the Half-Shell`,
    urlId: 20,
  },
  {
    skill: $skill`Tao of the Terrapin`,
    urlId: 21,
  },
];

const DiscoBanditSkills: Skill[] = [

];

function checkTrainSkills(skills: SkillInfo[]) {
  skills.forEach(info => {
    if (!haveSkill(info.skill) && myLevel() >= info.skill.level && myMeat() > info.skill.traincost && guildStoreAvailable()) {
      if (userConfirm(`Train skill ${info.skill.name} for ${info.skill.traincost} meat?`)) {
        visitUrl(`guild.php?action=buyskill&skillid=${info.urlId}`)
      }
      else {
        throw new Error("User aborted on skill training");
      }
    }
  });
}
