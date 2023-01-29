import { buy, hermit, Item, itemAmount, visitUrl } from "kolmafia";

export function cloversLeft(): number {
  const hermitPage = visitUrl("hermit.php");
  const stockLeftRegex = /d+ left in stock for today/;
  const match = hermitPage.match(stockLeftRegex);

  if (match != null && match.length > 0)
    return parseInt(match[0]);
  else
    return 0;
};

export function buyClovers() {
  if (itemAmount(Item.get("hermit permit")) < 1 && !buy(1, Item.get("hermit permit"))) {
    throw new Error("Unable to acquire hermit permit");
  }

  const toBuy = cloversLeft();
  if (!hermit(toBuy, Item.get("11-leaf clover")))
  {
    throw new Error("Unable to buy daily clovers");
  }
};
