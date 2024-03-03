import { User } from "../../../models/userModel";
import { NextResponse } from "next/server";
import dbconnect from "../../../utils/database";
dbconnect();
export async function GET(req, res) {
    let users = [];
    const ROLE = req.nextUrl.searchParams.get("role")
    try {
        const count =await User.countDocuments({role : ROLE})
        const obj = {count}
        // console.log("count" , count);
        return NextResponse.json(obj);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error)
    }
}