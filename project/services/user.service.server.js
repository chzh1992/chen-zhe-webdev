var app = require('../../express');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var userModel = require('../models/user/user.model.sever');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });
var projectBaseUrl = process.env.PROJECT_BASE_URL;

app.post("/api/project/login",passport.authenticate('project'),login);
app.post("/api/project/register",register);
app.post("/api/project/logout",logout);

app.get("/auth/twitter",passport.authenticate('twitter'));
app.get("/auth/twitter/callback",
    passport.authenticate('twitter', {
        successRedirect: projectBaseUrl + '#!/personal-page',
        failureRedirect: projectBaseUrl+ '#!/login' }));

app.get("/api/project/isAvailable/:username",isUsernameAvailable);
app.get("/api/project/checkLoggedIn",checkLoggedIn);
app.get("/api/project/profile/:userId",getUserPublicProfile);

app.put("/api/project/follow/:userId",toggleFollowingStatus);
app.get("/api/project/isFollowing/:userId",isUserFollowed);
app.put("/api/project/bookshelf/:bookshelfPart/:libriId",putBookOnBookshelf);
app.get("/api/project/personal-page/profile",getUserPersonalProfile);
app.get("/api/project/personal-page/bookshelf",getUserBookshelf);
app.get("/api/project/personal-page/news",getUserNews);
app.get("/api/project/personal-page/works",getAuthorWorks);
app.put("/api/project/claim/:libriId",claimBook);
app.get("/api/project/followers",getUserFollowers);
app.put("/api/project/profile/:userId",updateProfile);
app.get("/api/project/number/wantToRead/:libriId",getWantToReadNumber);
app.get("/api/project/number/reading/:libriId",getReadingNumber);
app.get("/api/project/number/haveRead/:libriId",getHaveReadNumber);
app.get("/api/project/popUsers",getPopUsers);

app.get("/api/project/user/:userId",isAdmin,findUserById);
app.put("/api/project/user/:userId",isAdmin,updateUser);
app.delete("/api/project/user/:userId",isAdmin,deleteUser);
app.get("/api/project/user",isAdmin,findAllUser);
app.post("/api/project/user",isAdmin,createUser);

app.post("/api/project/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {
    var myFile        = req.file;
    var userId = req.body.userId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    userModel
        .updatePhotoUrl(userId,'/uploads/'+filename)
        .then(
            function (doc){
                var host = req.url.split('/')[0];
                res.writeHead(301,
                    {Location: host+"/project/index.html#!/personal-page"}
                );
                res.end();
            }
        )
}


function checkLoggedIn(req,res){
    if (req.isAuthenticated()){
        res.json(req.user);
    } else {
        res.sendStatus(401);
    }
}

function login(req,res){
    res.json(req.user);
}

function register(req,res){
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(
            function (user){
                if (user) {
                    req.login(user,function (err){
                        if (err) {
                            res.sendStatus(400);
                        } else{
                            res.sendStatus(200);
                        }
                    });
                }
            }
        );
}

function isUsernameAvailable(req,res){
    var username = req.params['username'];
    userModel
        .findUserByUsername(username)
        .then(
            function (user){
                if (user){
                    res.sendStatus(403);
                } else {
                    res.sendStatus(200);
                }
            }
        )
}

function putBookOnBookshelf(req,res){
    if (req.isAuthenticated()){
        var bookshelfPart = req.params['bookshelfPart'];
        var libriId = req.params['libriId'];
        bookshelfPart = validifyBookshelfPart(bookshelfPart);
        if (bookshelfPart !== 'err'){
            userModel
                .putBookOnBookshelf(req.user._id,bookshelfPart,libriId)
                .then(
                    function (doc){
                        res.sendStatus(200);
                    }
                )
        } else{
            res.sendStatus(400);
        }
    } else{
        res.sendStatus(401);
    }

}

function validifyBookshelfPart(bookshelfPart){
    if (bookshelfPart === 'WANTTOREAD'){
        return 'wantToRead';
    } else if (bookshelfPart === 'READING'){
        return 'reading';
    } else if(bookshelfPart === 'HAVEREAD'){
        return 'haveRead';
    } else if (bookshelfPart === 'OUT'){
        return 'OUT';
    } else{
        return 'err';
    }
}

function logout(req,res){
    req.logout();
    res.sendStatus(200);
}

function getUserPublicProfile(req,res){
    var userId = req.params['userId'];
    userModel
        .populateUserInformation(userId)
        .then(
            function (user){
                // user.bookNumber = getUserBookNumber(user);
                // user.workNumber = user.authoredBooks.length;
                // var mostAdmiredWork = {rating: 0};
                // var totalRating = 0;
                // for (var work in user.authoredBooks){
                //     totalRating += user.authoredBooks[work].average_rating;
                //     if (user.authoredBooks[work].average_rating > mostAdmiredWork.rating){
                //         mostAdmiredWork = user.authoredBooks[work];
                //     }
                // }
                // user.mostAdmiredWork = mostAdmiredWork;
                // user.averageRating = user.workNumber === 0 ? 0 : totalRating/user.workNumber;
                res.json(user);
            }
        )
}



function toggleFollowingStatus(req,res){
    if (req.isAuthenticated()){
        var followingId = req.params['userId'];
        userModel
            .toggleFollowingStatus(req.user._id,followingId)
            .then(
                function (doc){
                    res.sendStatus(200);
                }
            );
    } else{
        res.sendStatus(401);
    }

}

