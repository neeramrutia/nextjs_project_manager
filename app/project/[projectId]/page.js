'use client'
import { ActionIcon, Badge, Button, Card, Fieldset, Grid, Group ,Text} from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
// import SyntaxHighlighter from "react-syntax-highlighter";
import Markdown from "react-markdown";
import '../../../public/styleForAddProjectStep2.css'
// import SyntaxHighlighter from "react-syntax-highlighter";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
export default function specificProject(){

    const pathname = usePathname();
    const projectId = pathname.split('/')[2];
    const [mydata , setmyData] = useState({
      title:"",
      Mentor:"",
      content:"",
      status:"",
      ProjectType:"",
      ProjectLink:""
    });
    const fetchData = useCallback(async () => {
        
        const res = await fetch(`/api/projects/${projectId}`);
        const data = await res.json();
        console.log(data);
        setmyData(data);
        console.log(mydata);
      }, [])
      useEffect(() => {
        fetchData()
          .catch(console.error);
      }, [fetchData])


    
    return(
        <>
        <Grid h={"100%"} >
          <Grid.Col span={6}>
    <Card m={"xl"} h={"100%"}  shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        
      </Card.Section>

      <Group justify="space-around" mt="md" mb="xs">
        <Text size="xl" fw={700}>{mydata.title}</Text>

      </Group>
      <Fieldset m={"lg"} legend="Team Details">
      <Text size="lg" c="dimmed" >
        Mentor: {mydata.Mentor}
      </Text>
      <Text size="lg" c="dimmed" >
        Team Members: {mydata.Mentor}
      </Text>
      </Fieldset>
      
      
      <Fieldset m={"lg"} legend="Project Details">
      <Text size="lg" c="dimmed">
        Status: {mydata.status}
      </Text>
      <Text size="lg" c="dimmed">
        Project Type: {mydata.ProjectType}
      </Text>
      </Fieldset>
      <Group justify="space-around">
      <ActionIcon
      component="a"
      href={mydata.ProjectLink}
      size="xl"
      aria-label="Open in a new tab"
      color="cyan"
      m={"lg"}
      onClick={(event) => event.preventDefault()}
    >
      <IconExternalLink />
    </ActionIcon>
    </Group>
      
      
      
    </Card>
    </Grid.Col>
    <Grid.Col span={6}>
    <Card h={"100%"} m={"xl"} shadow="sm" padding="lg" radius="md" withBorder>
      
      <Card.Section>
        
      </Card.Section>
      <Markdown
        className="markdown1"
        children={mydata.content}
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
        </>
    )
}