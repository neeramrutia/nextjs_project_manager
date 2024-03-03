"use client"
import { useCallback, useEffect, useState } from "react";
import DotLoader from "../../components/Loader/loader";
import Image from "next/image";
import { Carousel } from '@mantine/carousel';
import {
  Image as IMage ,
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
} from "@mantine/core";
import cx from "clsx";
import classes from "../../public/Demo.module.css";
import "../../public/CarouselCard.module.css" 
import { IconArrowLeft, IconArrowRight, IconMoon, IconSearch, IconStar, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
export default function ShowAllProjects() {
  const [opened, { toggle }] = useDisclosure();
  const [filter, setFilter] = useState({
    searchBy : "Any"
  });
  const [value, setValue] = useState<string | null>('');
  
  const [mydata, setmyData] = useState([
    {
      title: "",
      content: "",
      Mentor: "",
      new: false,
      status:"",
      _id: "",
      images : [""]
    },
  ]);
  const [status , setStatus] = useState('0');
  const fetchData = useCallback(async (query : string , filter : string) => {
    if(query == ""){
      // console.log(query)
      const data = await fetch("api/projects");
      const res = await data.json();
      setLoadingProject(false);
      setmyData(res);
    }else{
      // console.log("query : " , query)
      setLoadingProject(true);
      const data = await fetch(`api/projects?query=${query}&filter=${filter}`);
      const res = await data.json();
      setLoadingProject(false)
      setmyData(res);
    }  
  }, []);
  useEffect(() => {
    fetchData("" , filter.searchBy).catch(console.error);
    setLoading(false);
  }, []);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const isMobile = useMediaQuery(`(max-width: ${em(500)})`);
  const isTab = useMediaQuery(`(max-width: ${em(1000)})`);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingProject , setLoadingProject] = useState(true);
  const data = mydata;
  let counter = 1;
  if (!loading) {
    var cards = data.map((card) => (
      (card.status == status || status == "0") ? 
      <Grid.Col span={isMobile ? 12 : isTab ? 6 : 4} key={counter++}>
        <Card radius="md" withBorder padding="xl">
      <Card.Section>
        <Carousel
        styles={{control:{backgroundColor:"black"}}}
          withIndicators
          nextControlIcon={<IconArrowRight color="white" style={{ width: rem(16), height: rem(16) }} />}
          previousControlIcon={<IconArrowLeft color="white" style={{ width: rem(16), height: rem(16) }} />}
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {
            card.images.map((image) => (
              <Carousel.Slide key={image}>
                <IMage src={image} height={220} />
              </Carousel.Slide>
            ))
          }
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
        Relax, rejuvenate and unplug in this unique contemporary Birdbox. Feel close to nature in
        ultimate comfort. Enjoy the view of the epic mountain range of Blegja and the Førdefjord.
      </Text>

      <Group justify="space-between" mt="md">
        <div>
          <Text fz="xl" span fw={500} className={classes.price}>
            397$
          </Text>
          <Text span fz="sm" c="dimmed">
            {' '}
            / night
          </Text>
        </div>

        <Button radius="md" onClick={()=>{window.open(`/project/${card._id}`)}}>View Project</Button>
      </Group>
    </Card>
      </Grid.Col> : <></>
    ));
    
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
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        {/* <MantineLogo size={30} /> */}
        <Group>
        <Image src="/logo.png" alt="logo" width={50} height={50}></Image>
        <Text
          size={isMobile ? "md": "xl"}
          fw={"bolder"}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Project Catalog
        </Text>
        </Group>
          {
            !isMobile && (
              <ActionIcon
          onClick={() =>
            setColorScheme(computedColorScheme === "light" ? "dark" : "light")
          }
          variant="default"
          size="xl"
          aria-label="Toggle color scheme"
        >
          <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
          <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
        </ActionIcon>
            )
          }
          {
            isMobile && (
              <Text></Text>
            )
          }
        
        
        
      </Group>
      
    </AppShell.Header>
   
      <AppShell.Navbar p="md">
      <form >
        <Text m={"lg"} size="lg" className={classes.title}> Add Filters : </Text>
        <Card m={"md"} withBorder shadow="lg">
          <Select
            m={"lg"}
            size="md"
            label="search projects by : "
            placeholder="Pick value"
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, shadow: 'md' }}
            data={['Any', 'Title', 'Mentor', 'Member Name' , 'Member Id']}
            defaultValue="Any"
            value={filter.searchBy}
            onChange={(e)=>{setFilter({searchBy:e || ""}); fetchData(query , e || "Any")}}
          />
          </Card>
          <Card m={"md"} withBorder shadow="lg">
          <Select
            size="md"
            m={"lg"}
            label="Status"
            placeholder="Pick value"
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, shadow: 'md' }}
            data={['Completed', 'pending']}
            value={status}
            onChange={(event)=>{setStatus(event || "0")}}
          />
          </Card>
          </form>
      </AppShell.Navbar>
      <AppShell.Main>
        <Group justify="space-around">
        <Title m={"lg"} className={classes.title1} order={2} style={{fontSize : isMobile ? rem(30) : rem(45)}}> Explore Projects </Title>
        </Group>
      
          <Group justify="space-evenly" m={"xl"}>
          
          <form style={{alignContent : "center"}} onSubmit={(e)=>{e.preventDefault();  fetchData(query , filter.searchBy);}}>
            <TextInput
              m={"lg"}
              radius="xl"
              size="xl"
              w={"90%"}
              onChange={(e)=>{setQuery(e.target.value);}}
              pointer = {false}
              placeholder="Search"
              
              leftSection={<IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
              rightSection={
                <ActionIcon  size={40}  radius="xl" color={"black"} variant="filled">
                  <IconArrowRight style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                </ActionIcon>
              } 
            />
          </form>
          </Group>
        {
          loadingProject && (
            <DotLoader/>
          )
        }
        {
          !loadingProject && (
            <Grid m={"lg"}>
            {cards.length > 0 ? cards : "Nothing found..."}
            </Grid>
          )
        }
      </AppShell.Main>
    </AppShell>
      </>
    );
  }
  else{
    return(
      <DotLoader/>
    );
  }
}
