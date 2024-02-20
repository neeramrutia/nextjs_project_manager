"use client"
import { useCallback, useEffect, useState } from "react";
import DotLoader from "../../components/Loader/loader";
import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Group,
  Select,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
export default function ShowAllProjects() {
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
    },
  ]);
  const [status , setStatus] = useState('0');
  const fetchData = useCallback(async (query : string) => {
    if(query == ""){
      console.log(query)
      const data = await fetch("api/projects");
      const res = await data.json();
      setLoadingProject(false);
      setmyData(res);
    }else{
      console.log("query : " , query)
      setLoadingProject(true);
      const data = await fetch(`api/projects?query=${query}`);
      const res = await data.json();
      setLoadingProject(false)
      setmyData(res);
    }
    
  }, []);
  useEffect(() => {
    fetchData("").catch(console.error);
    setLoading(false);
  }, []);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingProject , setLoadingProject] = useState(true);
  const data = mydata;
  let counter = 1;
  if (!loading) {
    var cards = data.map((card) => (
      (card.status == status || status == "0") ? 
      <Grid.Col span={3} key={counter++}>
        <Card shadow="sm" padding="lg" radius="md" withBorder className="">
          <Card.Section></Card.Section>

          <Group justify="center" mt="md" mb="xs">
            <Text fw={500}>{card.title}</Text>
          </Group>

          <Text size="sm" c="dimmed">
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </Text>

          <Button onClick={()=>{window.open(`/project/${card._id}`) , '_blank'}} variant="light" color="blue" fullWidth mt="md" radius="md">
            <Link
              href={`/project/${card._id}`}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              Project Details
            </Link>
          </Button>
        </Card>
      </Grid.Col> : <></>
    ));

    return (
      <>
      <Grid align="center">
        <Grid.Col pt={"5%"} span={4} offset={4}>
          <form onSubmit={(e)=>{e.preventDefault();  fetchData(query);}}>
            <TextInput
              m={"lg"}
              radius="xl"
              size="md"
              onChange={(e)=>{setQuery(e.target.value);}}
              pointer = {false}
              placeholder="Search by title or Mentor name"
              rightSectionWidth={42}
              leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
              rightSection={
                <ActionIcon size={32} radius="xl" color={"black"} variant="filled">
                  <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                </ActionIcon>
              } 
            />
          </form>
        </Grid.Col>
        <Grid.Col offset={5} span={2}>
          <form >
          <Select
            label="search projects by : "
            placeholder="Pick value"
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, shadow: 'md' }}
            data={['Any', 'Title', 'Mentor', 'Member Name' , 'Member Id']}
            defaultValue="Any"
            value={value}
            onChange={setValue}
          />
          </form>
        </Grid.Col>
      </Grid>
        <Grid>
          <Grid.Col offset={4} span={4}>
          <Select
            m={"lg"}
            label="Status"
            searchable
            placeholder="Pick value"
            data={['Completed', 'pending']}
            value={status}
            onChange={(event)=>{setStatus(event || "0")}}
          />
          </Grid.Col>
        </Grid>
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
      </>
    );
  }
  else{
    return(
      <DotLoader/>
    );
  }
}
