import { Project } from "../../../../models/projectModel"
import { NextResponse } from "next/server";
import dbconnect from "../../../../utils/database";
dbconnect();
export async function GET(req, res) {
    const QUERY = req.nextUrl.searchParams.get("query")
    const FILTER = req.nextUrl.searchParams.get("FILTER")
    let count = 0;
    try {
        if(QUERY == null || QUERY == ""){
            count =await Project.countDocuments()
        }
        else{
            if(FILTER == null || FILTER == "Any" || FILTER == "")
                count = await Project.countDocuments({"$or":[{title : new RegExp(QUERY) },{ Mentor : new RegExp(QUERY)} , {"members.id":new RegExp(QUERY)}]})
            else if( FILTER == "Mentor" )
                count = await Project.countDocuments({"$or":[{ Mentor : new RegExp(QUERY)}]})
            else if( FILTER ==  "Member Name")
                count = await Project.countDocuments({"$or":[{"members.name":new RegExp(QUERY)}]})
            else if( FILTER == "Member Id" )
                count = await Project.countDocuments({"$or":[{"members.id":new RegExp(QUERY)}]})
            else if( FILTER == "Title" )
                count = await Project.countDocuments({"$or":[{"title":new RegExp(QUERY)}]})
            else  count = await Project.countDocuments({"$or":[{title : new RegExp(QUERY) },{ Mentor : new RegExp(QUERY)} , {"members.id":new RegExp(QUERY)}]})
            }
        const obj = {count}
        // console.log("count" , count);
        return NextResponse.json(obj);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error)
    }
}