import { User } from "../../../models/userModel"
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function GET(req,res){
    let users = [];
    try {
        users = await User.find().select("-password");
        return NextResponse.json(users);
    } catch (error) {
        response = NextResponse.json({
            message : "error occured while fetching data" , 
            status:false
        });
        return response;
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
        console.log(user);
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

