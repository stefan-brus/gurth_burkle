import { guildStoreAvailable, haveSkill, myClass, myLevel, myMeat, Skill, userConfirm, useSkill, visitUrl } from "kolmafia";
import { $class, $skill } from "libram";

export function myUseSkill(qty: number, skill: Skill) {
  if (!useSkill(qty, skill)) {
    throw new Error(`Unable to use skill ${skill.name} ${qty} time(s)`);
  }
};

export function acquireTrainableSkills() {
  switch (myClass()) {
    case $class`Seal Clubber`:
      checkTrainSkills(SealClubberSkills);
      break;
    case $class`Turtle Tamer`:
      checkTrainSkills(TurtleTamerSkills);
      break;
    case $class`Pastamancer`:
      checkTrainSkills(PastamancerSkills);
      break;
    case $class`Sauceror`:
      checkTrainSkills(SaucerorSkills);
      break;
    case $class`Disco Bandit`:
      checkTrainSkills(DiscoBanditSkills);
      break;
    case $class`Accordion Thief`:
      checkTrainSkills(AccordionThiefSkills);
      break;
    default:
      throw new Error("No trainable skill list for class " + myClass().toString());
  }
}

type SkillInfo = {
  skill: Skill,
  urlId: number,
};

const SealClubberSkills: SkillInfo[] = [
  {
    skill: $skill`Audacity of the Otter`,
    urlId: 9,
  },
  {
    skill: $skill`Cold Shoulder`,
    urlId: 28,
  },
  {
    skill: $skill`Thrust-Smack`,
    urlId: 3,
  },
  {
    skill: $skill`Wrath of the Wolverine`,
    urlId: 29,
  },
  {
    skill: $skill`Super-Advanced Meatsmithing`,
    urlId: 6,
  },
  {
    skill: $skill`Buoyancy of the Beluga`,
    urlId: 30,
  },
  {
    skill: $skill`Thirst of the Weasel`,
    urlId: 36,
  },
  {
    skill: $skill`Hide of the Walrus`,
    urlId: 11,
  },
  {
    skill: $skill`Claws of the Walrus`,
    urlId: 12,
  },
  {
    skill: $skill`Seething of the Snow Leopard`,
    urlId: 34,
  },
  {
    skill: $skill`Lunging Thrust-Smack`,
    urlId: 5,
  },
  {
    skill: $skill`Ire of the Orca`,
    urlId: 35,
  },
  {
    skill: $skill`Batter Up!`,
    urlId: 14,
  },
  {
    skill: $skill`Rage of the Reindeer`,
    urlId: 15,
  },
  {
    skill: $skill`Northern Exposure`,
    urlId: 18,
  },
  {
    skill: $skill`Musk of the Moose`,
    urlId: 19,
  },
  {
    skill: $skill`Precision of the Penguin`,
    urlId: 39,
  },
  {
    skill: $skill`Pulverize`,
    urlId: 16,
  },
  {
    skill: $skill`Pride of the Puffin`,
    urlId: 40,
  },
];

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

const PastamancerSkills: SkillInfo[] = [
  {
    skill: $skill`Entangling Noodles`,
    urlId: 4,
  },
  {
    skill: $skill`Bind Vampieroghi`,
    urlId: 27,
  },
  {
    skill: $skill`Cannelloni Cannon`,
    urlId: 5,
  },
  {
    skill: $skill`Springy Fusilli`,
    urlId: 15,
  },
  {
    skill: $skill`Bringing Up the Rear`,
    urlId: 30,
  },
  {
    skill: $skill`Spirit of Rigatoni`,
    urlId: 11,
  },
  {
    skill: $skill`Spirit of Ravioli`,
    urlId: 14,
  },
  {
    skill: $skill`Weapon of the Pastalord`,
    urlId: 8,
  },
  {
    skill: $skill`Thrall Unit Tactics`,
    urlId: 34,
  },
  {
    skill: $skill`Cannelloni Cocoon`,
    urlId: 12,
  },
  {
    skill: $skill`Subtle and Quick to Anger`,
    urlId: 36,
  },
  {
    skill: $skill`Tolerance of the Kitchen`,
    urlId: 16,
  },
];

const SaucerorSkills: SkillInfo[] = [
  {
    skill: $skill`Expert Panhandling`,
    urlId: 4,
  },
  {
    skill: $skill`Saucestorm`,
    urlId: 5,
  },
  {
    skill: $skill`Soul Saucery`,
    urlId: 27,
  },
  {
    skill: $skill`Wave of Sauce`,
    urlId: 9,
  },
  {
    skill: $skill`Itchy Curse Finger`,
    urlId: 30,
  },
  {
    skill: $skill`Intrinsic Spiciness`,
    urlId: 10,
  },
  {
    skill: $skill`Saucecicle`,
    urlId: 32,
  },
  {
    skill: $skill`Master Saucier`,
    urlId: 11,
  },
  {
    skill: $skill`Saucegeyser`,
    urlId: 12,
  },
  {
    skill: $skill`Curse of Weaksauce`,
    urlId: 34,
  },
  {
    skill: $skill`Diminished Gag Reflex`,
    urlId: 16,
  },
  {
    skill: $skill`Irrepressible Spunk`,
    urlId: 17,
  },
];

const DiscoBanditSkills: SkillInfo[] = [
  {
    skill: $skill`Deft Hands`,
    urlId: 25,
  },
  {
    skill: $skill`Disco Dance of Doom`,
    urlId: 5,
  },
  {
    skill: $skill`Overdeveloped Sense of Self Preservation`,
    urlId: 10,
  },
  {
    skill: $skill`Disco State of Mind`,
    urlId: 26,
  },
  {
    skill: $skill`Disco Dance II: Electric Boogaloo`,
    urlId: 8,
  },
  {
    skill: $skill`Frantic Gyrations`,
    urlId: 27,
  },
  {
    skill: $skill`That's Not a Knife`,
    urlId: 28,
  },
  {
    skill: $skill`Nimble Fingers`,
    urlId: 4,
  },
  {
    skill: $skill`Tricky Knifework`,
    urlId: 29,
  },
  {
    skill: $skill`Flashy Dancer`,
    urlId: 30,
  },
  {
    skill: $skill`Disco Greed`,
    urlId: 32,
  },
  {
    skill: $skill`Disco Bravado`,
    urlId: 34,
  },
  {
    skill: $skill`Disco Dance 3: Back in the Habit`,
    urlId: 36,
  },
  {
    skill: $skill`Ambidextrous Funkslinging`,
    urlId: 15,
  },
  {
    skill: $skill`Heart of Polyester`,
    urlId: 16,
  },
  {
    skill: $skill`Sensitive Fingers`,
    urlId: 38,
  },
];

const AccordionThiefSkills: SkillInfo[] = [

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
