import { Sequelize } from "sequelize";

const sequelize = new Sequelize('user', 'root', '', {
    host : "127.0.0.1",
    dialect : "mysql",
    pool : {
        max : 5,
        min : 0,
        idle : 10000 // idle time req for going from one connection to another in ms
    }
});

sequelize.authenticate().then(() => {
    console.log("Connected to database");
})