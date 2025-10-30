const { sql, poolParamis } = require("../utilities/mssql_database");

class SumbiteModel {
  getSumbite = async () => {
    try {
      const pool = await poolParamis;
      const result = await pool.request().query("SELECT * FROM Table_1");
      return result.recordset || [];
    } catch (error) {
      console.log("Error:", error);
    }
  };

  getUserByNationalCode = async (national_code) => {
    try {
      const pool = await poolParamis;
      const result = await pool.request()
        .input("national_code", sql.Char(10), national_code)
       .query("SELECT id, national_code FROM Table_1 WHERE national_code=@national_code");
      return result.recordset[0];
    } catch (error) {
      console.log("Error:", error);
    }
  };

  updateToken = async (id, token) => {
    try {
      const pool = await poolParamis;
      await pool.request()
        .input("id", sql.Int, id)
        .input("token", sql.NVarChar(500), token)
        .query("UPDATE Table_1 SET token=@token WHERE id=@id");
      return true;
    } catch (error) {
      console.log("Error:", error);
      return false;
    }
  };
}

module.exports = new SumbiteModel();
