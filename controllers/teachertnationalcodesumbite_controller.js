const {sql,poolParamis} = require("../utilities/mssql2_database")

const postteachernationalcode = async(req,res)=>{
    const {teachernationalcode} = req.body;

    if (!teachernationalcode || teachernationalcode.trim() === "") {
        return res.status(400).send("!فیلد کد ملی الزانی است")
    }

    try {
        const pool = await poolParamis
       const result= await pool.request().input("teachernationalcode",sql.Char(10),teachernationalcode).query("SELECT COUNT(*) AS count FROM teacher WHERE teachernationalcode = @teachernationalcode");
        const exists = result.recordset[0].count > 0;
        if (exists) {
            res.send("کد ملی معتبر است")
        }
        else{
            return res.status(400).send("کد ملی نامعتبر است")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("خطا")
    }
}
module.exports = {postteachernationalcode}