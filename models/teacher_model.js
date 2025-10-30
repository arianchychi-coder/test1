const {sql,poolParamis} = require("../utilities/mssql2_database")
class TeacherModel {
    getTeacher = async()=>{
      try {
          const pool = await poolParamis;
        const result = await pool.request().query(`SELECT * FROM teacher`)
        return result.recordset || []
      } catch (error) {
        console.log("Error: ",error)
      }
    }
    getnationalcode = async(teachernationalcode)=>{
      try {
        const pool = await poolParamis;
        const result = await pool.request().input("teachernationalcode",sql.Char(10),teachernationalcode).query(`SELECT id,teachernationalcode FROM teacher WHERE teachernationalcode=@teachernationalcode`)
        return result.recordset[0];
      } catch (error) {
        console.log("Error: ",error)
      }
    }
    updatetoken = async(id,token)=>{
      try {
        const pool = await poolParamis;
        const result = await pool.request().input("id",sql.Int,id).input("token",sql.NVarChar(sql.MAX),token).query(`UPDATE teacher SET token=@token WHERE id=@id`)
        return result.recordset[0]
      } catch (error) {
        console.log("Error: ",error)
      }
    }
}
module.exports = new TeacherModel();