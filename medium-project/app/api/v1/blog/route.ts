import { NextResponse } from "next/server"



export const GET = ()=>{
   return NextResponse.json({
    message:"in the blog get request"
   })
}