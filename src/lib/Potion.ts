import { Effect, haveEffect, Item, itemAmount, use, userConfirm } from "kolmafia";
import { $effect, $item } from "libram";
import { AdventureInfo } from "./AdventureInfo";
import { Modifier } from "./Modifier";

export function selectPotions(info: AdventureInfo) {
  AdventureModifiers.forEach(mod => {
    if (info.modifiers.includes(mod)) {
      selectPotionsModifier(mod);
    }
  });
}

export function selectPotionsModifier(mod: Modifier) {
  switch (mod) {
    case Modifier.Initiative:
      tryUsePotions(ModifierPotions[mod]);
      break;
    default:
      break;
  }
}

const AdventureModifiers: Modifier[] = [
  Modifier.Initiative,
];

const ModifierPotions = {
  [Modifier.Initiative]: [
    $item`giraffe-necked turtle`,
  ]
};

const PotionEffects: { [item: string]: Effect } = {
  "giraffe-necked turtle": $effect`Adorable Lookout`,
};

function tryUsePotions(items: Item[]) {
  items.filter(item => itemAmount(item) > 0).forEach(item => tryUsePotion(item));
}

function tryUsePotion(item: Item) {
  if (haveEffect(PotionEffects[item.name]) > 1) {
    return;
  }

  if (userConfirm("Use potion " + item.name + "?")) {
    use(1, item);
  }
  else {
    throw new Error ("User aborted on potion " + item.name);
  }
}
