const mongoose = require('mongoose')

const connection_string = process.env.CONNECTIONSTRING


mongoose.connect(connection_string).then((res)=>{
    console.log("MONGODB ATLAS CONNECTED SUCCESSFULLY WITH TASKSERVER");
    
}).catch(err=>{
    console.log("MONGODB ATLAS CONNECTION FAILED!!");
    console.log(err);
    
    
})