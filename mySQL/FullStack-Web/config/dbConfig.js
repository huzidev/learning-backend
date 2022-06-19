module.exports = {
    HOST : "127.0.0.1",
    USER : "root",
    PASSWORD : "root",
    DB : "fullstack",
    dialect : "mysql",
    pool : {
        max : 5,
        min : 0,
        idle : 10000 // idle time req for going from one connection to another in ms
    }
}