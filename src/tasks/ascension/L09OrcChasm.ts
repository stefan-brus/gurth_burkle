import { getProperty, itemAmount, use, visitUrl } from "kolmafia";
import { $item } from "libram";

export function buildOrcChasmBridge(): number {
  use(itemAmount($item`smut orc keepsake box`), $item`smut orc keepsake box`);

  const curProgress = parseInt(getProperty("chasmBridgeProgress"));
  visitUrl("place.php?whichplace=orc_chasm&action=bridge" + curProgress);
  return parseInt(getProperty("chasmBridgeProgress"));
}
