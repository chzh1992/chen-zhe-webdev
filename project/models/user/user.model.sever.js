var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('ProjectUserModel',userSchema);
var bookModel = require('../book/book.model.server');

userModel.createUser = createUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserById = findUserById;
userModel.putBookOnBookshelf = putBookOnBookshelf;
userModel.following = following;
userModel.populateUserInformation = populateUserInformation;
userModel.findUserFollowers = findUserFollowers;

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

function putBookOnBookshelf(userId,bookshelfPart,book){
    if (!book._id){
        return bookModel
            .createBook(book)
            .then(
                function (book){
                    return addBookIdToUserBookshelf(userId,bookshelfPart,book._id);
                }
            );
    } else {
        return addBookIdToUserBookshelf(userId,bookshelfPart,book._id);
    }
}

function addBookIdToUserBookshelf(userId,bookshelfPart,bookId){
    return userModel
        .findById(userId)
        .then(
            function (user){
                user.bookshelf[bookshelfPart].push(bookId);
                return user.save();
            }
        );
}

function following(followerId,followingId,status){
    if (status){
        return userModel
            .findById(followerId)
            .then(
                function (user){
                    user.following.push(followingId);
                    return user.save();
                });
    } else {
        return userModel
            .findById(followerId)
            .then(
                function (user){
                    var index = user.following.indexOf(followingId);
                    user.following.splice(index,1);
                    return user.save();
                });
    }

}

function populateUserInformation(userId){
    return userModel
        .findById(userId)
        .populate('following')
        .populate('bookshelf.wantToRead')
        .populate('bookshelf.reading')
        .populate('bookshelf.haveRead')
        .exec();
}

function findUserFollowers(userId){
    return userModel
        .find({following: userId});
}
