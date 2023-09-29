import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectMongo from '../../../database/conn'
import {compare} from 'bcryptjs'

export default NextAuth({
    providers: [
        //Google Provider
        GoogleProvider({
            clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
        }),
         //GitHub Provider
         GitHubProvider({
            clientId: process.env.NEXT_GITHUB_CLIENT_ID,
            clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET,
        }),
        //Credentials Provider
        CredentialsProvider({
             name: "Credentials",
             async authorize(credentials,req){
                 connectMongo().catch(error => {error: "Connection Failed...!"})

                 //check user existence
                 const result = await Users.findOne({email: credentials.email })
                 if(!result){
                    throw new Error("No User FOund with Email Please Sign Up...!")
                 }

                 //compare()
                 const checkPassword = await compare(credentials.password, result.password)

                 //incorrect password
                 if(!checkPassword || result.email !==credentials.email){
                    throw new Error("Username or Password doesn't match")
                 }
                 return result
             }
        })
    ],
    secret: "DguaB7lX6W3Z80igpCrv/m1KYR68xAdePm3qWC/ZqGk=" //openssl rand -base64
})

