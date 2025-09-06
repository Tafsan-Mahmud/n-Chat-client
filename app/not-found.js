// pages/404.js

import Link from 'next/link';

const Custom404 = () => {
  return (
    <>
      <div className="flex items-center justify-center text-gray-800 mt-[10%]">
        <div className="text-center p-8 max-w-md mx-auto">
          <h1 className="text-9xl font-extrabold text-gray-300 mb-4 dark:text-stone-400">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-stone-300">Page Not Found</h2>
          <p className="text-lg mb-8 dark:text-stone-300">
            Oops! The page youre looking for doesnt exist. It might have been moved or deleted.
          </p>
          <Link href="/" className="inline-block dark:bg-stone-200 bg-blue-800 dark:hover:bg-stone-300 dark:text-stone-800 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 ease-in-out shadow-md">
              Go to Home Page
          </Link>
        </div>
      </div>
    </>
  );
};

export default Custom404;