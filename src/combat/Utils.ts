import { getProperty, Item, itemAmount } from "kolmafia";

export function combatOver(page: string): boolean {
  const combatOverRegex = /(WINWINWIN|LOSELOSELOSE)/;
  const match = page.match(combatOverRegex);

  return match != null && match.length > 0;
}

const FlyeredMLProperty = "flyeredML";

export function shouldThrowFlyers(): boolean {
  return itemAmount(Item.get("rock band flyers")) > 0 && parseInt(getProperty(FlyeredMLProperty)) < 10000;
}
