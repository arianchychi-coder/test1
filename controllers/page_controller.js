const path = require("node:path")
const frogs=[
     {id:1,name:"index",file:" index.html"},
    {id:2,name:"student",file:"student.html"},
      {id:3,name:"studentsumbit",file:"studentsumbit.html"},
      {id:4,name:"teacher",file:"teacher.html"},
      {id:5,name:"class",file:"class.html"},
      {id:6,name:"11Astudentlist",file:"11Astudentlist.html"},
       {id:7,name:"studentlist",file:"studentlist.html"},
       {id:8,name:"studentsumbitenat",file:"studentsumbitenat.html"},
       {id:9,name:"teachersumbit",file:"teachersumbit.html"},
       {id:10,name:"teachersumbitnat",file:"teachersumbitnat.html"},
       {id:11,name:"maneigment",file:"maneigment.html"},
       {id:12,name:"teacherlist",file:"teacherlist.html"},
         {id:13,name:"chatbot",file:"chatbot.html"},

]
const getPage = (req,res)=>{
    const nameURL = decodeURIComponent(req.params.name)
    const frog = frogs.find(c=>c.id===parseInt(req.params.id) && c.name===nameURL)
    if (!frog) {
        return res.status(404).send("Coudent find!")
    }
    res.sendFile(path.join(__dirname,"..","public",frog.file.trim()))
}
module.exports = {
    getPage
}