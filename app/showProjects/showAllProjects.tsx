"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import DotLoader from "../../components/Loader/loader";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import {
  Image as IMage,
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Card,
  Grid,
  Group,
  Select,
  Text,
  TextInput,
  Title,
  em,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
  Pill,
  Skeleton,
} from "@mantine/core";
import cx from "clsx";
import classes from "../../public/Demo.module.css";
import "../../public/CarouselCard.module.css";
import {
  IconArrowLeft,
  IconArrowRight,
  IconMoon,
  IconSearch,
  IconStar,
  IconSun,
} from "@tabler/icons-react";
import Link from "next/link";
import { useDisclosure, useIntersection, useMediaQuery } from "@mantine/hooks";
import { FooterLinks } from "../../components/footer/footer";
let limit = 6;
let skip = 0;
let count = 0;
let PROJECTS : any = [];
let initialDataLoad = true;
const fetcher = async (
  query: string,
  filter: string,
  limit: number,
  skip: number
) => {
  const Count = await fetch(
    `/api/count/projects?query=${query}&filter=${filter}`
  );
  const countData = await Count.json();
  count = countData.count;
  console.log(count);
  if (query == "") {
    const data = await fetch(`api/projects?limit=${limit}&skip=${skip}`);
    const res = await data.json();
    if (PROJECTS.length == 1) {
      PROJECTS = [...res];
    } else {
      PROJECTS = [...PROJECTS, ...res];
    }
    initialDataLoad = false;
  } else {
    const data = await fetch(
      `api/projects?query=${query}&filter=${filter}&limit=${limit}&skip=${skip}`
    );
    const res = await data.json();
    if (count != 0) {
      if ((PROJECTS.length == 1 || skip == 0) && skip < count) {
        PROJECTS = [...res];
      } else {
        PROJECTS = [...PROJECTS, ...res];
      }
      initialDataLoad = false;
    } else {
      PROJECTS = [];
    }
  }
};
fetcher("", "", limit, skip);
export default function ShowAllProjects() {
  const [fetching , setFetching] = useState(false);
  const [initialLoading , setInitialLoading] = useState(true)
  const [loading, setLoading] = useState(true);
  const [loadingProject, setLoadingProject] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });
  const [opened, { toggle }] = useDisclosure();
  const [filter, setFilter] = useState({
    searchBy: "Any",
  });
  const [value, setValue] = useState<string | null>("");

  const [mydata, setmyData] = useState([
    {
      title: "",
      content: "",
      Mentor: "",
      new: false,
      status: "",
      _id: "",
      images: [""],
      technologiesUsed: [""],
    },
  ]);
  const [status, setStatus] = useState("0");

  useEffect(() => {
    async function ASYNC(){
      console.log("1st useEffect");
    if (
      (entry?.isIntersecting && count > skip && !fetching) ||
      (entry?.isIntersecting && count == 0 && !fetching)
    ) {
      setFetching(true)
      console.log("intersecting");
      fetcher(query, filter.searchBy, limit, skip + limit)
        .then(() => {
          skip = skip + limit;
        })
        .then(() => {
          setmyData(PROJECTS);
          setLoadingProject(false);
          setInitialLoading(false);
          setFetching(false)
        });
    }
    }
    
      ASYNC();
      
    
    setLoading(false);
  }, [entry?.isIntersecting , initialDataLoad]);
  const fetchdata = useCallback(async () => {
    setmyData(PROJECTS);
    setLoadingProject(false);
  }, []);

  useEffect(() => {
    console.log("useEffect called");
    fetchdata().catch(console.error);
  }, []);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const isMobile = useMediaQuery(`(max-width: ${em(500)})`);
  const isTab = useMediaQuery(`(max-width: ${em(1000)})`);
  const [query, setQuery] = useState("");
  const data = mydata;
  let counter = 1;
  if (!loading) {
    var cards = data?.map((card, i) =>
      card.status == status || status == "0" ? (
        <Grid.Col span={isMobile ? 12 : isTab ? 6 : 4} key={counter++}>
          <Card
            //ref={i === data.length - 1 ? ref : null}
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
                {card?.images?.map((image) => (
                  <Carousel.Slide key={image}>
                    <IMage src={image} height={220} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Card.Section>

            <Group justify="space-between" mt="lg">
              <Text fw={500} fz="lg">
                {card.title}
              </Text>

              <Group gap={5}>
                <IconStar style={{ width: rem(16), height: rem(16) }} />
                <Text fz="xs" fw={500}>
                  4.78
                </Text>
              </Group>
            </Group>

            <Text fz="sm" c="dimmed" mt="sm">
              {card?.technologiesUsed?.map((tech) => (
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
                  window.open(`/project/${card._id}`);
                }}
              >
                View Project
              </Button>
            </Group>
          </Card>
        </Grid.Col>
      ) : (
        <></>
      )
    );

    return (
      <>
        <AppShell
          header={{ height: { base: 60, md: 70, lg: 80 } }}
          navbar={{
            width: { base: 200, md: 300, lg: 400 },
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md" w="100%" justify="space-between">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              {/* <MantineLogo size={30} /> */}
              <Group>
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={50}
                  height={50}
                ></Image>
                <Text
                  size={isMobile ? "md" : "xl"}
                  fw={"bolder"}
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  Project Catalog
                </Text>
              </Group>
              {!isMobile && (
                <ActionIcon
                  onClick={() =>
                    setColorScheme(
                      computedColorScheme === "light" ? "dark" : "light"
                    )
                  }
                  variant="default"
                  size="xl"
                  aria-label="Toggle color scheme"
                >
                  <IconSun
                    className={cx(classes.icon, classes.light)}
                    stroke={1.5}
                  />
                  <IconMoon
                    className={cx(classes.icon, classes.dark)}
                    stroke={1.5}
                  />
                </ActionIcon>
              )}
              {isMobile && <Text></Text>}
            </Group>
          </AppShell.Header>

          <AppShell.Navbar p="md">
            <form>
              <Text m={"lg"} size="lg" className={classes.title}>
                {" "}
                Add Filters :{" "}
              </Text>
              <Card m={"md"} withBorder shadow="lg">
                <Select
                  m={"lg"}
                  size="md"
                  label="search projects by : "
                  placeholder="Pick value"
                  comboboxProps={{
                    transitionProps: { transition: "pop", duration: 200 },
                    shadow: "md",
                  }}
                  data={["Any", "Title", "Mentor", "Member Name", "Member Id"]}
                  defaultValue="Any"
                  value={filter.searchBy}
                  onChange={(e) => {
                    setFilter({ searchBy: e || "" });
                    if(query.trim() != ""){
                      setLoadingProject(true);
                    fetcher(query, e || "Any", limit, 0).then(() => {
                      skip = 0;
                      fetchdata();
                      setLoadingProject(false);
                    });
                    }
                    
                  }}
                />
              </Card>
              <Card m={"md"} withBorder shadow="lg">
                <Select
                  size="md"
                  m={"lg"}
                  label="Status"
                  placeholder="Pick value"
                  comboboxProps={{
                    transitionProps: { transition: "pop", duration: 200 },
                    shadow: "md",
                  }}
                  data={["Completed", "pending"]}
                  value={status}
                  onChange={(event) => {
                    setStatus(event || "0");
                  }}
                />
              </Card>
            </form>
          </AppShell.Navbar>
          <AppShell.Main>
            <Group justify="space-around">
              <Title
                m={"lg"}
                className={classes.title1}
                order={2}
                style={{ fontSize: isMobile ? rem(30) : rem(45) }}
              >
                {" "}
                Explore Projects{" "}
              </Title>
            </Group>

            <Group justify="space-evenly" m={"xl"}>
              <form
                style={{ alignContent: "center" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  if(query.trim() != ""){
                    setLoadingProject(true);
                  fetcher(query, filter.searchBy, limit, 0).then(() => {
                    skip = 0;
                    fetchdata();
                    setLoadingProject(false);
                  });
                  }
                  
                }}
              >
                <TextInput
                  m={"lg"}
                  radius="xl"
                  size="xl"
                  w={"90%"}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  pointer={false}
                  placeholder="Search"
                  leftSection={
                    <IconSearch
                      style={{ width: rem(20), height: rem(20) }}
                      stroke={1.5}
                    />
                  }
                  rightSection={
                    <ActionIcon
                      size={40}
                      radius="xl"
                      color={"black"}
                      variant="filled"
                    >
                      <IconArrowRight
                        style={{ width: rem(20), height: rem(20) }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  }
                />
              </form>
            </Group>
            {(loadingProject || initialLoading) && <DotLoader />}

            {
              
              <Grid m={"lg"}>
                {cards.length > 0 ? cards : <></>}
              </Grid>
              
            }
            {((entry?.isIntersecting && count > skip))  && <DotLoader />}
            <Group justify="center">
              {(skip + limit >= count && count != 0) && <Text>No more data to load</Text>}
            </Group>
            <Group justify="center">
              <Skeleton ref={ref} ></Skeleton>
            </Group>
            <Group justify="center">
              {
                (query!="" && count == 0) && <Text >No projects found</Text>
              }
            </Group>
          </AppShell.Main>
        </AppShell>
        
        <FooterLinks />
      </>
    );
  } else {
    return <DotLoader />;
  }
}
