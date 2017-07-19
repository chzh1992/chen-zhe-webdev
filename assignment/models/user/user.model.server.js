var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('AssignmentUserModel',userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addWebsiteToUser = addWebsiteToUser;
userModel.removeWebsiteFromUser = removeWebsiteFromUser;

module.exports = userModel;

function createUser(user) {
    return userModel
        .create(user);
}

function findUserById(userId) {
    return userModel
        .findById(userId);
}

function findUserByUsername(username) {
    return userModel
        .findOne({username: username});
}

function findUserByCredentials(username,password) {
    return userModel
        .findOne({
            username: username,
            password: password});
}

function updateUser(userId,user) {
    delete user.username;
    return userModel
        .update({_id:userId},{
            $set : {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }
        });
}

function deleteUser(userId) {
    return userModel
        .remove({_id: userId});
}

function addWebsiteToUser(userId,websiteId){
    return userModel
        .findById(userId)
        .then(function (user){
            user._websites.push(websiteId);
            return user.save();
        });
}

function removeWebsiteFromUser(userId,websiteId){
    return userModel
        .findById(userId)
        .then(function (user){
            var index = user._websites.indexOf(websiteId);
            user._websites.splice(index,1);
            return user.save();
        });
}