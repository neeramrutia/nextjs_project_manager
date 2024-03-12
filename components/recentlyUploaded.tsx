import { Badge, Button, Card, Grid, Group, Image, Pill, Text, em, rem, Image as IMage,} from "@mantine/core";
import { useState, useEffect, useCallback } from "react";

import DotLoader from "./Loader/loader";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import "../public/CarouselCard.module.css";
import classes from "../public/Demo.module.css";
import { IconArrowRight, IconArrowLeft, IconStar } from "@tabler/icons-react";
export default function RecentlyUploaded() {
  const isTab = useMediaQuery(`(max-width: ${em(1000)})`);
  const isMobile = useMediaQuery(`(max-width: ${em(500)})`);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([{
    title : "",
    ProjectLink : "",
    _id : "",
    images:[""],
    technologiesUsed : [""]
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
  let counter = 0
  var items = projects.map((item) => (
    <Grid.Col span={isMobile ? 12 : isTab ? 6 : 4} key={counter++}>
          <Card
            radius="md"
            withBorder
            padding="xl"
          >
            <Card.Section>
              <Carousel
                styles={{ control: { backgroundColor: "black" } }}
                withIndicators
                nextControlIcon={
                  <IconArrowRight
                    color="white"
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
                previousControlIcon={
                  <IconArrowLeft
                    color="white"
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
                loop
                classNames={{
                  root: classes.carousel,
                  controls: classes.carouselControls,
                  indicator: classes.carouselIndicator,
                }}
              >
                {item?.images?.map((image) => (
                  <Carousel.Slide key={image}>
                    <IMage src={image} height={220} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Card.Section>

            <Group justify="space-between" mt="lg">
              <Text fw={500} fz="lg">
                {item.title}
              </Text>

              <Group gap={5}>
                <IconStar style={{ width: rem(16), height: rem(16) }} />
                <Text fz="xs" fw={500}>
                  4.78
                </Text>
              </Group>
            </Group>

            <Text fz="sm" c="dimmed" mt="sm">
              {item?.technologiesUsed?.map((tech) => (
                <>
                  <Pill size="lg" ml={"xs"} mb={"xs"}>
                    {tech}
                  </Pill>
                </>
              ))}
            </Text>

            <Group justify="space-around" mt="md">
              <Button
                color={"dark"}
                w={"100%"}
                radius="md"
                onClick={() => {
                  window.open(`/project/${item._id}`);
                }}
              >
                View Project
              </Button>
            </Group>
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
