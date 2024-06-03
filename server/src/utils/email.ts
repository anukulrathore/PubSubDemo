interface sendEmailPayload {
    from: String;
    to: String;
    subject: String;
    body: String;
}

export async function mockSendEmail(payload: sendEmailPayload){
    const {from,to,subject,body} = payload;
    return new Promise((resolve,reject)=>{
        console.log(`Sending email to ${to}...`);
        setTimeout(()=>{resolve(1)},2*1000)
    })
}