import mysql from 'mysql'
import config from './config'
import dotenv from 'dotenv'
dotenv.config()
const params ={
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB
}

const Connect =async () => new Promise<mysql.Connection>((resolve,reject)=>{
    const connection = mysql.createConnection(params)

    connection.connect((error)=>{
        if(error){
            reject(error)
            return
        }
        resolve(connection)
    })
})
const Query =async (connection:mysql.Connection, query: string) => new Promise((resolve, reject)=>{
    connection.query(query, connection, (error, result)=>{
        if(error){
            reject(error)
            return
        }
        resolve(result)
    })
})

export {Connect, Query}