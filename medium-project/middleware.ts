import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { NEXT_AUTH } from "./app/lib/auth";
import { getToken } from "next-auth/jwt";



export const middleware = async(req:NextRequest)=>{

    // const session = getServerSession(NEXT_AUTH)
    // console.log(session);
    
    // if(!session)
    // {
    //  
    // }
   
    if(req.nextUrl.pathname.startsWith("/api/v1/blog"))
    {
        
         const token =await getToken({req})
        if(!token)
        {
           
            return NextResponse.redirect(new URL('/',req.url))
        }
         console.log(token);
        const res = NextResponse.next();
        console.log(res);
        
        return res
    }

}