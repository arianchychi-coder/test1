require("dotenv").config()
const sql = require('mssql')
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
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