import { Button, Group, Stepper } from "@mantine/core";
import { AddProjectStep1, step1Object } from "./addProjectStep1";
import { AddProjectStep2, step2Object } from "./addProjectStep2";
import { AddProjectStep3, step3Object } from "./addProjectStep3";
import React, { useState } from "react";
export default function AddProject() {
  console.log(step1Object);
  console.log(step2Object);
  console.log(step3Object);
  const [Project, setProject] = useState({
    title: "",
    status: "",
    ProjectType: "",
    ProjectLink: "",
    Mentor: "none",
    content: "",
  });
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
        <Stepper.Completed>Creating Project...</Stepper.Completed>
      </Stepper>

      {active == 0 && <AddProjectStep1 />}
      {active == 1 && <AddProjectStep2 />}
      {active == 2 && <AddProjectStep3 />}
      {/* {active == 3 && <AddProjectStep4 />} */}
      {
        (active == 1 || active == 0  || active == 2) && (
      
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
        <Button
          onClick={() => {
            nextStep();
            saveProject();
          }}
          color="cyan"
        >
          Next step
        </Button>
      </Group>

        )}
    </>
  );
}
