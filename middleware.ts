// export { default } from "next-auth/middleware"

// export const config = { matcher :['/admins:path*' , '/users' , '/coordinators']}

import { getToken } from "next-auth/jwt";
import { NextRequest , NextResponse } from "next/server";
import { CustomUser } from "./app/api/auth/[...nextauth]/options";

export async function middleware(request : NextRequest){
    const { pathname  } = request.nextUrl

    const token = await getToken({req:request})
    const adminRoutes = ["/admins" , "/users" , "/coordinators" , "showProjects"]
    const userRoutes = ["/home" , "/showProjects"]
    if(token == null && userRoutes.includes(pathname)){
        return NextResponse.redirect(new URL("/api/auth/signin" , request.url))
    }

    if(token == null && adminRoutes.includes(pathname)){
        return NextResponse.redirect(new URL("/api/auth/signin" ,request.url))
    }
    if(token != null && "/".includes(pathname)){
        return NextResponse.redirect(new URL("/home" ,request.url))
    }
    const user : CustomUser|null = token?.user as CustomUser
    if(adminRoutes.includes(pathname)  &&  (token?.role == "user" || token?.role == "coordinator")){
        return NextResponse.redirect(new URL("/api/auth/signin?error=please login as admin" , request.url))
    }
}