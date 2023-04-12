import { Location } from "kolmafia";
import { $familiar, $location } from "libram";

export const GreyGooseLocations: Location[] = [
  $location`The Laugh Floor`, // imp air
  $location`Infernal Rackets Backstage`, // bus pass
  $location`Guano Junction`, // sonar-in-a-biscuit
  $location`The Goatlet`, // goat cheese
  $location`Oil Peak`, // bubblin' crude
  $location`Twin Peak`, // rusty hedge trimmer
  $location`The Hole in the Sky`, // star & line
  $location`The Hidden Bowling Alley`, // bowling ball
  $location`A Mob of Zeppelin Protesters`, // cigarette lighter
  $location`The Red Zeppelin`, // glark cable
  $location`The Middle Chamber`, // tomb ratchet
];

export function gooseWeight(): number {
  return Math.min(Math.floor(Math.sqrt($familiar`Grey Goose`.experience)), 20);
}
