import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from '../../../../models/userModel'
import dbconnect from "../../../../utils/database";
import { GithubProfile } from "next-auth/providers/github";
dbconnect();
export const options: NextAuthOptions = {
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
                    placeholder: "enter you password"
                },
            },
            async authorize(credentials){
                console.log('authorize called');
                const user = await User.findOne({email : credentials?.username});
                console.log('this is user printed from authorize fun : '+ user);
                if(!user){return null}
                else{
                    try {
                        if(user.password == credentials?.password){
                            console.log('user is verified');
                            const returnUser = {id:user._id,name : user.name , email:user.email}
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
                console.log(session);

                return session
            } catch (error) {
                console.log(error);
                return session
            }
            // const sessionUser = await User.findOne({email : session?.user?.email});
            // console.log(sessionUser);
            // console.log("----------");
            // console.log(session);
            // return session
        },
        async signIn({profile}){
            try {
                if(profile == undefined){return true} // returning true for objects whose origin was authorize fun
                console.log(profile);
                var userExist = await User.findOne({email : profile?.email});
                if(!userExist){
                    const usertobecreated = await User.create({
                        email : profile?.email,
                        name : profile?.name,
                        password : "1234"
                    })
                }

                console.log(profile);
                return true;
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