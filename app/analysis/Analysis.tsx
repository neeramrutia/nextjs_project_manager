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
    const res = await getOsData().then().catch(console.error);
    setOsMonth(res || []);
    
  };

  useEffect(() => {
    fetchData();
    fetchOsData().then(()=>{setLoadingOsData(false);});
  }, [osMonth , osMonthData]);

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
            !loadingOsData &&
            <AreaChart
              tooltipAnimationDuration={200}
              yAxisProps={{ domain: [0, 20] }}
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
