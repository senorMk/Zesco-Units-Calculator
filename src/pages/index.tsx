import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  let router = useRouter();

  const onClickFirstTime = () => {
    router.push('/first-time');
  };
  const onClickSecondTime = () => {
    router.push('/several-times');
  };

  return (
    <div className="flex flex-col items-center animate-fade-in-down h-screen justify-center relative cursor-default">
      <Link href="/" passHref>
        <h1 className="text-5xl text-center">Zesco Units Calculator</h1>
      </Link>
      <h1 className="py-4 text-3xl text-center">
        Is this your first purchase of this month?
      </h1>
      <div className="pt-5 flex flex-row space-x-4">
        <button
          className="px-5 py-2 rounded-full border border-orange-400 hover:text-white hover:bg-orange-600"
          onClick={onClickFirstTime}
        >
          Yes
        </button>
        <button
          className="px-5 py-2 rounded-full border border-orange-400 hover:text-white hover:bg-orange-600"
          onClick={onClickSecondTime}
        >
          No
        </button>
      </div>
    </div>
  );
}
