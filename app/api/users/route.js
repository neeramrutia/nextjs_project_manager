import { User } from '../../../models/userModel'
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import dbconnect from '../../../utils/database';
dbconnect();
export async function GET(req,res){
    // console.log(" ========================== " ,req.nextUrl.searchParams.get("q"))
    let users = [];
    try {
        const LIMIT = req.nextUrl.searchParams.get("limit")
        const ROLE = req.nextUrl.searchParams.get("role")
        const SKIP = req.nextUrl.searchParams.get("skip")
        // console.log("LIMIT : " , LIMIT)
        // console.log("SKIP : " , SKIP)
        if(LIMIT != null && SKIP != null){
            users = await User.find({role : ROLE}).select("-password").limit(LIMIT).skip(SKIP);
            return NextResponse.json(users);
        }
        
        users = await User.find().select("-password");
        return NextResponse.json(users);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message : "error occured while fetching data" , 
            status:false
        });
    }
    
}

export async function POST(request){
    const { name , email , password } =await request.json();

    try {
        const user = new User({
            name,
            email,
            password
        })
        user.password = await bcrypt.hashSync(user.password , parseInt(process.env.BCRYPT_SALT));
        // console.log(user);
        const createdUser = await user.save();
        const response = NextResponse.json(user , {
            status:201
        });
        return response;
    } catch (error) {
        console.log(error); 
        const response = NextResponse.json({
            message:"failed to create a user",
            status:false
        },{
            status:500
        });
        return response;
    }
}

