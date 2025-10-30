const jwt = require("jsonwebtoken")
const secertkey = "1234567"
const sumbitemodel = require("../models/sumbite_model")
const {sql,poolParamis} = require("../utilities/mssql_database")
const getSumbite = async(req,res)=>{
    try {
        const sumbit = await sumbitemodel.getSumbite();
    res.json(sumbit)
    } catch (error) {
          console.error("Error fetching students:", error);
        res.status(500).send("خطا در دریافت اطلاعات دانشجوها");
    }
}
const postSumbite = async (req, res) => {
    const marital_status = req.body.marital_status || "single";

    const {
        first_name, last_name, father_name, mother_name, national_code,
        birth_certificate_place, birth_certificate_number, birth_date,
        academic_year, education_level, student_phone, father_phone,
        father_job, mother_phone, emergency_phone, mother_job,
        guardian_name, guardian_relation, guardian_phone,
        previous_school_name, home_address, residence_status,
        postal_code, home_phone
    } = req.body;

    // بررسی فیلدهای الزامی
    const requiredFields = [
        "first_name","last_name","father_name","mother_name","national_code",
        "birth_certificate_place","birth_certificate_number","birth_date",
        "academic_year","education_level","student_phone","father_phone",
        "father_job","mother_phone","emergency_phone","mother_job",
        "guardian_name","guardian_relation","guardian_phone",
        "previous_school_name","home_address","residence_status",
        "postal_code","home_phone","marital_status"
    ];

    for (const field of requiredFields) {
        if (!req.body[field] || req.body[field].toString().trim() === "") {
            return res.status(400).send(`فیلد ${field} الزامی است`);
        }
    }

    // بررسی تاریخ تولد
    const birthDateObj = new Date(birth_date);
    if (isNaN(birthDateObj.getTime())) {
        return res.status(400).send("تاریخ تولد نامعتبر است");
    }

    try {
        const pool = await poolParamis;

        // INSERT و گرفتن ID جدید
          await pool.request()
            .input("first_name", sql.NVarChar(50), first_name)
            .input("last_name", sql.NVarChar(50), last_name)
            .input("father_name", sql.NVarChar(50), father_name)
            .input("mother_name", sql.NVarChar(50), mother_name)
            .input("national_code", sql.Char(10), national_code)
            .input("birth_certificate_place", sql.NVarChar(100), birth_certificate_place)
            .input("birth_certificate_number", sql.NVarChar(20), birth_certificate_number)
            .input("birth_date", sql.Date, birthDateObj)
            .input("academic_year", sql.NVarChar(10), academic_year)
            .input("education_level", sql.NVarChar(50), education_level)
            .input("student_phone", sql.Char(11), student_phone)
            .input("father_phone", sql.Char(11), father_phone)
            .input("father_job", sql.NVarChar(50), father_job)
            .input("mother_phone", sql.Char(11), mother_phone)
            .input("emergency_phone", sql.Char(11), emergency_phone)
            .input("mother_job", sql.NVarChar(50), mother_job)
            .input("guardian_name", sql.NVarChar(50), guardian_name)
            .input("guardian_relation", sql.NVarChar(50), guardian_relation)
            .input("guardian_phone", sql.Char(11), guardian_phone)
            .input("previous_school_name", sql.NVarChar(255), previous_school_name)
            .input("home_address", sql.NVarChar(255), home_address)
            .input("residence_status", sql.NVarChar(10), residence_status)
            .input("postal_code", sql.NVarChar(20), postal_code)
            .input("home_phone", sql.NVarChar(11), home_phone)
            .input("marital_status", sql.NVarChar(20), marital_status)
            .query(`
                INSERT INTO Table_1 (
                    first_name, last_name, father_name, mother_name, national_code,
                    birth_certificate_place, birth_certificate_number, birth_date,
                    academic_year, education_level,
                    student_phone, father_phone, father_job,
                    mother_phone, emergency_phone, mother_job,
                    guardian_name, guardian_relation, guardian_phone,
                    previous_school_name, home_address, residence_status,
                    postal_code, home_phone, marital_status
                )
                OUTPUT INSERTED.id
                VALUES (
                    @first_name, @last_name, @father_name, @mother_name, @national_code,
                    @birth_certificate_place, @birth_certificate_number, @birth_date,
                    @academic_year, @education_level,
                    @student_phone, @father_phone, @father_job,
                    @mother_phone, @emergency_phone, @mother_job,
                    @guardian_name, @guardian_relation, @guardian_phone,
                    @previous_school_name, @home_address, @residence_status,
                    @postal_code, @home_phone, @marital_status
                )
            `);
                      // بعد از INSERT موفق
const user = await sumbitemodel.getUserByNationalCode(national_code);

if (!user) {
  return res.status(404).send("کاربر یافت نشد");
}

const token = jwt.sign(
  { id: user.id, email: user.email },
  secertkey,
  { expiresIn: "1h" }
);

console.log("token is:", token);

await sumbitemodel.updateToken(user.id, token);
return res.json({
  message: "Successful",
  token: token
});

    } catch(err){
        console.error("SQL Error:", err);
        res.status(500).send(`خطا در ثبت اطلاعات دانشجو: ${err.message}`);
    }
};
module.exports = {
    getSumbite,postSumbite
}