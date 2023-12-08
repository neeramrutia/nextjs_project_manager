"use client";
import { useState , useEffect } from "react";
import { useSession } from 'next-auth/react'
import { useDisclosure } from '@mantine/hooks';
import SignedOutNavbar from "../components/signedOutNavbar";
import SignedInNavbar from "../components/signedInNavbar";
import  dbconnect  from "../utils/database";

export default function MyHome() {
  const { data : session } = useSession();
  const [opened, { toggle }] = useDisclosure();
  useEffect(() => {
    async function connectToDB(){
      console.log("useEffect running")
      let db = await dbconnect();
    }
    connectToDB();
  }, [])
  
  
  
  return (
    <div>
      {
        !session && (
          <SignedOutNavbar/>
        )
      }
      {
        session && (
          <SignedInNavbar/>
        )
      }
      
      </div>
  );
}

// import dbconnect from "../utils/database"
// export default function myHome(){
//   const db = dbconnect();
//   return <h1>Home</h1>
// }