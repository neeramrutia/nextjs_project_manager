import { DefaultSession } from "next-auth";

declare module "next-auth"{
interface Session{
    user:{
        id:String;
        isCoordinator:Boolean;
        isAdmin:Boolean;
        role:String
    } & DefaultSession["user"];
}
}