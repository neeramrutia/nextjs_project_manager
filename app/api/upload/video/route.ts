import { google } from "googleapis"
import {NextRequest, NextResponse} from "next/server"



import { Readable } from "node:stream"

// export function POST (req:NextApiRequest , res : NextApiResponse){
//   const form  = formidable();
//   form.parse(req , (err , fields , file) =>{
//     console.log(file);
//   })
//   return NextResponse.json({success:true})
// }
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
        mimeType : "application/video" , 
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


// export async function POST(req : NextRequest,res : NextResponse){
//     try {
//         console.log("inside upload route");
//         // const pdf = await req.formData()
//         // console.log("pdf : " , pdf)
//         const form = formidable();
//         form.parse(req , (err , fields , files) =>{
//             console.log("files : " , files)
//         })
//         // console.log("form : " , form);
//         // fs.readFile(req.files.file.path , function(err , data){
//         //     console.log("data : " , data)
//         // })
//         // console.log("formData.file : " , req.formData().files)
//         return NextResponse.json({success : true})

      //   const auth = new google.auth.GoogleAuth({
      //   scopes: "https://www.googleapis.com/auth/drive",
      //   projectId:"nextjs-project-manager",
      //   credentials:{
      //     client_id:"100334538573759433463",
      //     client_email:"upload-pdf-to-drive@nextjs-project-manager.iam.gserviceaccount.com",
      //     private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDWunRa03cf+LJA\nMQc89hnMI6ZRzDcxOAM/s+NjWGvJUKdUUk9DRG2t//NdenRdvZgRB9Y0N0Fnzsyx\njYAwYrafnlIJy7xfa1hZ6vluLVAQEBHUuxnacoxBWGTLVCvn+f0Aw2xlanSk379+\nXhfvyGx/qfjjyO/kLSQDkqE0GK1QFmGA5mSMO87Pam1NxkVqJ636lfHcPqbsFSfv\nx6IUKhzJOEM7l2mr1ZXz3lNupQiRQ+Hz/qix39wgraOOM6TBuqTPLJAcS+SxDE8e\nvBt2zfWOPz55nbThjVz1zBYB8/ZNIWNEUm0MSBtecEfRhkSntf3m3wtQx5yb4xUH\nmOCv/DNxAgMBAAECggEAD9eOg09v7d/MLdx4JV0eSt9z8zu69DKG2dWwoGka/a2p\nxLi0YJj9Mw3Lw5En4e0dmZ8PhIdxl8Ir+6r+AsPbp6PXd2HMvmj16h9iAukMq7y1\nxhE+P229T4phGFe3zAv3aK2iUwqjO7FGyGDSiQYrTBFrG4oc+cODUVCpfEWYTszP\nScXjIXADWzgu095xDs+jR3eHnUK0AoJXPqG6tFE/wB18HQubgTUTREHlDEZD9csP\nDdcLpWM9EyLFSq5+HYqz3TbHE7lkK1istGEH2eyQuKYhzfPYN21nn9R10/xPsBnd\ngsVnSCyWu6VMBD5C7wEjSLC96fH4SG+fEx53pqsk6QKBgQD0IBS45U+iPi6+L8Zb\ngUgo2tdFADAo4EbNdw/1O4ljC/wGwU8G3k9qtepsqmVe058lHYoL0AVwfH3b4gwX\nKSeGGA9rye7NhB3gCd8XlzIs3g4Bt1rtMjJhXFrHO/iC5o0hgrbQwg8F9bQXf5pg\nEj/xxjxgbtvc1c2NFbptYyLWSQKBgQDhLFBa87FvVvG6uQtH9hYEM6tRt70gbuOT\n8GxDLv+Pr//mHw77u82HMrF1QUAloY4BZsEYCbUszs9FIwye+vN/7akTYQLvmV9x\nuCY1DlTBhciojw3l4gFFFs6wdGzJF3ZAHvgfwB7XMtJFlsGZgXaxpTr8wOAmBGty\nyx3wJWHT6QKBgQDl93KN2jXx9/HAZvDMMjTvh3dSIKM9XkhUNNxrfvIkw51eH6t6\nJOFa/JMgWkOz2FYKeJEaH5OAK0XEZGRPTQ1WXEPqnga+wr4B1kq5xkwVx/gZ1cdp\nueeLn5xEIlIvvU8lSiU88hGE47gKisG5znc+IieuD8A9f4pqZRWBBepDQQKBgQC6\n9b9WdUabCpa1EdWjD1mibYBO3n9jAY9mE1bgxZIeLOUNnjYjoAB7xASCNgZb+HLf\nCQFEwzKyHJkOb5aYHge17Y/X7lGwvSj5VAwtO1P2Ru2fvv+sIuYpBlHhQxncMeXW\nQaCFRFCXH7RlYVIn8c2qnGWI3WB/UGYirzGRZoh+mQKBgQClkHD++VV4T6zuXT1T\nAUIMCRED7rJpHNuL8rJ13FBNXdhXw6RzuEgRv7eBQb0uPghtBFwPQVGPPdE0xUqw\nuegwZPjWzcU4y61zEKc8I3sZdCkiB0Sxwy5xjJX6BmhnSuz33v4Yqk1muUpH9fZO\ny9LEho4rxspP12/ZUPgbt07ndw==\n-----END PRIVATE KEY-----\n"
      //   }
      // })
      //console.log(auth)
      
      // const uploadToGooglDrive = async()=>{
      //   const fileMetadata = {
      //     name: pdf.name,
      //     parents: ["1lC8qQ8PB6zCwGhQuO9PT_rmT7Wa2wYP6"], 
      //   };
  
        // const driveService = google.drive({ version: "v3", auth:auth });
        // const response = await driveService.files.create({
        //   requestBody: fileMetadata,
        //   media: {
        //     mimeType : "pdf",
        //     body:fs.createReadStream(pdf|| "")
        //   },
        //   fields: "id",
        // });
//         console.log("response : " , response)
//         // uploadToGooglDrive()
//       return NextResponse.json({success : true})
//     }
//     } catch (error) {
//         return NextResponse.json({success : false})
//     }
// }