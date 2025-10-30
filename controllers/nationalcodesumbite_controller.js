const { sql, poolParamis } = require("../utilities/mssql_database");

const checkNationalCode = async (req, res) => {
    const { national_code } = req.body;

    if (!national_code || national_code.trim() === "") {
        return res.status(400).send("کد ملی الزامی است");
    }

    try {
        const pool = await poolParamis;
        const result = await pool.request()
            .input("national_code", sql.Char(10), national_code)
            .query("SELECT COUNT(*) AS count FROM Table_1 WHERE national_code = @national_code");

        const exists = result.recordset[0].count > 0;

        if (exists) {
            res.send("کد ملی معتبر است");
        } else {
            res.status(400).send("کد ملی یافت نشد");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("خطا در بررسی کد ملی");
    }
};

module.exports = { checkNationalCode };
