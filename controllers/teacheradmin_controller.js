const teachermodel = require("../models/teacher_model")
const getteacheradmin = async(req,res)=>{
    try {
        const teacheradmin = await teachermodel.getTeacher();
        res.json(teacheradmin)
    } catch (error) {
        console.error(error)
        res.status(500).send("خطا در ثبت اطلاعات")
    }
}
const postteacheradmin = async(req,res)=>{
    try {
        const {postTeacher} = require("./teacher_controller")
        await postTeacher(req,res)
    } catch (error) {
        console.error(error)
        res.status(500).send("خطا در ثبت اطلاعات")
    }
}
module.exports = {getteacheradmin,postteacheradmin}