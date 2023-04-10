import { getProperty } from "kolmafia";

export function monkeyPawRemainingWishes(): number {
  return 5 - parseInt(getProperty(MonkeyPawWishesProperty));
}

const MonkeyPawWishesProperty = "_monkeyPawWishesUsed";
