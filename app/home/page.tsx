"use client"
import { useSession } from "next-auth/react";
import SignedInNavbar from "../../components/signedInNavbar";
import DotLoader from "../../components/Loader/loader";
export default function Home(){
    const { data : session } = useSession();
    return (
       <> 
       {
        !session && (
          <DotLoader/>
        )
       }
       {
            session && (
              <SignedInNavbar/>
            )
          }
        </>
    )
}