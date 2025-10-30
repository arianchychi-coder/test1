require("dotenv").config()
const sql = require('mssql')
const sqlConfig = {
  user: process.env.DB_USER2,
  password: process.env.DB_PWD2,
  database: process.env.DB_NAME2,
  server: process.env.DB_SERVER2,
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}
const poolParamis = new sql.ConnectionPool(sqlConfig).connect()

.then(pool=>{
    console.log("Connected to DB: ",sqlConfig.database)
    return pool;
})
.catch(err=>{
    console.log("Error: ",err)
})
module.exports = {
    sql,poolParamis
}