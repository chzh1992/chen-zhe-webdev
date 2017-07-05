(function (){
    angular
        .module('WebAppMaker')
        .controller('RegisterController',RegisterController);

    function RegisterController($location,UserService){
        var model = this;
        model.register = register;

        function register(){
            if (typeof(model.user) == "undefined" ||
                model.user.username == null ||
                model.user.password == null ||
                model.verifyPassword == null){
                model.message = "All blanks must be filled";
                return null;
            }
            if (model.user.password != model.verifyPassword){
                model.message = "Passwords must match";
                return null;
            }

            UserService
                .findUserByUsername(model.user.username)
                .then(setErrorMessage,registerUser);

            function registerUser(response) {
                UserService
                    .createUser(model.user)
                    .then(function (response) {
                        var userId = response.data._id;
                        $location.url("/user/" + userId);
                    });
            }
            function setErrorMessage(response){
                model.message = "Username " + model.user.username + " not available";
            }
        }
    }
})();