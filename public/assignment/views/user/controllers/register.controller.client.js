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
            if (UserService.findUserByUsername(model.user.username)){
                model.message = "Username " + model.user.username + " not available";
                return null;
            }
            if (model.user.password != model.verifyPassword){
                model.message = "Passwords must match"
                return null;
            }
            model.user._id = Date.now();
            UserService.createUser(model.user);
            $location.url("/user/"+model.user._id);
        }
    }
})();