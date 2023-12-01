'use client'
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { json } from "stream/consumers";
export default function specificProject(){

    const pathname = usePathname();
    const projectId = pathname.split('/')[2];
    const [mydata , setmyData] = useState({});
    const fetchData = useCallback(async () => {
        
        const res = await fetch(`/api/projects/${projectId}`);
        const data = await res.json();
        console.log(data);
        setmyData(data);
        console.log(mydata);
      }, [])
      useEffect(() => {
        fetchData()
          .catch(console.error);
      }, [fetchData])


    
    return(
        <>
        {pathname}
        ==========
        {projectId}
        {JSON.stringify(mydata)}
        </>
    )
}