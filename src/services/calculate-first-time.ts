export default function calculateFirstBuyUnits(amount: number): number {
  const tariffOneCost = 0.56;
  const tariffTwoCost = 1.01;
  const tariffThreeCost = 2.31;

  const tariffOneMaxCost = 56;
  const tariffTwoMaxCost = 202;

  const tariffOneMaxUnits = 100;
  const tariffOneAndTwoMaxUnits = 300;

  let numberOfUnits = 0;
  if (amount <= tariffOneMaxCost) {
    numberOfUnits = amount / tariffOneCost;
    return numberOfUnits;
  } else {
    if (amount - tariffOneMaxCost <= tariffTwoMaxCost) {
      const left = amount - tariffOneMaxCost;
      numberOfUnits = tariffOneMaxUnits + left / tariffTwoCost;
      return numberOfUnits;
    } else {
      const left = amount - tariffOneMaxCost - tariffTwoMaxCost;
      numberOfUnits = tariffOneAndTwoMaxUnits + left / tariffThreeCost;
      return numberOfUnits;
    }
  }
}
