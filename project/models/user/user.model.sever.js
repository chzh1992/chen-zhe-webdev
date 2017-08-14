var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('ProjectUserModel',userSchema);

userModel.createUser = createUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserById = findUserById;
userModel.putBookOnBookshelf = putBookOnBookshelf;
userModel.toggleFollowingStatus = toggleFollowingStatus;
userModel.populateUserInformation = populateUserInformation;
userModel.findUserFollowers = findUserFollowers;
userModel.claimBook = claimBook;
userModel.updateProfile = updateProfile;
userModel.getHaveReadNumber = getHaveReadNumber;
userModel.getReadingNumber = getReadingNumber;
userModel.getWantToReadNumber = getWantToReadNumber;
userModel.adminSearch = adminSearch;

module.exports = userModel;

function createUser(user){
    return userModel.create(user);
}

function findUserByUsername(username){
    return userModel
        .findOne({username: username});
}

function findUserById(userId){
    return userModel
        .findById(userId);
}

function putBookOnBookshelf(userId,bookshelfPart,libriId){
    return userModel
        .findById(userId)
        .then(
            function (user){
                if (user.bookshelf.wantToRead.indexOf(libriId) > -1){
                    user.bookshelf.wantToRead.splice(user.bookshelf.wantToRead.indexOf(libriId));
                }
                if (user.bookshelf.reading.indexOf(libriId) > -1){
                    user.bookshelf.reading.splice(user.bookshelf.reading.indexOf(libriId));
                }
                if (user.bookshelf.haveRead.indexOf(libriId) > -1){
                    user.bookshelf.haveRead.splice(user.bookshelf.haveRead.indexOf(libriId));
                }
                if (bookshelfPart === 'OUT'){
                    return user.save();
                } else{
                    user.bookshelf[bookshelfPart].push(libriId);
                    return user.save();
                }
            }
        )
}

function toggleFollowingStatus(followerId,followingId){
    return userModel
        .findById(followerId)
        .then(
            function (user){
                var index = user.following.indexOf(followingId);
                if ( index > -1){
                    user.following.splice(index,1);
                } else {
                    user.following.push(followingId);
                }
                return user.save();
            }
        );
}

function populateUserInformation(userId){
    return userModel
        .findById(userId)
        .populate('following')
        .populate('bookshelf.wantToRead')
        .populate('bookshelf.reading')
        .populate('bookshelf.haveRead')
        .populate('authoredBooks')
        .exec();
}

function findUserFollowers(userId){
    return userModel.find({following: userId});
}


function claimBook(userId,libriId){
    return userModel
        .findById(userId)
        .then(
            function (user){
                user.authoredBooks.push(libriId);
                return user.save();
            }
        );
}

function updateProfile(userId,profile){
    return userModel
        .update({_id:userId},{
        $set :{
            email: profile.email,
            country: profile.country,
            nativeLanguage: profile.nativeLanguage
        }
        });
}

function getHaveReadNumber(libriId){
    return userModel
        .count({'bookshelf.haveRead':libriId});
}

function getReadingNumber(libriId){
    return userModel
        .count({'bookshelf.reading':libriId});
}

function getWantToReadNumber(libriId){
    return userModel
        .count({'bookshelf.wantToRead':libriId});
}

function adminSearch(searchText){
    return userModel.find({ $or :[
        {_id: searchText},
        {username: searchText},
        {role: searchText}
    ]});
}
