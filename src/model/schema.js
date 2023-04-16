const mongoose=require("mongoose");
const validator=require("validator");

const RegisterSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    score:{
        type:Number,
        default:0,
    }
})

const Registration=new mongoose.model("Registration",RegisterSchema);
module.exports=Registration;