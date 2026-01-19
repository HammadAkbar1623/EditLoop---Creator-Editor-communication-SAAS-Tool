'use client'

import { useRouter } from 'next/navigation'


function Page() {

  const router = useRouter()

  function handleClick( role: "creator" | "editor") {
    router.push(`/auth?role=${role}`)
  }


  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center pt-20 text-center">
        <h1 className="text-green-300 text-5xl font-bold mb-8">
          Stream Line your Workflow
        </h1>

        <h1 className="text-white">You are a </h1>
        <div className="flex gap-6">
          
          <button onClick={() => handleClick("creator")} className="px-6 py-2 bg-green-500 text-white rounded-md cursor-pointer">
            Creator
          </button>
          <button onClick={() => handleClick("editor")} className="px-6 py-2 bg-gray-700 text-white rounded-md cursor-pointer">
            Editor
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
