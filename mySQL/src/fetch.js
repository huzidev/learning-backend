import Tweet from './models/Tweet';
import User from './models/User';
module.exports = async () => {

    const errorHandler = (err) => {
        console.log("Error : " + err);
    }

    User.create({
        username : "huzi",
        password : "test123"
    }).catch()

}