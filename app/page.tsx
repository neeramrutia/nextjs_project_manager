"use client";
import { useState , useEffect } from "react";
import DotLoader from "../components/Loader/loader";
import SignedOutNavbar from "../components/signedOutNavbar";
import  dbconnect  from "../utils/database";

export default function MyHome() {
  const [loading , setLoading] = useState(true);
  
  useEffect(() => {
    async function connectToDB(){
      // console.log("useEffect running")
      let db = await dbconnect();
      setLoading(false);
    }
    connectToDB();
  }, [])
  
  
  if (loading) {
    return(
      <DotLoader/>
    );
  }
  else{
  return (
    <div>
      {
          <SignedOutNavbar/>
      }
      </div>
  );}
}

// import dbconnect from "../utils/database"
// export default function myHome(){
//   const db = dbconnect();
//   return <h1>Home</h1>
// }