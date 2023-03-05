import { Effect, haveEffect, Item, itemAmount, use, userConfirm } from "kolmafia";
import { $effect, $item } from "libram";
import { AdventureInfo } from "./AdventureInfo";
import { Modifier } from "./Modifier";

export function selectPotions(info: AdventureInfo) {
  info.modifiers.forEach(mod => {
    if (ModifierPotions.has(mod)) {
      tryUsePotions(ModifierPotions.get(mod)!);
    }
  });
}

export const ModifierPotions: Map<Modifier, Item[]> = new Map([
  [Modifier.MeatDrop, [
    $item`flapper fly`,
    $item`autumn dollar`,
  ]],
  [Modifier.Initiative, [
    $item`giraffe-necked turtle`,
  ]],
  [Modifier.StenchRes, [
    $item`Polysniff Perfume`,
  ]],
]);

export const PotionEffects = new Map<Item, Effect>([
  [$item`giraffe-necked turtle`, $effect`Adorable Lookout`],
  [$item`flapper fly`, $effect`Flapper Dancin'`],
  [$item`autumn dollar`, $effect`Bet Your Autumn Dollar`],
]);

function tryUsePotions(items: Item[]) {
  items.filter(item => itemAmount(item) > 0).forEach(item => tryUsePotion(item));
}

function tryUsePotion(item: Item) {
  const effect = PotionEffects.get(item)
  if (effect !== undefined && haveEffect(effect) > 1) {
    return;
  }

  if (userConfirm("Use potion " + item.name + "?")) {
    use(1, item);
  }
  else {
    throw new Error ("User aborted on potion " + item.name);
  }
}
