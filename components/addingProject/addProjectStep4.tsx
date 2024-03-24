import { useState } from "react";
import { mainObject } from "./addProject";
import { Button, Card, Group, TagsInput, rem } from "@mantine/core";
import { Text, Image, SimpleGrid } from "@mantine/core";

import {
  Dropzone,
  IMAGE_MIME_TYPE,
  FileWithPath,
  DropzoneProps,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import { IconUpload, IconX } from "@tabler/icons-react";
const step4Object:any = {
  technologyUsed: [""],
  images : [] , 
  pdf : [] , 
  pdfFile : {}
};
export default function AddProjectStep4(props: Partial<DropzoneProps>) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [pdf , setPdf] = useState<FileWithPath[]>([]);
  const [pdfFile , setPdfFile] = useState<any>(null)
 const handlepdfChange = (e : any)=>{
  const file = {
    preview: URL.createObjectURL(e.target.files[0]),
    data: e.target.files[0],
  };
  console.log("file : " , file)
  setPdfFile(file);
  mainObject.pdfFile = file;
  step4Object.pdfFile = file;
 }

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const pdfPreview = pdf.map((file , index)=>{
    return(
      <>
      <Text key={file.name}>
        PDF selected : 
      {file.name}
      </Text>
      </>
    )
  })

  const [value, setValue] = useState<string[]>(
    mainObject.technologyUsed[0] == "" ? [] : mainObject.technologyUsed
  );
  const [Project, setProject] = useState(mainObject.technologyUsed);
  const onSave = () => {
    // console.log("onsave : ", value);
    step4Object.technologyUsed = value;
    mainObject.technologyUsed = value;
    step4Object.images = files;
    mainObject.images = files ;
    step4Object.pdf = pdf;
    mainObject.pdf = pdf;
    // console.log("mainObj : " , mainObject);
  };
  return (
    <>
      <Group justify="center" m={"xl"}>
        <Card shadow="sm" padding="lg" radius="md" withBorder mt={"15%"} maw={550}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Group justify="center">
            <TagsInput
              label="Press Enter to submit a tag"
              description="Add up to 3 tags"
              placeholder="Enter tag"
              maxTags={3}
              defaultValue={["first", "second"]}
              value={value}
              onChange={(e) => {
                setValue(e);
              }}
              m={"sm"}
              miw={220}
              maw={220}
            />
            </Group>
            <Dropzone
            activateOnDrag = {true}
            maxFiles={3}
              maxSize={5 * 1024 ** 2}
              onReject={(files) => console.log("rejected files", files)}
              accept={IMAGE_MIME_TYPE}
              onDrop={(files)=>{setFiles(files); console.log('accepted files', files); step4Object.images = files || []; console.log("main  object" ,mainObject)}}
              {...props}
            >
              <Text ta="center">Drop images here</Text>
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
            </Dropzone>

            <SimpleGrid
              cols={{ base: 1, sm: 4 }}
              mt={previews.length > 0 ? "xl" : 0}
            >
              {previews}
            </SimpleGrid>


            <Dropzone
            activateOnDrag = {true}
            maxFiles={1}
              maxSize={15 * 1024 ** 2}
              onReject={(files) => console.log("rejected files", files)}
              accept={PDF_MIME_TYPE}
              onDrop={(pdf)=>{setPdf(pdf); console.log('accepted files', pdf); }}
              onChange={(e)=>{handlepdfChange(e)}}
              {...props}
            >
              {
                pdfPreview.length == 0 && (
                <Text ta="center">Drop pdf here</Text>
                )
              }
              {
                pdfPreview.length != 0 && (
                pdfPreview
                )
              }
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
            </Dropzone>

            {/* <SimpleGrid
              cols={{ base: 1, sm: 4 }}
              mt={previews.length > 0 ? "xl" : 0}
            >
              {pdfPreview}
            </SimpleGrid> */}

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
export { step4Object };
