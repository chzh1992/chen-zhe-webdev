var app = require('../../express');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var userModel = require('../models/user/user.model.sever');

app.post("/api/project/login",passport.authenticate('project'),login);
app.post("/api/project/register",register);
app.post("/api/project/logout",logout);

app.get("/api/project/isAvailable/:username",isUsernameAvailable);
app.get("/api/project/checkLoggedIn",checkLoggedIn);
app.put("/api/project/bookshelf/:bookshelfPart",putBookOnBookshelf);
app.get("/api/project/profile/:userId",getUserPublicProfile);
app.put("/api/project/following/:userId",following);
app.get("/api/project/followers/:userId",getUserFollowers);
app.get("/api/project/personal-page",populateUserInformation);


function checkLoggedIn(req,res){
    if (req.isAuthenticated()){
        res.json(req.user);
    } else {
        res.sendStatus(401);
    }
}

function populateUserInformation(req,res){
    if (req.isAuthenticated()){
        var userId = req.user._id;
        return userModel
            .populateUserInformation(userId)
            .then(
                function (user){
                    res.json(user);
                }
            );
    } else {
        res.sendStatus(401);
    }
}

function login(req,res){
    res.sendStatus(200);
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
        var user = req.user;
        var bookshelfPart = req.params['bookshelfPart'];
        var book = req.body;
        if (isBookshelfPartValid(bookshelfPart)){
            userModel
                .putBookOnBookshelf(user._id,bookshelfPart,book)
                .then(
                    function (doc){
                        res.sendStatus(200);
                    },function (err){
                        res.sendStatus(502);
                    }
                );
        } else{
            res.sendStatus(400);
        }
    } else{
        res.sendStatus(401);
    }
}

function isBookshelfPartValid(bookshelfPart){
    return bookshelfPart === 'wantToRead' || bookshelfPart === 'reading' || bookshelfPart === 'haveRead';
}

function logout(req,res){
    req.logout();
    res.sendStatus(200);
}

function getUserPublicProfile(req,res){
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(
            function (user){
                delete user.password;
                res.json(user);
            },
            function (err){
                res.sendStatus(502);
            }
        )
}

function following(req,res){
    var followingId = req.params['userId'];
    var status = req.body;
    if (userExists(followingId)){
        if (req.isAuthenticated()){
            userModel
                .following(req.user._id,followingId,status.value)
                .then(
                    function (doc){
                        res.sendStatus(200);
                    },function (err){
                        res.sendStatus(502);
                    }
                );
        } else{
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(400);
    }
}

function userExists(userId){
    return userModel
        .findUserById(userId)
        .then(
            function (user){
                return !user === null;
            }
        )
}

function getUserFollowers(req,res){
    var userId = req.params['userId'];
    userModel
        .findUserFollowers(userId)
        .then(
            function (followers){
                res.json(followers);
            }
        );
}