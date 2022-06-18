import { Sequelize } from "sequelize";

const sequelize = new Sequelize('user-data', 'root', '', {//'user-data' is the name of database , 'root' name of user we've created with, '' empty tag is for password since we didn't provide any password therefore we can left it empty
    host : "127.0.0.1",
    dialect : "mysql",
    pool : {
        max : 5,
        min : 0,
        idle : 10000 // idle time req for going from one connection to another in ms
    }
});

sequelize.authenticate().then(() => { // to authenticate whether we are linked to database or not
    console.log("Connected to database");
}).catch((err) => {
    console.log("Failed to connect database " + err);
})

module.exports = sequelize;