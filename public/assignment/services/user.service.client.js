(function (){
    angular
        .module('WebAppMaker')
        .factory('UserService',UserService);

    function UserService(){
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user){
            users.push(user);
        }

        function findUserById(userId){
            for (var user in users){
                if (users[user]._id == userId)
                    return users[user];
            }
            return null;
        }

        function findUserByUsername(username){
            for (var user in users){
                if (users[user].username == username)
                    return users[user];
            }
            return null;
        }

        function findUserByCredentials(username,password){
            for (var user in users){
                if (users[user].username == username && users[user].password == password)
                    return users[user];
            }
            return null;
        }

        function updateUser(userId,user){
            for (var i in users) {
                if (users[i].userId == userId){
                    users[i] = user;
                    break;
                }
            }
        }

        function deleteUser(userId){
            for (var user in users) {
                if (users[user].userId == userId){
                    users.splice(user,1);
                    break;
                }

            }
        }
    }
})();