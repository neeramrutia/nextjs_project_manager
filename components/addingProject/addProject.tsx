import { Button, Grid, Group, rem, Stepper } from "@mantine/core";
import { AddProjectStep1, step1Object } from "./addProjectStep1";
import { AddProjectStep2, step2Object } from "./addProjectStep2";
import { AddProjectStep3, step3Object } from "./addProjectStep3";
import { step4Object } from "./addProjectStep4";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import LoadingState from "../States/LoadingState";
import SuccessState from "../States/SuccessState";
import ErrorState from "../States/ErrorState";
import AddProjectStep4 from "./addProjectStep4";
import DotLoader from "../Loader/loader";
import { FileWithPath } from "@mantine/dropzone";
import { IconCircleX } from "@tabler/icons-react";
type MainObject = {
  title: string;
  status: string;
  ProjectType: string;
  ProjectLink: string;
  Mentor: string;
  content: String;
  members: Array<{
    name: string;
    id: string;
  }>;
  technologyUsed: Array<string>;
  images: FileWithPath[];
  pdf: FileWithPath[];
  pdfFile: any;
  DrivePdfId: string;
  video: FileWithPath[];
  videoFile: any;
  DriveVideoId: string;
};
const mainObject: MainObject = {
  title: "",
  status: "",
  ProjectType: "",
  ProjectLink: "",
  Mentor: "none",
  content: "",
  members: [
    {
      name: "",
      id: "",
    },
  ],
  technologyUsed: [""],
  images: [],
  pdf: [],
  pdfFile: {},
  DrivePdfId: "",
  video: [],
  videoFile: {},
  DriveVideoId: "",
};

function convertToBase64(file: FileWithPath) {
  return new Promise((resolve, reject) => {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      resolve(filereader.result);
    };
    filereader.onerror = (error) => {
      reject(error);
    };
  });
}

