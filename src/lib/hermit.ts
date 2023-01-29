import { visitUrl } from "kolmafia";

export function cloversLeft(): number {
  const hermitPage = visitUrl("hermit.php");
  const stockLeftRegex = /d+ left in stock for today/;
  const match = hermitPage.match(stockLeftRegex);

  if (match != null && match.length > 0)
    return parseInt(match[0]);
  else
    return 0;
}
