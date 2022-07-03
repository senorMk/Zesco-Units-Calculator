import type { NextApiRequest, NextApiResponse } from 'next';
import z from 'zod';
import calculateFirstBuyUnits from '../../../services/calculate-first-time';

const schema = z.object({
  amount: z.number().positive(),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    try {
      const data = schema.parse(req.body);
      const amount = data.amount;
      const numberOfUnits = calculateFirstBuyUnits(amount).toFixed(1);

      return res.status(200).json({ units: 'kWh', value: numberOfUnits });
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
