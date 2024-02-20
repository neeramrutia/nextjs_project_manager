import {
  Button,
  Card,
  Grid,
  Group,
  ScrollArea,
  Table,
  TextInput,
} from "@mantine/core";
import cx from "clsx";
import classes from "../../public/TableScrollArea.module.css";
import { useEffect, useState } from "react";
import { mainObject } from "./addProject";
const step3Object = {
  ProjectLink: "",
  Mentor: "",
  members: [{name : "" , id : ""}],
};
export function AddProjectStep3() {
  const [data, setData] = useState(mainObject.members);
  const [scrolled, setScrolled] = useState(false);
  const [student, setStudent] = useState({
    name: "",
    id: "",
  });
  const [Project, setProject] = useState({
    ProjectLink: mainObject.ProjectLink,
    Mentor: mainObject.Mentor,
  });
  let rows = data.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.id}</Table.Td>
    </Table.Tr>
  ));
  const addStudent = () => {
    const studs = [
      ...data,
      {
        name: student.name,
        id: student.id,
      },
    ];
    setData(studs);
    
  };
  const onSave = () => {
    step3Object.Mentor = Project.Mentor;
    mainObject.Mentor = Project.Mentor;
    step3Object.ProjectLink = Project.ProjectLink;
    mainObject.ProjectLink = Project.ProjectLink;
    step3Object.members = data;
    mainObject.members = data;
  };

  return (
    <>
    <Group justify="space-around">
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        mt="7%"
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
          {
            <ScrollArea
              h={200}
              onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
            >
              <Table miw={400}>
                <Table.Thead
                  className={cx(classes.header, {
                    [classes.scrolled]: scrolled,
                  })}
                >
                  <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Student ID</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </ScrollArea>
          }
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                m={"sm"}
                withAsterisk
                label="Name"
                placeholder="Student name"
                value={student.name}
                onChange={(e) => {
                  setStudent({ ...student, name: e.target.value });
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                m={"sm"}
                withAsterisk
                label="ID"
                placeholder="Student ID"
                value={student.id}
                onChange={(e) => {
                  setStudent({ ...student, id: e.target.value });
                }}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={4} offset={4}>
              <Button
                color="cyan"
                fullWidth
                mt={"lg"}
                type="submit"
                onClick={()=>{addStudent();setStudent({name : "" , id : ""})}}
              >
                Add Student
              </Button>
            </Grid.Col>
          </Grid>
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
      </Group>
    </>
  );
}
export { step3Object };
