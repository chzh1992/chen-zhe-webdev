var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('ProjectUserModel',userSchema);

userModel.createUser = createUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserById = findUserById;
userModel.findAssociatedUsersById = findAssociatedUsersById;

module.exports = userModel;

function createUser(user){
    return userModel
        .create(user);
}

function findUserByUsername(username){
    return userModel
        .findOne({username: username});
}

function findUserById(userId){
    return userModel
        .findById(userId);
}

function findAssociatedUsersById(userId){
    var socialNetwork = {};
    userModel
        .findById(userId)
        .populate('socialNetwork.following')
        .populate('socialNetwork.followers')
        .exec(function (err, user){
            console.log(user);
        });
}

