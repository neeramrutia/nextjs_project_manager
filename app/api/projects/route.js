import { Project } from "../../../models/projectModel";
import { Content } from "next/font/google";
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"

export async function GET(request){
    const query = request.nextUrl.searchParams.get("query")
    console.log(query);
    try {
        if(query == null){
            const allProject = await Project.find().limit(10)
            return NextResponse.json(allProject , {
            success:true,
            statusText:"fetched all tasks successfully",
            status:200
            });
        }
        else{
            const queryRelatedProjects = await Project.find({"$or":[{title : new RegExp(query) },{ Mentor : new RegExp(query)} , {"members.id":new RegExp(query)}]})
            return NextResponse.json(queryRelatedProjects , {
                success:true,
                statusText : "fetched query related projects successfully",
                status:200
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:error.message
        })
    }
}
export async function POST(request){
    const { title , content , userId , status , ProjectType , Mentor , ProjectLink , members} = await request.json();

    // const loginToken = request.cookies.get("loginToken")?.value;
    // const data = jwt.verify(loginToken , process.env.JWT_KEY);
    try {
        const project = new Project({
            title,
            content,
            userId ,
            status,
            ProjectType,
            Mentor,
            ProjectLink,
            members
        });
        const createdProject = await project.save();
        return NextResponse.json(createdProject , {
            status:201,
            statusText:"Task added successfully"
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"Failed to create the task",
            success:false
        },{
            status:500
        }
        );
    }
}