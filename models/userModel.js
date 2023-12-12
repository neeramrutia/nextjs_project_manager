import mongoose , { Schema} from 'mongoose'

const userSchema = new Schema({
    name:{
        type:String,
        required:[true , "name required"]
    },
    email:{
        type:String,
        required:[true , "email required"],
        unique:true
    },
    password:{
        type:String,
        required:[true , "password required"]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isCoordinator:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"user"
    }

});
export const User =mongoose.models.users || mongoose.model("users" , userSchema);
 