import { Button, Card, TextInput } from "@mantine/core";
import { useState } from "react";
const step3Object = {
  ProjectLink: "",
  Mentor: "",
  members : []
};
export function AddProjectStep3() {
  const [Project, setProject] = useState({
    ProjectLink: "",
    Mentor: "",
  });

  const onSave = () => {
    step3Object.Mentor = Project.Mentor;
    step3Object.ProjectLink = Project.ProjectLink;
  };

  return (
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
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextInput
            m={"sm"}
            withAsterisk
            label="Project Link"
            placeholder="Your Project Link"
            required
            value={Project.ProjectLink}
            onChange={(e) => {
              setProject({ ...Project, ProjectLink: e.target.value });
            }}
          />
          <TextInput
            m={"sm"}
            withAsterisk
            label="Mentor"
            placeholder="Your Project Mentor"
            required
            value={Project.Mentor}
            onChange={(e) => {
              setProject({ ...Project, Mentor: e.target.value });
            }}
          />
          <Button
            color="teal"
            fullWidth
            mt={"lg"}
            type="submit"
            onClick={onSave}
          >
            Save
          </Button>
        </form>
      </Card>
    </>
  );
}
export { step3Object };
