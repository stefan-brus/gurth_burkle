import { getProperty, Item, itemAmount, runChoice, use, visitUrl } from "kolmafia";
import { $item } from "libram";

export function gnasirWants(item: Item): boolean {
  let bit = GnasirItemBits.get(item);
  
  if (bit === undefined) {
    throw new Error(item.name + " is not a Gnasir item");
  }
  
  return (parseInt(getProperty(GnasirProperty)) & bit) === 0;
}

export function gnasirSatisfied(): boolean {
  for (const item of GnasirItemBits.keys()) {
    if (gnasirWants(item))
      return false;
  }

  return true;
}

export function doGnasir() {
  let page = visitUrl("place.php?whichplace=desertbeach&action=db_gnasir");

  while (page.includes("value=2")) {
    page = runChoice(2);
  }

  runChoice(1);

  use(itemAmount($item`desert sightseeing pamphlet`), $item`desert sightseeing pamphlet`);

  if (itemAmount($item`worm-riding hooks`) > 0 && itemAmount($item`drum machine`) > 0) {
    use(1, $item`drum machine`);
  }
}

const GnasirProperty = "gnasirProgress";

const GnasirItemBits = new Map<Item, number>([
  [$item`stone rose`, 1],
  [$item`can of black paint`, 2],
  [$item`killing jar`, 4],
  [$item`worm-riding manual page`, 8],
  [$item`drum machine`, 16],
]);