export default function AddProject() {
  const [success, setSuccess] = useState(0);
  const { data: session } = useSession();
  const [pdfUploadLoading, setPdfUploadLoading] = useState(true);
  const [videoUploadLoading, setVideoUploadLoading] = useState(true);
  const [pdfUploadSuccess, setPdfUploadSuccess] = useState(0);
  const [videoUploadSuccess, setVideoUploadSuccess] = useState(0);
  const [Project, setProject] = useState({
    title: "",
    status: "",
    ProjectType: "",
    ProjectLink: "",
    Mentor: "none",
    content: "",
    userId: session?.user.id,
    members: [{}],
    technologyUsed: [""],
    images: [""],
    DrivePdfId: "",
    DriveVideoId: "",
  });
  const resetProject = () => {
    Project.Mentor = "";
    Project.title = "";
    Project.ProjectLink = "";
    Project.ProjectType = "";
    Project.content = "";
    Project.status = "";
    Project.members = [];
    Project.technologyUsed = [""];
    Project.images = [];
    Project.DrivePdfId = "";
    Project.DriveVideoId = "";

    mainObject.Mentor = "none";
    mainObject.ProjectLink = "";
    mainObject.ProjectType = "";
    mainObject.content = "";
    mainObject.members = [
      {
        name: "",
        id: "",
      },
    ];
    mainObject.images = [];
    mainObject.status = "";
    mainObject.technologyUsed = [""];
    mainObject.title = "";
    mainObject.DrivePdfId = "";
    mainObject.DriveVideoId = "";
  };
  const RegisterProject = async () => {
    const base64: Array<string> = [];
    for (let i = 0; i < step4Object.images.length; i++) {
      const base64data: any = await convertToBase64(mainObject.images[i]);
      // console.log(base64data)
      base64.push(base64data);
    }
    Project.images = base64;
    const res = await fetch("api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Project),
    });
    if (res.status == 201) {
      setSuccess(1);
    } else {
      setSuccess(-1);
    }
    resetProject();
  };
  const uploadPdf = async () => {
    let formData = new FormData();
    if (
      mainObject.pdfFile.data != undefined ||
      mainObject.pdfFile.data != null
    ) {
      formData.append("file", mainObject.pdfFile.data);
      formData.append("fileName", mainObject.pdfFile.data.name);
      console.log("pdfFile form addProject", mainObject.pdfFile);
      console.log("pdfFile.data form addProject", mainObject.pdfFile.data);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const pdfUploadResult = await response.json();
      console.log(pdfUploadResult);
      if (pdfUploadResult.success == false) {
        setPdfUploadSuccess(-1);
      }
      if (pdfUploadResult.success == true) {
        mainObject.DrivePdfId = pdfUploadResult.docId;
        setPdfUploadLoading(false);
      }
    } else {
      setPdfUploadSuccess(-1);
    }
  };

  const uploadVideo = async () => {

    let formData = new FormData();
    if(mainObject.videoFile.data != undefined || mainObject.videoFile.data != null){
      formData.append("file", mainObject.videoFile.data);
    formData.append("fileName", mainObject.videoFile.data.name);
    console.log("videoFile form addProject", mainObject.videoFile);
    console.log("videoFile.data form addProject", mainObject.videoFile.data);

    const response = await fetch("/api/upload/video", {
      method: "POST",
      body: formData,
    });
    const videoUploadResult = await response.json();
    console.log("videoUploadResult : ", videoUploadResult);
    if (videoUploadResult.success == false) {
      setVideoUploadSuccess(-1);
    }
    if (videoUploadResult.success == true) {
      console.log("videoUploadResult.docId : ", videoUploadResult.docId);
      mainObject.DriveVideoId = videoUploadResult.docId;
      Project.DriveVideoId = videoUploadResult.docId;
      setVideoUploadLoading(false);
      saveProject().then(() => {
        RegisterProject();
      });
    }
    }
    else{
      setVideoUploadSuccess(-1);
    }
    
  };

  const saveProject = async () => {
    Project.title = step1Object.title;
    Project.status = step1Object.status;
    Project.ProjectType = step1Object.ProjectType;
    Project.content = step2Object.content;
    Project.Mentor = step3Object.Mentor;
    Project.ProjectLink = step3Object.ProjectLink;
    Project.members = step3Object.members;
    Project.technologyUsed = step4Object.technologyUsed;
    Project.DrivePdfId = mainObject.DrivePdfId;
    Project.DriveVideoId = mainObject.DriveVideoId;

    // console.log("base 64 : " , Project.images)
  };
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
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
          label="Third step"
          description="Add mentor details"
        ></Stepper.Step>
        <Stepper.Step
          label="Final step"
          description="Add pics , report & video"
        ></Stepper.Step>
        <Stepper.Completed>
          <Group h={"80vh"} justify="center">
            <Stepper
              styles={{ separator: { outlineOffset: rem(-20) } }}
              wrap={false}
              size="xl"
              active={pdfUploadLoading ? 1 : videoUploadLoading ? 2 : 3}
              orientation="vertical"
            >
              <Stepper.Step
                label="Step 1"
                description="uploading pdf"
                loading={pdfUploadLoading}
                color={pdfUploadSuccess == -1 ? "red" : ""}
                completedIcon={
                  pdfUploadSuccess == -1 && (
                    <IconCircleX style={{ width: rem(20), height: rem(20) }} />
                  )
                }
              />
              <Stepper.Step
                label="Step 2"
                description="uploading video"
                loading={videoUploadLoading && !pdfUploadLoading}
                color={videoUploadSuccess == -1 ? "red" : ""}
                completedIcon={
                  videoUploadSuccess == -1 && (
                    <IconCircleX style={{ width: rem(20), height: rem(20) }} />
                  )
                }
              />
              <Stepper.Step
                label="Step 3"
                description="Creating project"
                loading={
                  active == 4 &&
                  success == 0 &&
                  !videoUploadLoading &&
                  !pdfUploadLoading
                }
                color={active == 4 && success == -1 ? "red" : ""}
                completedIcon={
                  active == 4 &&
                  success == -1 && (
                    <IconCircleX style={{ width: rem(20), height: rem(20) }} />
                  )
                }
              />
            </Stepper>
          </Group>
          <Group align="center">
            {(pdfUploadSuccess == -1 ||
              videoUploadSuccess == -1 ||
              (active == 4 && success == -1)) && (
              <>
                <Button>Retry</Button>
              </>
            )}
          </Group>
        </Stepper.Completed>
      </Stepper>

      {active == 0 && <AddProjectStep1 />}
      {active == 1 && <AddProjectStep2 />}
      {active == 2 && <AddProjectStep3 />}
      {active == 3 && <AddProjectStep4 />}
      {active == 4 && success == 0 && (
        <>
          <LoadingState />{" "}
        </>
      )}
      {active == 4 && success == 1 && (
        <>
          <SuccessState />{" "}
        </>
      )}
      {active == 4 && success == -1 && (
        <>
          <ErrorState />{" "}
        </>
      )}
      {(active == 1 || active == 0 || active == 2 || active == 3) && (
        <Group justify="center" mt="xl">
          {active != 0 && (
            <Button
              variant="default"
              onClick={() => {
                prevStep();
                saveProject();
              }}
            >
              Back
            </Button>
          )}
          {active != 3 && (
            <Button
              onClick={() => {
                nextStep();
                saveProject();
              }}
              color="cyan"
            >
              Next step
            </Button>
          )}
        </Group>
      )}

      {active == 3 && (
        <Group justify="center" mt="xl">
          <Button
            variant="default"
            onClick={() => {
              uploadPdf().then(() => {
                uploadVideo();
              });
              nextStep();
            }}
          >
            Add Project
          </Button>
        </Group>
      )}
    </>
  );
}
export { mainObject };
