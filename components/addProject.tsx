import {
  Button,
  Card,
  Group,
  Stepper,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
export default function AddProject() {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const [Project , setProject] = useState({
        title: "",
        status: "",
        ProjectType: "",
        ProjectLink: "",
        Mentor: "none",
        content: "",
  })
  return (
    <>
      <Stepper color="teal" active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Add basic Info">
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Add Markdown file">
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Add mentor details">
        </Stepper.Step>
        <Stepper.Completed>
          Creating Project...
        </Stepper.Completed>
      </Stepper>

      {active == 0 && (
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
              <TextInput
                m={"sm"}
                withAsterisk
                label="Status"
                placeholder="Project Status"
                required
                value={Project.status}
                onChange={(e)=>{setProject({...Project,status:e.target.value})}}
              />
              <TextInput
                m={"sm"}
                withAsterisk
                label="Project Type"
                placeholder="Project Type"
                required
                value={Project.ProjectType}
                onChange={(e)=>{setProject({...Project , ProjectType : e.target.value})}}
              />
              {/* <Button color="teal" fullWidth mt={"lg"} type="submit" >Save</Button> */}
            </form>
          </Card>
        </>
      )}
      {
        active == 1 && (
            <h1>step 2</h1>
        )
      }
      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} color="cyan">Next step</Button>
      </Group>
    </>
  );
}
