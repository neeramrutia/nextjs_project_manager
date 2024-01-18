import { Button, Card, Group, Select, TextInput } from "@mantine/core";
import { useState  , useContext, ChangeEvent} from "react";
import { mainObject } from "./addProject";
const step1Object = {
  title: "",
  status: "",
  ProjectType: "",
}



 export function AddProjectStep1(){
  const [value , setValue] = useState("pending");
    const [Project , setProject] = useState({
        title: mainObject.title,
        status: mainObject.status,
        ProjectType: mainObject.ProjectType,
        ProjectLink: mainObject.ProjectLink,
        Mentor: mainObject.Mentor,
        content: mainObject.content,
    })
    const onSave = ()=>{
      step1Object.title = Project.title;
      mainObject.title = Project.title;
      step1Object.status = Project.status;
      mainObject.status = Project.status;
      step1Object.ProjectType = Project.ProjectType;
      mainObject.ProjectType = Project.ProjectType;
    }
    return(
        <>
        <Group justify="space-around" m={"xl"}>
        <Card
          
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          mt={"15%"}
          
        >
          <form
            onSubmit={(e)=>{e.preventDefault()}
            }
          >
            <TextInput
              m={"sm"}
              withAsterisk
              label="Title"
              placeholder="Your name"
              required
              value={Project.title}
              onChange={(e)=>{setProject({...Project , title : e.target.value})}}
            />
            <Select
            m={"sm"}
            label="Status"
            placeholder="Pick value"
            data={['pending', 'Completed']}
            required
            value={Project.status}
            onChange={(event)=>{setProject({...Project , status:event || 'pending'})}}
          />
            {/* <TextInput
              m={"sm"}
              withAsterisk
              label="Status"
              placeholder="Project Status"
              required
              value={Project.status}
              onChange={(e)=>{setProject({...Project,status:e.target.value})}}
            /> */}
            <TextInput
              m={"sm"}
              withAsterisk
              label="Project Type"
              placeholder="Project Type"
              required
              value={Project.ProjectType}
              onChange={(e)=>{setProject({...Project , ProjectType : e.target.value})}}
            />
            <Button color="teal" fullWidth mt={"lg"} type="submit" onClick={onSave}>Save</Button>
          </form>
        </Card>
        </Group>
      </>
    )
}

export {step1Object}