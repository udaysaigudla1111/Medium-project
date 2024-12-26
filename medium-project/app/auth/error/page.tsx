import React from 'react'

const page = async({searchParams}:{ searchParams:Promise<{ error:string }> }) => {
    const {error} = await searchParams
  return (
    <div className='h-screen bg-gray-900 flex justify-center items-center text-white'>
        <div className='bg-gray-800 w-96 rounded-md h-auto p-6 flex flex-col gap-3 items-center'>
            <h1>Error Message:</h1>
            <h1 className='font-bold text-2xl'>{error}</h1>
        </div>
    </div>
  )
}

export default page