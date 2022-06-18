import { Sequelize } from "sequelize";

const sequelize = new Sequelize('user', 'root', '', {
    host : "127.0.0.1",
    dialect : "mysql",
    
})