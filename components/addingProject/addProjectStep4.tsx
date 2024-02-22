import { useState } from "react";
import { mainObject } from "./addProject";
import { Button, Card, Group, TagsInput } from "@mantine/core";
const step4Object = {
  technologyUsed: [""],
};

export default function AddProjectStep4() {
    const [value, setValue] = useState<string[]>(mainObject.technologyUsed);
    const [Project , setProject] = useState(mainObject.technologyUsed);
  const onSave = () => {
    console.log("onsave : " , value)
    step4Object.technologyUsed = value;
    mainObject.technologyUsed = value;
  };
  return (
    <>
      <Group justify="space-around" m={"xl"}>
        <Card shadow="sm" padding="lg" radius="md" withBorder mt={"15%"}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TagsInput
              label="Press Enter to submit a tag"
              description="Add up to 3 tags"
              placeholder="Enter tag"
              maxTags={3}
              defaultValue={["first", "second"]}
              value={value} 
              onChange={(e)=>{setValue(e);}}
              m={"sm"}
              miw={250}
              maw={250}
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
      </Group>
    </>
  );
}
export {step4Object}
