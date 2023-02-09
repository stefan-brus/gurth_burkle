import { getProperty, Item, itemAmount, Monster, myClass, Skill, throwItem, useSkill } from "kolmafia";
import { $class, $item, $monster, $skill } from "libram";

export function combatOver(page: string): boolean {
  const combatOverRegex = /(WINWINWIN|LOSELOSELOSE)/;
  const match = page.match(combatOverRegex);

  return match != null && match.length > 0;
}

export function shouldThrowFlyers(): boolean {
  const FlyeredMLProperty = "flyeredML";
  return itemAmount(Item.get("rock band flyers")) > 0 && parseInt(getProperty(FlyeredMLProperty)) < 10000;
}

export function checkSpecialActions(foe: Monster, page: string): string | void {
  return checkYossarianTools(foe, page);
}

export function checkYossarianTools(foe: Monster, page: string): string | void {
  const ToolMonsters = [
    $monster`batwinged  gremlin (tool)`,
    $monster`erudite gremlin (tool)`,
    $monster`spider gremlin (tool)`,
    $monster`vegetable gremlin (tool)`,
  ];

  const ToolMessages = [
    "It whips out a hammer",
    "He whips out a crescent wrench",
    "It whips out a pair of pliers",
    "It whips out a screwdriver",
  ];

  if (ToolMonsters.includes(foe)) {
    if (ToolMessages.some(msg => page.includes(msg))) {
      return throwItem($item`molybdenum magnet`);
    }
    else {
      return useSkill(myLevel0Skill());
    }
  }
}

function myLevel0Skill(): Skill {
  switch (myClass()) {
    case $class`Seal Clubber`:
      return $skill`Clobber`;
    case $class`Turtle Tamer`:
      return $skill`Toss`;
    case $class`Pastamancer`:
      return $skill`Spaghetti Spear`;
    case $class`Sauceror`:
      return $skill`Salsaball`;
    case $class`Disco Bandit`:
      return $skill`Suckerpunch`;
    case $class`Accordion Thief`:
      return $skill`Sing`;
    default:
      throw new Error("Unknown level 0 skill for class " + myClass().toString());
  }
}
