'use client'

import { useSearchParams } from 'next/navigation'

function Page() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900 px-4">
      {role === 'creator' ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Welcome Creator</h1>
          <h2 className="text-xl mb-6">Kindly Sign In / Sign Up</h2>

          <form className="flex flex-col gap-4 w-full max-w-sm">
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-md text-black border border-gray-300 placeholder-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-md text-black border border-gray-300 placeholder-gray-500"
            />
            <div className='flex flex-row gap-6 justify-center'>
              <button className="bg-green-500 text-white p-3 rounded-md mt-4 cursor-pointer">
                Sign In
              </button>
              <button className="bg-green-500 text-white p-3 rounded-md mt-4 cursor-pointer">
                Sign Up
              </button>
            </div>

          </form>
        </>
      ) : (
        <>
        <h1 className="text-3xl font-bold">Welcome Editor</h1>

        <h2 className="text-xl mb-6">Kindly Sign In / Sign Up</h2>

          <form className="flex flex-col gap-4 w-full max-w-sm">
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-md text-black border border-gray-300 placeholder-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-md text-black border border-gray-300 placeholder-gray-500"
            />
            <div className='flex flex-row gap-6 justify-center'>
              <button className="bg-green-500 text-white p-3 rounded-md mt-4 cursor-pointer">
                Sign In
              </button>
              <button className="bg-green-500 text-white p-3 rounded-md mt-4 cursor-pointer">
                Sign Up
              </button>
            </div>

          </form>
        </>
      )}
    </div>
  )
}

export default Page;
