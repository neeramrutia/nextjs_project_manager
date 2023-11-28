import { Button, Group, Stepper } from "@mantine/core";
import { AddProjectStep1, step1Object } from "./addProjectStep1";
import { AddProjectStep2, step2Object } from "./addProjectStep2";
import { AddProjectStep3, step3Object } from "./addProjectStep3";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import LoadingState from "./States/LoadingState"; 
import SuccessState from "./States/SuccessState";
import ErrorState from "./States/ErrorState"; 
export default function AddProject() {
  console.log(step1Object);
  console.log(step2Object);
  console.log(step3Object);
  const [success , setSuccess] = useState(0);
  const { data: session } = useSession();
  const [Project, setProject] = useState({
    title: "",
    status: "",
    ProjectType: "",
    ProjectLink: "",
    Mentor: "none",
    content: "",
    userId:session?.user.id
  });
  const resetProject = ()=>{
    Project.Mentor='';
    Project.title='';
    Project.ProjectLink='';
    Project.ProjectType='';
    Project.content='';
    Project.status='';
  }
  const RegisterProject = async()=>{
    const res = await fetch('api/projects',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Project),
    })
    console.log(res);
    if(res.status == 201)
    {
      setSuccess(1);
    }
    else{
      setSuccess(-1);
    }
    resetProject();
    
  }
  console.log(Project);
  const saveProject = () => {
    Project.title = step1Object.title;
    Project.status = step1Object.status;
    Project.ProjectType = step1Object.ProjectType;
    Project.content = step2Object.content;
    Project.Mentor = step3Object.Mentor;
    Project.ProjectLink = step3Object.ProjectLink;
  };
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper color="teal" active={active} onStepClick={setActive}>
        <Stepper.Step
          label="First step"
          description="Add basic Info"
        ></Stepper.Step>
        <Stepper.Step
          label="Second step"
          description="Add Markdown file"
        ></Stepper.Step>
        <Stepper.Step
          label="Final step"
          description="Add mentor details"
        ></Stepper.Step>
        <Stepper.Completed>
          {active == 3 && success == 0 && 'Creating Project...'}
          Creating Project...
          
          </Stepper.Completed>
      </Stepper>

      {active == 0 && <AddProjectStep1 />}
      {active == 1 && <AddProjectStep2 />}
      {active == 2 && <AddProjectStep3 />}
      {active == 3 && success == 0 && <LoadingState />}
      {active == 3 && success == 1 && <SuccessState />}
      {active == 3 && success == -1 && <ErrorState />} 
      {
        (active == 1 || active == 0 || active == 2) && (
      
      <Group justify="center" mt="xl">
        <Button
          variant="default"
          onClick={() => {
            prevStep();
            saveProject();
          }}
        >
          Back
        </Button>
        {
          active!=2 && (<Button
            onClick={() => {
              nextStep();
              saveProject();
            }}
            color="cyan"
          >
            Next step
          </Button>)
        }
        
      </Group>

        )}

        {
          active == 2 && (
            <Group justify="center" mt="xl">
            <Button
              variant="default"
              onClick={() => {
                saveProject();
                RegisterProject();
                nextStep();
              }}
            >
              Add Project
            </Button>
          </Group>
          )
        }
    </>
  );
}


