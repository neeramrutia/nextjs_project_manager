"use client";
// import Error from "next/error"
import ErrorPage from "../../404"
import DotLoader from "../../../components/Loader/loader"
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Fieldset,
  Grid,
  Group,
  Text,
  Loader,
  rem,
  em,
  Tooltip
} from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import { IconTrash } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { IconLink , IconReport , IconVideo } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
// import SyntaxHighlighter from "react-syntax-highlighter";
import Markdown from "react-markdown";
import "../../../public/styleForAddProjectStep2.css";
// import SyntaxHighlighter from "react-syntax-highlighter";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
export default function specificProject() {
  const { data : session } = useSession();
  const [loading, setLoading] = useState(true);
  const [projectExist, setProjectExist] = useState(true);
  const pathname = usePathname();
  const projectId = pathname.split("/")[2];
  const [mydata, setmyData] = useState({
    title: "",
    Mentor: "",
    content: "",
    status: "",
    ProjectType: "",
    ProjectLink: "",
    members : [{}],
    DrivePdfId : "",
    DriveVideoId : ""
  });
  const isMobile = useMediaQuery(`(max-width: ${em(900)})`);
  const mem = mydata?.members.map((m)=>{
    if(m.name)
    return(
      <>
      <Group key={m.id || "1"}  justify="space-around">
      <Text >name : {m.name}</Text>
      <Text>id : {m.id}</Text>
      </Group>
      </>
    )
  })
  const deleteProject = useCallback(async()=>{
    const res = await fetch(`/api/projects/${projectId}`,{
      method: "DELETE",
    });
    const data = await res.json();
    if(res.status == 200){
      console.log("project deleted");
    }
  })
  const fetchData = useCallback(async () => {
    const res = await fetch(`/api/projects/${projectId}`);
    const data = await res.json();
    // console.log(res)
    if(data == null || res.status == 500){
      console.log("NO DATA FOUND");
      setProjectExist(false);
    }else{
      // console.log(data);
      setmyData(data);
      setLoading(false);
      // console.log(mydata);
    }
    
  }, []);
  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  if(!projectExist){
    return (
       <ErrorPage title="Project not Found" des="This project is either deleted or doesn't exist" statuscode={404} />
    )
  }
  if (loading) {
    return (
      <DotLoader/>
    );
  } else {
    return (
      <>
        <Grid >
          <Grid.Col span={isMobile? 12:6 }>
            <Card
              m={"xl"}
              h={"100%"}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Card.Section></Card.Section>

              <Group justify="space-around" mt="md" mb="xs">
                <Text size="xl" fw={700}>
                  {mydata?.title}
                </Text>
              </Group>
              <Fieldset m={"lg"} legend="Team Details">
                <Text size="lg" c="dimmed">
                  Mentor: {mydata?.Mentor}
                </Text>
                <Text size="lg" c="dimmed">
                  Team Members: {mem}
                </Text>
              </Fieldset>

              <Fieldset m={"lg"} legend="Project Details">
                <Text size="lg" c="dimmed">
                  Status: {mydata?.status}
                </Text>
                <Text size="lg" c="dimmed">
                  Project Type: {mydata?.ProjectType}
                </Text>
              </Fieldset>
              <Group justify="space-around">
              <Tooltip label={"Project Link"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
                <ActionIcon
                  component="a"
                  href={mydata?.ProjectLink}
                  size="xl"
                  aria-label="Open in a new tab"
                  color="black"
                  m={"lg"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.location.href = mydata?.ProjectLink
                    // window.open(mydata?.ProjectLink);
                  }}
                >
                  <IconLink />
                </ActionIcon>
                </Tooltip>
                <Tooltip label={"Report"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
                <ActionIcon
                  component="a"
                  size="xl"
                  aria-label="Open in a new tab"
                  color="black"
                  m={"lg"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.location.href = `https://drive.google.com/file/d/${mydata.DrivePdfId}/view?usp=drive_link`
                    // window.open(`https://drive.google.com/file/d/${mydata.DrivePdfId}/view?usp=drive_link`);
                  }}
                >
                  <IconReport />
                </ActionIcon>
                </Tooltip>
                <Tooltip label={"Video Description"} transitionProps={{ transition: 'skew-up', duration: 300 }}>
                <ActionIcon
                  component="a"
                  size="xl"
                  aria-label="Open in a new tab"
                  color="black"
                  m={"lg"}
                  onClick={(event) => {
                    event.preventDefault();
                    window.location.href = `https://drive.google.com/file/d/${mydata.DriveVideoId}/view`
                  }}
                >
                  <IconVideo />
                </ActionIcon>
                </Tooltip>
              </Group>
            </Card>
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 6}>
            <Card
              h={"100%"}
              m={"xl"}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Card.Section></Card.Section>
              <Markdown
                className="markdown1"
                children={mydata?.content}
                components={{
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        showLineNumbers
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        style={materialDark}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </Card>
          </Grid.Col>
          
        </Grid>
        {
          (session?.user?.isAdmin || session?.user?.isCoordinator) && (
        <Grid>
          <Grid.Col span={4} offset={4} >
            <Group justify="space-around">
          <Button
          m={"xl"}
           leftSection={<IconTrash style={{ width: rem(15), height: rem(15) }} />} 
           color="red"
           onClick={() => {deleteProject(); location.reload();}}
           >Delete</Button>
          </Group>
          </Grid.Col>
        </Grid>
          )
        }
        {
          JSON.stringify(mydata.DriveVideoId)
        }
      </>
    );
  }
}
