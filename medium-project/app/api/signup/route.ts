import { NextRequest } from "next/server";
import prisma from "@/db";
import argon2 from 'argon2'
import crypto from 'crypto'
export const POST =async (req:NextRequest)=>{

    const {email,name,password} = await req.json();

    try {
        const user = await prisma.user.findUnique({
            where:{
                email,
                name
            }
        })
        if(!user)
        {
            const salt = generateSalt(16)
            const hashedPassword = await argon2.hash(password,{salt})
            const user = await prisma.user.create({
                data:{
                    email,
                    name,
                    password:hashedPassword
                }
            })
            
            return Response.json({
                message:`Signup is successfull!!!`,
                name:user.name
            })
        }
        else{
            return Response.json({
                message:"User already exists"
            },
           {
                status:400
           })
        }

    } catch (error:any) {
        console.log(JSON.stringify(error));
        return Response.json({
            message:`Error occured ${error.message} ${error.meta} ${error.code}`
        },{
            status:500
        })
    }

    
}

const generateSalt = (a:number)=>{
    return crypto.randomBytes(a);
}
