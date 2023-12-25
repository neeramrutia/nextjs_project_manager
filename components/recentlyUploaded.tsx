import { Badge, Button, Card, Grid, Group, Image, Pill, Text } from "@mantine/core";
import { error } from "console";
import { useState, useEffect, useCallback } from "react";

import DotLoader from "./Loader/loader";
export default function RecentlyUploaded() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([{
    title : "",
    ProjectLink : "",
    _id : ""
  }]);

  const fetchData = useCallback(async () => {
    console.log("fetch data called in recents");
    const res = await fetch("/api/projects/recentlyUploaded");
    const data = await res.json();
    setLoading(false);
    setProjects(data);
  }, []);
  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  var items = projects.map((item) => (
    <Grid.Col span={4} key={item.title}>
    <Card key={item.title} shadow="sm" padding="lg" radius="md" withBorder className="">
      <Card.Section>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{item.title}</Text>
        <Badge color="lime" variant="light">
          Recently Added
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={4}>
        <Text size="sm" c = "dimmed" ml={"xs"}> Technology used :  </Text> 
        <br></br>
        <Pill ml={"xs"} mb={"xs"}>neer</Pill>
        <Pill ml={"xs"} mb={"xs"}>neer</Pill>
        <Pill ml={"xs"} mb={"xs"}>neer</Pill>
        <Pill ml={"xs"} mb={"xs"}>neer</Pill>
        <Pill ml={"xs"} mb={"xs"}>neer</Pill>
        <Pill ml={"xs"} mb={"xs"}>neer</Pill>
        <Pill ml={"xs"} mb={"xs"}>neer</Pill>
        <Pill ml={"xs"} mb={"xs"}>neer</Pill>
        <Pill ml={"xs"} mb={"xs"}>neer</Pill>
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={()=>{window.open(`/project/${item._id}`, "_blank");}}>
        See Details
      </Button>
    </Card>
    </Grid.Col>
  ));

  if (loading) {
    return <DotLoader />;
  } else {
    return (
      <>
        <Grid>
          {items}
        </Grid>
      </>
    );
  }
}
