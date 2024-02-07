import type { ISODateString, NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from '../../../../models/userModel'
import dbconnect from "../../../../utils/database";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import { Profile } from "next-auth";
export type CustomSession = {
    user?:CustomUser;
    expires:ISODateString;
}
export type CustomUser = {
    id?:string|null;
    name?:string|null;
    email?:string|null;
    password?:string|null;
    isAdmin?:boolean|null;
    isCoordinator?:boolean|null;
    role?:string|null;
}
dbconnect();
export const options: NextAuthOptions = {
    session:{
        strategy:"jwt"
    } , 
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID as string,
            clientSecret:process.env.GOOGLE_SECRET as string,
        }),
        GitHubProvider({
            clientId : process.env.GITHUB_ID as string,
            clientSecret : process.env.GITHUB_SECRET as string,
            
        }),
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username:{
                    label:"Username : ",
                    type: "email",
                    placeholder: "enter you email",
                },
                password:{
                    label:"Password : ",
                    type: "password",
                    required:true,
                    placeholder: "enter you password"
                },
            },
            async authorize(credentials){
                const user = await User.findOne({email : credentials?.username});
                if(!user){return null}
                else{
                    try {
                        const hashPass = await bcrypt.compare(credentials?.password || "",user.password);
                        if(hashPass){
                            const returnUser = {id:user._id,name : user.name , email:user.email , role : user?.role == null ? "user" : user.role}
                            return returnUser;
                        }
                        else return null;
                    } catch (error) {
                        console.log(error);
                        return user;
                    }
                    
                }
            }
        })
    ],
    callbacks:{
        async redirect({url , baseUrl}){
            if (url == "/")
            return baseUrl
            return "/home"
        }
        ,
        async jwt({ token , user} : {token : JWT , user : CustomUser}){
            
            if(user)
            {
               token.role = user.role
               if(user.role == undefined){
                const tokenUser = await User.findOne({email:token.email})
                token.role = tokenUser?.role
               }
            }
            return token
        },

        async session({session }){
            try {
                const user = await User.findOne({email:session.user?.email});
                var userRole = 'user';
                if(user.isAdmin) userRole = 'Admin';
                if(user.isCoordinator) userRole = 'Coordinator';

                session.user.id = user._id;
                session.user.isCoordinator = user.isCoordinator;
                session.user.isAdmin = user.isAdmin;
                session.user.role = userRole;

                return session
            } catch (error) {
                console.log(error);
                return session
            }
        },
        async signIn({user , profile}){
            try {
                // if(profile == undefined){return true} // returning true for objects whose origin was authorize fun
                if(profile != undefined)
                {
                var userExist = await User.findOne({email : profile?.email});
                if(!userExist){
                    const usertobecreated = await User.create({
                        email : profile?.email,
                        name : profile?.name,
                        password : "1234"
                    })
                }
                return true;
            }
            else{
                    return true ;
            }
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
    
}

// function makeid(length : number) {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     let counter = 0;
//     while (counter < length) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//       counter += 1;
//     }
//     return result;
// }