import { getProperty, Item, itemAmount, Monster, throwItem } from "kolmafia";
import { $item, $monster } from "libram";

export function combatOver(page: string): boolean {
  const combatOverRegex = /(WINWINWIN|LOSELOSELOSE)/;
  const match = page.match(combatOverRegex);

  return match != null && match.length > 0;
}

export function shouldThrowFlyers(): boolean {
  const FlyeredMLProperty = "flyeredML";
  return itemAmount(Item.get("rock band flyers")) > 0 && parseInt(getProperty(FlyeredMLProperty)) < 10000;
}

export function checkSpecialActions(foe: Monster, page: string) {
  checkYossarianTools(foe, page);
}

export function checkYossarianTools(foe: Monster, page: string) {
  const ToolMonsters = [
    $monster`batwinged  germlin (tool)`,
    $monster`erudite gremlin (tool)`,
    $monster`spider gremlin (tool)`,
    $monster`vegetable germlin (tool)`,
  ];

  const ToolMessages = [
    "It whips out a hammer",
    "He whips out a crescent wrench",
    "It whips out a pair of pliers",
    "It whips out a screwdriver",
  ];

  if (ToolMonsters.includes(foe) && ToolMessages.some(msg => page.includes(msg))) {
    throwItem($item`molybdenum magnet`);
  } 
}
