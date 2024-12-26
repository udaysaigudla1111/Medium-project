"use client"
import React from 'react'
import { signIn,signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const AppBar = () => {
    const router = useRouter();
  return (
    <div className='h-16 bg-[#f7f4ed] border border-b-black flex justify-between items-center px-14 py-10 '>
        <div className=''>
            <h1 className='font-bold text-2xl'>Medium</h1>
        </div>
        <div className='flex items-center gap-7'>
            <h1>Out story</h1>
            <h1>Membership</h1>
            <h1>Write</h1>
            <h1 className='cursor-pointer' onClick={()=>{ router.push("/signup") }}>Sign up</h1>
            <h1 className='cursor-pointer' onClick={()=>{
                signIn();
            }}>Sign in</h1>
            <button className='px-3 py-2 rounded-full bg-black text-white hover:scale' onClick={()=>{ signOut() }}>LogOut</button>
        </div>
    </div>
  )
}

export default AppBar