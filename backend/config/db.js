require('dotenv').config()
const mysql = require('mysql2')

const db = mysql.createPool({
    connectionLimit: 200,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

const promiseDb = db.promise();
module.exports = {db, promiseDb}