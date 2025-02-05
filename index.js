require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

const taskServer = express()


taskServer.use(cors())
taskServer.use(express.json())
taskServer.use(router)



const PORT = 3000 || process.env.PORT

taskServer.listen(PORT,()=>{
    console.log(`task Server started at port : ${PORT} and waiting for client request!!!`);
    
})

taskServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">task Server started  and waiting for client request!!!</h1>`)
})


