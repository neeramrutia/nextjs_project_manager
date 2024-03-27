import { google } from "googleapis"
import { NextResponse} from "next/server"



import { Readable } from "node:stream"

export async function POST(request: Request) {
  
  const formData = await request.formData();
  const file:any = formData.get('file');
  const filename : any = formData.get("fileName")
  console.log("filename : " , filename);
  const fileBuffer = file.stream();
  

  const auth = new google.auth.GoogleAuth({
    scopes: "https://www.googleapis.com/auth/drive",
    projectId:process.env.GDRIVE_PROJECTID,
    credentials:{
      client_id:process.env.GDRIVE_CLIENTID,
      client_email:process.env.GDRIVE_CLIENTEMAIL,
      private_key:process.env.GDRIVE_PRIVTKEY
    }
  })

  const uploadToGooglDrive = async()=>{
    const fileMetadata = {
      name: filename,  
      parents: ["1lC8qQ8PB6zCwGhQuO9PT_rmT7Wa2wYP6"], 
    };


    const driveService = google.drive({ version: "v3", auth:auth });
    const response = await driveService.files.create({
      requestBody: fileMetadata,
      media: {
        mimeType : "application/pdf" , 
        body:Readable.from(fileBuffer)
      },
      fields: "id",
    });
    console.log("res : " , response.data.id);
      return {docId :response.data.id , success : true}
    
  }
  try {
    const res = await uploadToGooglDrive()
    console.log("res : " , res);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({success : false})
  }
  
}