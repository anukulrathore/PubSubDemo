import express from "express";
import { addUserToCourseQuery } from "./utils/course";
import { mockSendEmail } from "./utils/email";
import { Queue } from "bullmq";
import * as dotenv from 'dotenv';

const app = express();
const PORT = process.env.port ?? 3000
dotenv.config();

const emailQueue = new Queue('email-queue',{
    connection:{
        host:process.env.host,
        port:Number(process.env.port),
        username:process.env.username,
        password:process.env.password
    }
});

app.get("/", (req,res)=>{
    return res.json({status:"success", message:"Hello from express server"});
});

app.post("/add-user-to-course", async(req,res)=>{

    console.log("Adding user to course")
    //critical
    await addUserToCourseQuery();

    await emailQueue.add(`${Date.now()}`,{
        from:"anukul",
        to:"anuj",
        subject:"Demo",
        body:"This is the body of the mail"
    })

    return res.json({status:"success", data:{message:"Enrolled successfully"}})
})

app.listen(3000, ()=> console.log("app is listening on port 3000"));