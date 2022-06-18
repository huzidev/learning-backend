import Tweet from './models/Tweet';
import User from './models/User';

// we should always ASSOCIATE those models who have relation like here single user have multiple tweets means it is a relation
// therefore we've to create an ASSOCIATION here
module.exports = async () => {

    User.hasMany(Tweet, {
        as : "Tweets",
        foreignKey : "userId"
    });

    Tweet.belongsTo(User, {
        as : "User",
        foreignKey : "userId"
    });

    const errorHandler = (err) => {
        console.log("Error : " + err);
    }

    const user = await User.create({
        username : "huzi",
        password : "test123"
    }).catch(errorHandler);

    const tweet = await Tweet.create({
        content : "Hello, Testing The Tweet!",
        userId : user.id
    }).catch(errorHandler);



}