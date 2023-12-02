import { Button, Card, Select, TextInput } from "@mantine/core";
import { useState  , useContext, ChangeEvent} from "react";
const step1Object = {
  title: "",
  status: "",
  ProjectType: "",
}



 export function AddProjectStep1(){
  const [value , setValue] = useState("pending");
    const [Project , setProject] = useState({
        title: "",
        status: "pending",
        ProjectType: "",
        ProjectLink: "",
        Mentor: "none",
        content: "",
    })
    const onSave = ()=>{
      step1Object.title = Project.title;
      step1Object.status = Project.status;
      step1Object.ProjectType = Project.ProjectType;
    }
    return(
        <>
        <Card
          
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          w="28%"
          mt="10%"
          ml="35%"
        >
          <form
            onSubmit={(e)=>{console.log(Project);e.preventDefault()}
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
            label="Your favorite library"
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
      </>
    )
}

export {step1Object}