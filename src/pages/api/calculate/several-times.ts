import type { NextApiRequest, NextApiResponse } from 'next';
import z, { boolean } from 'zod';
import calculateFirstBuyUnits from '../../../services/calculate-first-time';

const schema = z.object({
  amount: z.number().positive(),
  previousAmount: z.number().positive(),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    try {
      const data = schema.parse(req.body);
      const currentAmount = data.amount;
      const previousAmount = data.previousAmount;

      const tariffOneCost = 0.56;
      const tariffTwoCost = 1.01;
      const tariffThreeCost = 2.31;
      const tariffOneMaxUnits = 100;
      const threeHundredUnitsCost = 258;
      const tariffTwoMaxCost = 202;

      if (previousAmount > threeHundredUnitsCost) {
        const numberOfUnits = (currentAmount / tariffThreeCost).toFixed(1);
        return res.status(200).json({ units: 'kWh', value: numberOfUnits });
      } else {
        const previousUnits = calculateFirstBuyUnits(previousAmount);

        if (previousUnits <= tariffOneMaxUnits) {
          let tariffOneDifferenceUnits = tariffOneMaxUnits - previousUnits;
          let tariffOneDifferenceKwacha =
            tariffOneDifferenceUnits * tariffOneCost;

          if (currentAmount <= tariffOneDifferenceKwacha) {
            const numberOfUnits = (currentAmount / tariffOneCost).toFixed(1);
            return res.status(200).json({ units: 'kWh', value: numberOfUnits });
          } else {
            let tariffOneExcessKwacha =
              currentAmount - tariffOneDifferenceKwacha;

            if (tariffOneExcessKwacha <= tariffTwoMaxCost) {
              let tariffTwoUnits = tariffOneExcessKwacha / tariffTwoCost;
              const numberOfUnits = (
                tariffOneDifferenceUnits + tariffTwoUnits
              ).toFixed(1);
              return res
                .status(200)
                .json({ units: 'kWh', value: numberOfUnits });
            } else {
              let tariffOneUnits = tariffOneDifferenceUnits;
              let tariffTwoUnits = 145 / tariffTwoCost;
              let tariffThreeAmount =
                currentAmount - tariffOneDifferenceKwacha - 145;
              let tariffThreeUnits = tariffThreeAmount / tariffThreeCost;

              const numberOfUnits = (
                tariffOneUnits +
                tariffTwoUnits +
                tariffThreeUnits
              ).toFixed(1);
              return res
                .status(200)
                .json({ units: 'kWh', value: numberOfUnits });
            }
          }
        } else if (previousUnits > tariffOneMaxUnits) {
          let tariffTwoDifference = 300 - previousUnits;
          let tariffTwoShortfall = tariffTwoDifference * tariffTwoCost;

          if (currentAmount <= tariffTwoShortfall) {
            const numberOfUnits = (currentAmount / tariffTwoCost).toFixed(1);
            return res.status(200).json({ units: 'kWh', value: numberOfUnits });
          } else {
            let needed = (currentAmount - tariffTwoShortfall) / tariffThreeCost;
            const numberOfUnits = (tariffTwoDifference + needed).toFixed(1);
            return res.status(200).json({ units: 'kWh', value: numberOfUnits });
          }
        }
      }
    } catch (e) {
      return res.status(400).send({
        message: `Invalid payload!`,
      });
    }
  } else {
    return res.status(400).send({
      message: `Invalid payload!`,
    });
  }
}
