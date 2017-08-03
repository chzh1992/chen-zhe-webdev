var app = require('../../express');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var userModel = require('../models/user/user.model.sever');

app.post("/api/project/login",passport.authenticate('project'),login);
app.post("/api/project/register",register);
app.get("/api/project/isAvailable/:username",isUsernameAvailable);
app.get("/api/project/checkLoggedIn",checkLoggedIn);
app.get("/api/project/social-network/:userId",getAssociatedUsers);

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
                            res.json(user);
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

function getAssociatedUsers(req,res){
    var userId = req.params['userId'];
    userModel
        .findAssociatedUsersById(userId)
        .then(
            function (socialNetwork){
               res.json(socialNetwork);
            });
}