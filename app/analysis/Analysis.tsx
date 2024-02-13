"use client"
import { Text } from '@mantine/core';

import classes from "./StatsGroup.module.css"
import { getPagePathData, getStatData } from './serverActions';
import { useEffect, useState } from 'react';
import DotLoader from '../../components/Loader/loader';
interface d{
  title:string , 
  stats : string,
  description : string
}
let data:d[] = [];


export default function Analysis(){
  
  const [loading , setLoading] = useState(true);
  const [newData , setnewData] = useState([{
    title:"",
    stats:"",
    description:""
  }])
  const fetchData = async()=>{
    const fetchedData = await getStatData()
    data = fetchedData
    console.log("data : " , data)
    setnewData(data)
    setLoading(false);
  }
  const fetchPagePathData = async()=>{
    const res =await getPagePathData().then().catch(console.error);
    res?.forEach(row => {
      console.log(row.dimensionValues, row.metricValues);
  });
  }
  
  useEffect(()=>{
    fetchData();
    fetchPagePathData();
  } , [])

    if(!loading){
    const stats = newData.map((stat) => (
        <div key={stat.title} className={classes.stat}>
          <Text className={classes.count}>{stat.stats}</Text>
          <Text className={classes.title}>{stat.title}</Text>
          <Text className={classes.description}>{stat.description}</Text>
        </div>
      ));
    
      return (
        <>
      {
        !loading && (
          <div className={classes.root}>{stats}</div>
        )
      }
       </>
      )
    }
    if(loading){
      return <DotLoader/>
    }
}