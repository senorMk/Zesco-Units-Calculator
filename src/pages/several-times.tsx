import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

const FirstTime = () => {
  const [previousAmount, setPreviousAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [unitsPurchased, setUnitsPurchased] = useState(0);

  const onCalculateUnits = () => {
    axios
      .post('/api/calculate/several-times', { amount, previousAmount })
      .then((res) => {
        setUnitsPurchased(res.data.value);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col items-center animate-fade-in-down justify-center relative cursor-default">
      <Link href="/" passHref>
        <h1 className="sm:pt-32 text-5xl text-center">
          Zesco Units Calculator
        </h1>
      </Link>
      <h1 className="py-4 text-3xl text-center">
        How much have you already spent this month?
      </h1>
      <div className="py-1" />
      <input
        className="px-5 py-2 text-center rounded-full border border-orange-400"
        value={previousAmount}
        onChange={(e) => {
          setPreviousAmount(Number(e.target.value));
          setUnitsPurchased(0);
        }}
      ></input>
      <h1 className="py-4 text-3xl text-center">
        How much would you like to spend today?
      </h1>
      <div className="py-1" />
      <input
        className="px-5 py-2 text-center rounded-full border border-orange-400"
        value={amount}
        onChange={(e) => {
          setAmount(Number(e.target.value));
          setUnitsPurchased(0);
        }}
      ></input>
      {unitsPurchased ? (
        <h1 className="pt-5 text-3xl text-center">
          For K{amount}, you should get approximately {unitsPurchased} units (
          {unitsPurchased} kWh)!
        </h1>
      ) : (
        <></>
      )}
      <div className="pt-5">
        <button
          className="px-5 py-2 rounded-full border border-orange-400 hover:text-white hover:bg-orange-600"
          onClick={onCalculateUnits}
        >
          Calculate
        </button>
      </div>
      <div className="pt-5">
        <Link href="/" passHref>
          <button className="px-5 py-2 rounded-full border border-orange-400 hover:text-white hover:bg-orange-600">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FirstTime;
