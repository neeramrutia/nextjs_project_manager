import mongoose from "mongoose";
import { type } from "os";

const ProjectSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    content:{
        type : String,
        required : true
    },
    addedDate:{
        type : Date,
        required : true,
        default : Date.now()
    },
    status:{
        type : String,
        enum : ["pending" , "Completed"],
        default : "pending",
    },
    userId:{
        type : mongoose.ObjectId,
        required : true
    },
    ProjectType:{
        type : String,
        required : true
    },
    ProjectLink:{
        type: String,
        required:true
    },
    Mentor:{
        type:String,
        default:"none"
    },
    members:{
        type : Array,
        default : []
    } , 
    technologiesUsed:{
        type : Array,
        default : []
    } ,
    images : {
        type : Array,
        default : []
    },
    DrivePdfId : {
        type : String ,
        default : ""
    },
    DriveVideoId : {
        type : String ,
        default : ""
    }
});

export const Project = mongoose.models.Project || mongoose.model("Project" , ProjectSchema);









// Approach for modeling:
// 1) No need to create project model , just append task as a array inside the user model
// 2) Create another model for task and connect user with it's project using user_id