const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
    collegeName:{
        type:String,
        required:true
    },
    university:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    studentStatus:{
        type:String,
        required:true
    },
    startedDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    cgpa:{
        type:String,
        required:true
    },

})

const educations = mongoose.model("educations",educationSchema)
module.exports = educations