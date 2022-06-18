import Tweet from './models/Tweet';
import User from './models/User';

// we should always ASSOCIATE those models who have relation like here single user have multiple tweets means it is a relation
// therefore we've to create an ASSOCIATION here
module.exports = async () => {

// this ASSOCIATION helps us to grab particular stuff we wanted ex if we wanted to extract specific MANY TWEETS FROM SINGLE USER WE
// can because of this association like wise we can extract specific tweet from specific user OR all the users who have tweets the same
// tweet because of this association 

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