import { Project } from "../../../../models/projectModel";
import { NextResponse } from "next/server";


export async function GET(request , { params }){
    const { projectId } = params;
    try {
        const project = await Project.findOne({_id:projectId});
        return NextResponse.json(project,{
            success:true,
            status:200,
            statusText:"Fetched task successfully"
        });
    } catch (error) {
        return NextResponse.json({
            success:false,
            statusText:"error fetching task !!",
        },{
            status:500
        });    
    }
}
export async function PUT(request , { params }){
    try {
        const { projectId } = params;
        const { title,content,status,ProjectType } = await request.json();
        let project = await Project.findById(projectId);
        project.title = title;
        project.content = content;
        project.status = status;
        project.ProjectType = ProjectType;
        const updatedProject = await project.save();
        return NextResponse.json(updatedProject);
    } catch (error) {
        return NextResponse.json({
            success:false,
            statusText:"Failed to update the task",
            status:500
        });
    }
}
export async function DELETE(request , { params }){
    
    try {
        const { projectId } = params;
        await Project.deleteOne({_id:projectId});
        return NextResponse.json({
            message:"Task deleted successfully",
            status:200,
            success:true
        });    
    } catch (error) {
        return NextResponse.json({
            message:"Error occurred while deleting the task !!",
            success:false
        },{
            status:500
        });
    }
}