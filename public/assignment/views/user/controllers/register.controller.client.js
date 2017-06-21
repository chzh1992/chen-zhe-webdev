(function (){
    angular
        .module('WebAppMaker')
        .controller('RegisterController',RegisterController);

    function RegisterController($location,UserService){
        var model = this;
        model.register = register;

        function register(){
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