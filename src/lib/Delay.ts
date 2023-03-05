import { setProperty } from "kolmafia";
import { Properties } from "../Properties";

export function resetDelayProperties() {
  const DelayInitVals: Map<string, number> = new Map([
    // Delayed adventures
    [Properties.Ascension.Delay.SpookyForest, 5],
    [Properties.Ascension.Delay.HauntedGallery, 5],
    [Properties.Ascension.Delay.HauntedBathroom, 5],
    [Properties.Ascension.Delay.HauntedBallroom, 5],
    [Properties.Ascension.Delay.HauntedBedroom, 6],
    [Properties.Ascension.Delay.Oasis, 6],
    [Properties.Ascension.Delay.Airship, 25],

    // Forced adventures
    [Properties.Ascension.Delay.HiddenOffice, 5],
    [Properties.Ascension.Delay.DarkNeck, 15],
    [Properties.Ascension.Delay.DarkHeart, 15],
    [Properties.Ascension.Delay.DarkElbow, 15],
    [Properties.Ascension.Delay.HiddenPark, 7],
    [Properties.Ascension.Delay.HiddenApartment, 9],
    [Properties.Ascension.Delay.CobbsKnob, 10],
    [Properties.Ascension.Delay.CastleGround, 10],
  ]);

  for (const [prop, val] of DelayInitVals) {
    setProperty(prop, val.toString());
  }
}
