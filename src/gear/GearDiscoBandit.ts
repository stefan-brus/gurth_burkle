import { Item, Slot } from "kolmafia";
import { $item } from "libram";
import { selectGear } from "./Utils";

export function selectDiscoBanditGear(reservedSlots: Slot[]) {
  selectGear(
    reservedSlots,
    DiscoBanditHats,
    DiscoBanditCloaks,
    DiscoBanditShirts,
    DiscoBanditWeapons,
    DiscoBanditOffhands,
    DiscoBanditPants,
    DiscoBanditAccessories,
    DiscoBanditFamiliar,
  );
}

const DiscoBanditHats: Item[] = [
  $item`brown paper bag mask`,
  $item`disco mask`,
];

const DiscoBanditCloaks: Item[] = [
  $item`Misty Cape`,
];

const DiscoBanditShirts: Item[] = [
  $item`autumn sweater-weather sweater`,
  $item`eXtreme Bi-Polar Fleece Vest`,
];

const DiscoBanditWeapons: Item[] = [
  $item`soap knife`,
  $item`candy knife`,
  $item`sharpened spoon`,
  $item`broken beer bottle`,
  $item`boot knife`,
  $item`sewer snake`,
  $item`disco ball`,
];

const DiscoBanditOffhands: Item[] = [
  $item`autumn debris shield`,
  $item`hot plate`,
];

const DiscoBanditPants: Item[] = [
  $item`old sweatpants`,
];

const DiscoBanditAccessories: Item[] = [
  $item`badass belt`,
  $item`batskin belt`,
  $item`shiny ring`,
  $item`imp unity ring`,
  $item`dirty hobo gloves`,
];

const DiscoBanditFamiliar: Item[] = [
  $item`astral pet sweater`,
];
