"use client";
import { Card, Text } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import classes from "./StatsGroup.module.css";
import { getOsData, getStatData } from "./serverActions";
import { useEffect, useState } from "react";
import DotLoader from "../../components/Loader/loader";
import { osMonthData } from "./osMonth";
interface d {
  title: string;
  stats: string;
  description: string;
}
let data: d[] = [];

export default function Analysis() {
  //const [maximum , setMaximum] = useState(0);
  let maximum = 0;
  const [loadingOsData, setLoadingOsData] = useState(true);
  const [loading, setLoading] = useState(true);
  const [newData, setnewData] = useState([
    {
      title: "",
      stats: "",
      description: "",
    },
  ]);
  const [osMonth, setOsMonth] = useState([
    {
      date: "",
      mobile: 0,
      tablet: 0,
      desktop: 0,
    },
  ]);
  const fetchData = async () => {
    const fetchedData = await getStatData();
    data = fetchedData;
    console.log("data : ", data);
    setnewData(data);
    setLoading(false);
  };
  const fetchOsData = async () => {
    const res:any = await getOsData().then().catch(console.error);
    console.log(res);
    for(let i=0;i<res.length;i++){
      await console.log(res[i]["mobile"])
      maximum = Math.max(maximum , res[i]["mobile"])
      maximum = Math.max(maximum , res[i]["desktop"])
    }
    await console.log(maximum)
    await setOsMonth(res || []);
    
  };
  useEffect(() => {
    async function ASYNC(){
      await fetchData();
      await fetchOsData().then(()=>{setLoadingOsData(false);});
    }
    ASYNC();
  },[]);

  if (!loading) {
    const stats = newData.map((stat) => (
      <div key={stat.title} className={classes.stat}>
        <Text className={classes.count}>{stat.stats}</Text>
        <Text className={classes.title}>{stat.title}</Text>
        <Text className={classes.description}>{stat.description}</Text>
      </div>
    ));

    return (
      <>
        {!loading && (
          <Card m={"xl"}>
            <div className={classes.root}>{stats}</div>
          </Card>
        )}
        <Card m={"xl"}>
          {
            !loading && !loadingOsData &&
            <AreaChart
              tooltipAnimationDuration={200}
              yAxisProps={{ domain: [0, Math.max(...osMonth.map(o=>o.desktop))] }}
              unit=" users"
              h={300}
              data={!loadingOsData ? osMonth : []}
              dataKey="date"
              withLegend
              gridAxis="xy"
              series={[
                { name: "tablet", color: "indigo.6" },
                { name: "mobile", color: "blue.6" },
                { name: "desktop", color: "teal.6" },
              ]}
              curveType="linear"
            />
          }
        </Card>
      </>
    );
  }
  if (loading) {
    return <DotLoader />;
  }
}
