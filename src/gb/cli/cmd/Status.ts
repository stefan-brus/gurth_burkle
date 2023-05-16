import { getProperty, print } from "kolmafia";
import { Arguments } from "../Arguments";

export function statusCommand(_args: Arguments) {
  const KingLiberatedProperty = "kingLiberated";
  const kingLiberated = getProperty(KingLiberatedProperty) === "true";

  if (kingLiberated) {
    print("Gurth Burkle is not currently in-run.");
  }
  else {
    print("Gurth Burkle is in-run.");
  }
}
