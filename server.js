const https = require("https");
const express= require("express");
const app = express();
const port=2000
app.use("/",express.static("src"));
app.use(express.json());

app.listen(port,()=>{
    console.log(`Application hosted on port ${port}`);
});

app.post("/token",(req,res)=>{
    const data=req.body.id;
    const token = gettoken(data).then(re=>res.send(re)).catch(re=>res.send(re))
})

const gettoken=(data)=>{
    return new Promise((resolve,reject)=>{
        const req = https.get(`https://api.scratch.mit.edu/projects/${data}`, res => {
            let datas = [];
            res.on('data', (a) => {
                datas.push(a);
            });
            res.on("end",()=>{
                if(res.statusCode==200){
                    const a = Buffer.concat(datas);
                    const reg = JSON.parse(Buffer.from(a,"utf-8").toString())
                    resolve(reg.project_token);
                }else{
                    reject("error");
                }
            })
        })
        req.on("error",error=>{console.error(error);reject("error");})

    })

}