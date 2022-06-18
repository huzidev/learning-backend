import Tweet from './models/Tweet';
import User from './models/User';
module.exports = async () => {

    User.create({
        username : "huzi",
        password : "test123"
    })

}