import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {z} from 'zod'
import prisma from '@/db';
import argon2 from 'argon2';


const NEXT_AUTH = {
    // adapter:PrismaAdapter(prisma),
    // session:{
    //     strategy:'jwt'
    // },
    providers:[
        CredentialsProvider({
            name:"Email",
            credentials: {
                email: { label:'Email',type:"text",placeholder:"Email"},
                password: { label:'Password',type:"password",placeholder:"Password" },
                name: { label:'Username',type:'text',placeholder:"Username"}
            },
            async authorize(credentials:any)
            {   
               try {
                const data = credentials;

                const user = await prisma.user.findUnique({
                    where:{
                        email:data.email,
                        name:data.name
                    }
                })
                console.log(`user from the database${JSON.stringify(user)}`);
                
                if(!user)
                {
                    throw new Error("User does not exist!!! please signup")
                }

                const hashedPassword = user.password!
                const password = data.password
                console.log(`USer entered password ${password}`);
                
                  console.log(`User ${user}`);
                const isPasswordMatch = await argon2.verify(hashedPassword,data.password)
                
                console.log(isPasswordMatch);
                
                
                if(!isPasswordMatch)
                {
                    return null
                }

                return {
                    id:user.id,
                    email:user.email,
                    name:user.name
                }


               } catch (error:any) {
                    console.log(JSON.stringify(error));
                    throw new Error(`Error occured ${error.meta} ${error.message} ${error.code} `)
                    // return null
               }
                
               
            
            }
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        async redirect({url,baseUrl}:any)
        {
            console.log(url);
            console.log(baseUrl);
            
            
            return baseUrl
        },
        
    },
    pages:{
        error:'/auth/error'
    }
}

export {NEXT_AUTH}