"use client";
import { useState } from "react";
import { signIn, signOut , useSession} from 'next-auth/react'
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group } from '@mantine/core';
import { NavLink } from '@mantine/core';
import { IconFingerprint , IconBrandGoogle , IconBrandGithub , IconPassword , IconHome , IconHistory , IconFileLike} from '@tabler/icons-react';
import Home from "../components/homeComponent";
import { useRouter } from 'next/navigation'
import SignedOutNavbar from "../components/signedOutNavbar";
import SignedInNavbar from "../components/signedInNavbar";

export default function MyHome() {
  const { data : session } = useSession();
  const [opened, { toggle }] = useDisclosure();
  
  console.log(session)
  
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