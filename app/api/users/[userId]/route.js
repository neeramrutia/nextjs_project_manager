import { User } from "../../../../models/userModel"
import { NextResponse } from "next/server";

export async function DELETE(request , {params}){
    const { userId } = params;
    // console.log(params);

    try {
        await User.deleteOne({
            _id:userId
        });
        return NextResponse.json({
            message:"user deleted",
            success:true
        } , {status:201})
            
    } catch (error) {
        return NextResponse.json({
            message:"error deleting user",
            success:false
        } , {
            status:500
        })
    }
}

export async function GET(request , { params }){
    try {
        // console.log(params);
        const {userId} = params;
        const user = await User.findOne({_id:userId}).select("-password");
        return NextResponse.json(user , {
        status:200,
        statusText:"user found successfully"
    });
    } catch (error) {
        return NextResponse.json({
            message:"user not found",
            success:false
        })
    }
    
}
export async function PUT(request , { params }){
    try {
        const { userId } = params;
        const{ name , password , isAdmin , isCoordinator , role } =await request.json();
        
        const user = await User.findById(userId);
        if(name) user.name = name;
        if(password) user.password = password;
        if(isAdmin == true || isAdmin == false) {user.isAdmin = isAdmin; user.role = role}
        if(isCoordinator == true || isCoordinator == false) {user.isCoordinator = isCoordinator; user.role = role; }
        const updatedUser = await user.save();
        return NextResponse.json(updatedUser , {
            status:200,
            statusText:"user updated successfully",
            success:true
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message:"user not updated",
            success:false
        } , {
            status:500
        })
    }
}