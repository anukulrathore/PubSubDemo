const { Worker } = require("bullmq");

async function mockSendEmail(payload){
    const {from,to,subject,body} = payload;
    return new Promise((resolve,reject)=>{
        console.log(`Sending email to ${to}...`);
        setTimeout(()=>{resolve(1)},2*1000)
    })
}

const emailWorker = new Worker('email-queue', async(job)=>{
    const data = job.data;
    await mockSendEmail(data);
},{
    connection:{
        host:process.env.host,
        port:Number(process.env.port),
        username:process.env.username,
        password:process.env.password
    }
    
})

module.exports = emailWorker