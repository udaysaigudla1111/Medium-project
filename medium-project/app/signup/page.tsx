"use client"
import { signIn } from "next-auth/react"
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";


const Page = () => {
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("")
   
    const handleSignup = async ()=>{
       

        toast.promise(axios.post("http://localhost:3000/api/signup",{
            email,
            name,
            password
        }),{
            loading:'Loading...',
            success:(data)=>{
                return `${data.data.message}`
            },
            error:(data)=>{
                console.log(data);
                
                return `${data.response.data.message}`
            }
        })

    }


  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
           
       <div className="w-96 h-auto bg-white p-5 rounded-md shadow-md flex flex-col gap-2">
            <div>
                <h1 className="font-mono text-base mb-1">Email</h1>
                <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="border  px-3 py-1 w-full rounded-md outline-blue-500" />
            </div>
            <div>
                <h1 className="font-mono text-base mb-1">Username</h1>
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="border  px-3 py-1 w-full rounded-md outline-blue-500" />
            </div>
            <div>
                <h1 className="font-mono text-base mb-1">Password</h1>
                <input type="password" value={[password]} onChange={(e)=>{ setPassword(e.target.value) }} className="border px-3 py-1 w-full rounded-md outline-blue-500" />
            </div>
            <button className="bg-blue-500 py-1 rounded-md mt-2 text-white hover:scale-[1.01] active:scale-[0.98] duration-75 transition-all" onClick={handleSignup}>Signup</button>

            <div className="border border-b-gray-400 mt-3"></div>
           <button className="bg-green-500 py-1 rounded-md mt-2 text-white hover:scale-[1.01] active:scale-[0.98] duration-75 transition-all" onClick={()=>{ signIn() }}>Login</button>
            <button className="bg-red-500 py-1 rounded-md mt-2 text-white hover:scale-[1.01] active:scale-[0.98] duration-75 transition-all">Login with github</button>
        </div> 
    </div>
  )
}

export default Page