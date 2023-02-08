import { getProperty, Item } from "kolmafia";
import { $item } from "libram";

export function gnasirWants(item: Item): boolean {
  let bit = GnasirItemBits.get(item);
  
  if (bit === undefined) {
    throw new Error(item.name + " is not a Gnasir item");
  }
  
  return (parseInt(getProperty(GnasirProperty)) & bit) === 0;
}

const GnasirProperty = "gnasirProgress";

const GnasirItemBits = new Map<Item, number>([
  [$item`stone rose`, 1],
  [$item`can of black paint`, 2],
  [$item`killing jar`, 4],
  [$item`worm-riding manual page`, 8],
  [$item`drum machine`, 16],
]);
