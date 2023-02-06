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

const AdventureModifiers: Modifier[] = [
  Modifier.Initiative,
  Modifier.StenchRes,
];

const ModifierPotions = {
  [Modifier.Initiative]: [
    $item`giraffe-necked turtle`,
  ],
  [Modifier.StenchRes]: [
    $item`Polysniff Perfume`,
  ],
};

const PotionEffects: { [item: string]: Effect } = {
  "giraffe-necked turtle": $effect`Adorable Lookout`,
};

function selectPotionsModifier(mod: Modifier) {
  switch (mod) {
    case Modifier.Initiative:
    case Modifier.StenchRes:
      tryUsePotions(ModifierPotions[mod]);
      break;
    default:
      break;
  }
}

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
