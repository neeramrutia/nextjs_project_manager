'use client';
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
interface Props {
    children?: ReactNode,
    session?:Session
    // any props that come into the component
}
const Provider = ({ children , session } : Props)=>{
    return(
        <SessionProvider session={session}>
        {children}
        </SessionProvider>
    )
}

export default Provider