const teachermodel = require("../models/teacher_model");
const { sql,poolParamis } = require("../utilities/mssql_database");
const jwt = require("jsonwebtoken")
const secertkey2 = "12345"
const getTeacher = async(req,res)=>{
    try {
        const teacher = await teachermodel.getTeacher();
        res.json(teacher)
    } catch (error) {
        console.error(error)
        res.status(500).send("خطا")
    }
}
const postTeacher = async(req,res)=>{
    const {teachername,teacherlastname,teachernationalcode,teacherplaceholder,teachercertificatenumber,teacherdate,teacheracademicyear,teacherdeagree,teacherphone,teacheremergencyphone,teacheredjucation,teacherlastschool,teacheradress,teacherpostcode} = req.body;
    
    if (!teachername || !teacherlastname || !teachernationalcode || !teacherplaceholder || !teachercertificatenumber || !teacherdate || !teacheracademicyear || !teacherdeagree || !teacherphone || !teacheremergencyphone || !teacheredjucation || !teacherlastschool || !teacheradress || !teacherpostcode) {
        return res.status(500).send("Error")
    }

    try {
        const pool = await poolParamis;
        await pool.request().input("teachername",sql.NVarChar,teachername).input("teacherlastname",sql.NVarChar,teacherlastname).input("teachernationalcode",sql.NVarChar,teachernationalcode).input("teacherplaceholder",sql.NVarChar,teacherplaceholder).input("teachercertificatenumber",sql.NVarChar,teachercertificatenumber).input("teacherdate",sql.NVarChar,teacherdate).input("teacheracademicyear",sql.NVarChar,teacheracademicyear).input("teacherdeagree",sql.NVarChar,teacherdeagree).input("teacherphone",sql.NVarChar,teacherphone).input("teacheremergencyphone",sql.NVarChar,teacheremergencyphone).input("teacheredjucation",sql.NVarChar,teacheredjucation).input("teacherlastschool",sql.NVarChar,teacherlastschool).input("teacheradress",sql.NVarChar,teacheradress).input("teacherpostcode",sql.NVarChar,teacherpostcode) .query(`
      INSERT INTO teacher
      (teachername, teacherlastname, teachernationalcode, teacherplaceholder, teachercertificatenumber, teacherdate, teacheracademicyear, teacherdeagree, teacherphone, teacheremergencyphone, teacheredjucation, teacherlastschool, teacheradress, teacherpostcode)
      VALUES
      (@teachername, @teacherlastname, @teachernationalcode, @teacherplaceholder, @teachercertificatenumber, @teacherdate, @teacheracademicyear, @teacherdeagree, @teacherphone, @teacheremergencyphone, @teacheredjucation, @teacherlastschool, @teacheradress, @teacherpostcode)
  `);
        const user = await teachermodel.getnationalcode(teachernationalcode)
        if (!user) {
            return res.status(404).send("Error")
        }
        const token = jwt.sign({
            id:user.id , email:user.email,
        },secertkey2,{expiresIn:"1h"})
        console.log("token is: ",token)
        await teachermodel.updatetoken(user.id , token)
        return res.json({
            mesaage:"Succsesful",
            token:token
        })
    } catch (error) {
        console.error(error)
        res.status(500).send("Cant sumbit!")
    }
}
module.exports = {
    getTeacher,postTeacher
}