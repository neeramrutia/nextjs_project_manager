import { Project } from "../../../../models/projectModel";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const allProject = await Project.find({},{_id:true , title : true , images : true , technologiesUsed : true}).sort({_id : -1}).limit(12)
        return NextResponse.json(allProject , {
        success:true,
        statusText:"fetched all tasks successfully",
        status:200
    });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:error.message
        })
    }
}