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
  [Modifier.ItemDrop, [
    $item`autumn leaf`,
    $item`eagle feather`,
  ]],
  [Modifier.MeatDrop, [
    $item`flapper fly`,
    $item`autumn dollar`,
  ]],
  [Modifier.Initiative, [
    $item`giraffe-necked turtle`,
    $item`ant agonist`,
    $item`Angry Farmer candy`,
    $item`that gum you like`,
    $item`vial of The Glistening`,
  ]],
  [Modifier.StenchRes, [
    $item`Polysniff Perfume`,
  ]],
]);

export const PotionEffects = new Map<Item, Effect>([
  // item
  [$item`autumn leaf`, $effect`Crunching Leaves`],
  [$item`eagle feather`, $effect`Eagle Eyes`],

  // meat
  [$item`flapper fly`, $effect`Flapper Dancin'`],
  [$item`autumn dollar`, $effect`Bet Your Autumn Dollar`],

  // init
  [$item`giraffe-necked turtle`, $effect`Adorable Lookout`],
  [$item`ant agonist`, $effect`All Fired Up`],
  [$item`Angry Farmer candy`, $effect`Sugar Rush`],
  [$item`that gum you like`, $effect`Sugar Rush`],
  [$item`vial of The Glistening`, $effect`The Glistening`],
  [$item`old bronzer`, $effect`Sepia Tan`],

  // stench res
  [$item`Polysniff Perfume`, $effect`Neutered Nostrils`],
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
