var app = require('../../express');

app.post('/api/user',createUser);
app.get('/api/username',findUserByUsername);
app.get('/api/user',findUserByCredentials);
app.get('/api/user/:userId',findUserById);
app.put('/api/user/:userId',updateUser);
app.delete('/api/user/:userId',deleteUser);

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

function createUser(req,res) {
    var user = req.body;
    user._id = Date.now();
    users.push(user);
    res.json(user);
}

function findUserById(req,res) {
    var userId = req.params['userId'];
    for (var user in users) {
        if (users[user]._id == userId){
            res.json(users[user]);
            return;
        }
    }
    res.sendStatus(404);
}

function findUserByUsername(req,res) {
    var username = req.query['username'];
    for (var user in users) {
        if (users[user].username == username){
            res.json(users[user]);
            return;
        }
    }
    res.sendStatus(404);
}

function findUserByCredentials(req,res) {
    var username = req.query['username'];
    var password = req.query['password'];
    for (var user in users) {
        if (users[user].username == username && users[user].password == password){
            res.json(users[user]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateUser(req,res) {
    var userId = req.params['userId'];
    var user = req.body;
    for (var i in users) {
        if (users[i]._id == userId) {
            users[i] = user;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req,res) {
    var userId = req.params['userId'];
    for (var user in users) {
        if (users[user]._id == userId) {
            users.splice(user, 1);
            break;
        }
    }
    res.sendStatus(200);
}