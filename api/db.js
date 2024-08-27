import mysql from "mysql";
import dotenv from "dotenv"

dotenv.config();

export const db= mysql.createConnection({
    
    
    host: process.env.Host,
    user:process.env.User,
    password:process.env.Password,
    database:process.env.Database,
    port:process.env.Port
})

