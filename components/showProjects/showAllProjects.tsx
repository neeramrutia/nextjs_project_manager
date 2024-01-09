import { useCallback, useEffect, useState } from "react";
import DotLoader from "../Loader/loader";
import { Spotlight, spotlight } from "@mantine/spotlight";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Loader,
  MultiSelect,
  Select,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { theme } from "../../theme";
interface project {
  title: String;
  content: String;
  status: String;
  userId: String;
  new: Boolean;
  _id: String;
  addedDate: String;
  ProjectType: String;
  ProjectLink: String;
  __v: Number;
}
export default function ShowAllProjects() {
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
  const fetchData = useCallback(async () => {
    const data = await fetch("api/projects");
    const res = await data.json();
    setmyData(res);
    console.log(res);
    console.log(mydata);
  }, []);
  useEffect(() => {
    fetchData().catch(console.error);
    setLoading(false);
  }, [fetchData]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const data = mydata;
  let counter = 1;
  if (!loading) {
    var items = data
      .filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase().trim())
      )
      .map((item) => (
        <Link
        key={counter++}
          href={`/project/${item._id}`}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <Spotlight.Action
            highlightColor="green"
            key={counter++}
            onClick={() => {
              console.log(item);
            }}
          >
            <Group wrap="nowrap" w="100%">
              <div style={{ flex: 1 }}>
                <Text>{item.title}</Text>

                {item.Mentor && (
                  <Text opacity={0.6} size="xs">
                    Mentor : {item.Mentor}
                  </Text>
                )}
              </div>

              {item.new && <Badge variant="default">new</Badge>}
            </Group>
          </Spotlight.Action>
        </Link>
      ));

    var cards = data.reverse().map((card) => (
      (card.status == status ) ? 
      <Grid.Col span={4} key={counter++}>
        <Card shadow="sm" padding="lg" radius="md" withBorder className="">
          <Card.Section></Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{card.title}</Text>
            <Badge color="pink" variant="light">
              On Sale
            </Badge>
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
      <TextInput
      radius="xl"
      size="md"
      onClick={spotlight.open}
      onChange={spotlight.open}
      pointer = {false}
      placeholder="Search questions"
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }
      
    />

        <Spotlight.Root
          m={"lg"}
          scrollable
          query={query}
          onQueryChange={setQuery}
        >
          <Spotlight.Search
            placeholder="Search..."
            leftSection={<IconSearch stroke={1.5} />}
          />
          <Spotlight.ActionsList>
            {items.length > 0 ? (
              items
            ) : (
              <Spotlight.Empty>Nothing found...</Spotlight.Empty>
            )}
          </Spotlight.ActionsList>
        </Spotlight.Root>
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
        <Grid m={"lg"}>
          {cards.length > 0 ? cards.reverse() : "Nothing found..."}
        </Grid>
      </>
    );
  }
  else{
    return(
      <DotLoader/>
    );
  }
}