function isUserFollowed(req,res){
    if (req.isAuthenticated()){
        var followingId = req.params['userId'];
        userModel
            .findUserById(req.user._id)
            .then(
                function (user){
                    res.json({value: user.following.indexOf(followingId) >-1});
                },function (err){
                    res.sendStatus(502);
                }
            );
    } else{
        res.sendStatus(401);
    }

}

function getUserPersonalProfile(req,res){
    if (req.isAuthenticated()){
        userModel
            .populateUserInformation(req.user._id)
            .then(
                function(user){
                    res.json(user);
                    // userModel
                    //     .findUserFollowers(user._id)
                    //     .then(
                    //         function (followers){
                    //             user.followers = followers;
                    //             for (var following in user.following){
                    //                 user.following[following].bookNumber = getUserBookNumber(user.following[following]);
                    //             }
                    //             for (var follower in user.followers){
                    //                 user.followers[follower].bookNumber = getUserBookNumber(user.followers[follower]);
                    //             }
                    //             res.json(user);
                    //         }
                    //     );
                }
            );
    } else{
        res.sendStatus(401);
    }

}

function getUserBookshelf(req,res){
    if (req.isAuthenticated()){
        userModel
            .populateUserInformation(req.user._id)
            .then(
                function (user){
                    var bookshelf = {
                        wantToRead: user.bookshelf.wantToRead,
                        reading: user.bookshelf.reading,
                        haveRead: user.bookshelf.haveRead
                    }
                    res.json(bookshelf);
                }
            );
    } else{
        res.sendStatus(401);
    }

}

function getUserNews(req,res){
    var userId = req.user._id;
}

function getAuthorWorks(req,res){
    if (req.isAuthenticated() && req.user.role === 'AUTHOR'){
        userModel
            .populateUserInformation(req.user._id)
            .then(
                function (user){
                    var works = user.authoredBooks;
                    res.json(works);
                }
            );
    } else{
        res.sendStatus(401);
    }
}

function claimBook(req,res){
    if (req.isAuthenticated() && req.user.role === 'AUTHOR'){
        var libriId = req.params['libriId'];
        userModel
            .claimBook(req.user._id,libriId)
            .then(
                function (doc){
                    res.sendStatus(200);
                }
            );
    } else{
        res.sendStatus(401);
    }
}

function getUserFollowers(req,res){
    if (req.isAuthenticated()){
        userModel
            .findUserFollowers(req.user._id)
            .then(
                function (followers){
                    res.json(followers);
                }
            )
    } else {
        res.sendStatus(401);
    }
}

function updateProfile(req,res){
    var userId = req.params['userId'];
    var profile = req.body;
    if (req.isAuthenticated()) {
        if (req.user.role == 'ADMIN' || req.user._id == userId) {
            userModel
                .updateProfile(userId, profile)
                .then(
                    function (doc) {
                        res.sendStatus(200);
                    }
                )
        } else{
            res.sendStatus(401);
        }
    } else{
        res.sendStatus(401);
    }
}

function getWantToReadNumber(req,res){
    var libriId = req.params['libriId'];
    userModel
        .getWantToReadNumber(libriId)
        .then(
            function  (count){
                res.json({count: count});
            },function (err){
                res.sendStatus(502);
            }
        )
}

function getReadingNumber(req,res){
    var libriId = req.params['libriId'];
    userModel
        .getReadingNumber(libriId)
        .then(
            function  (count){
                res.json({count: count});
            },function (err){
                res.sendStatus(502);
            }
        )
}

function getHaveReadNumber(req,res){
    var libriId = req.params['libriId'];
    userModel
        .getHaveReadNumber(libriId)
        .then(
            function (count){
                res.json({count: count});
            },function (err){
                res.sendStatus(502);
            }
        );
}

function isAdmin(req,res,next){
    if (req.isAuthenticated() && req.user.role == 'ADMIN'){
        next()
    } else{
        res.sendStatus(401);
    }
}

function findUserById(req,res){
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(
            function (user){

                res.json(user);
            }
        )
}

function deleteUser(req,res){
    var userId = req.params['userId'];
    userModel
        .deleteUser(userId)
        .then(
            function (doc){
                res.sendStatus(200);
            }
        )
}

function updateUser(req,res){
    var userId = req.params['userId'];
    var user = req.body;
    delete user._id;
    delete user.username;
    delete user.password;
    userModel
        .updateUser(userId,user)
        .then(
            function (doc){
                res.sendStatus(200);
            }
        )
}

function findAllUser(req,res){
    userModel
        .findAllUser()
        .then(
            function (users){
                res.json(users);
            }
        )
}

function createUser(req,res){
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(
            function (user){
                res.json(user);
            }
        )
}

function getPopUsers(req,res){
    var dummyPopUsers = ["Alice","Bob","Charlie","Dan","Eve","Frank","Grace","Heidi","Judy","Oscar"];
    res.json(randomPicker(dummyPopUsers,5));

}

// That num is less than the length of the array is presumed
function randomPicker(array,num){
    return shuffleArray(array).slice(0,num);
}

function shuffleArray(array){
    var l = array.length;
    if (l <= 1){
        return array;
    }
    var a = shuffleArray(array.slice(0,l-1));
    var pos = Math.floor(Math.random()*a.length);
    a.splice(pos,0,array[l-1]);
    return a;
}