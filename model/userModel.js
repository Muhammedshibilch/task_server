const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    number:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:Date
    },
    gender:{
        type:String
    },
    aadhar:{
        type:String
    },
    address:{
        type:String
    },
    state:{
        type:String
    },
    
    district:{
        type:String
    },
    pincode:{
        type:String
    },
    parentName:{
        type:String
    },
   
    

})

const users= mongoose.model("users",userSchema)
module.exports = users