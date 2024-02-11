import { User } from "../../../models/userModel";
import { NextResponse } from "next/server";
export async function GET(req,res){
    try {
        const userCount = await User.countDocuments({role:"user"});
        const adminCount = await User.countDocuments({role:"admin"});
        const coordinatorCount = await User.countDocuments({role:"coordinator"});

        return NextResponse.json({userCount , adminCount , coordinatorCount});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error})
    }

}