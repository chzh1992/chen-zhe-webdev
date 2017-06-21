(function (){
    angular
        .module('WebAppMaker')
        .controller('LoginController',LoginController);

    function LoginController($location,UserService){
        var model = this;
        model.login = login;

        function login(){
            var foundUser = UserService.findUserByCredentials(model.user.username,model.user.password);
            if (foundUser) {
                $location.url("/user/"+foundUser._id);
            } else {
                model.message = "User " + model.user.username + " not found";
            }
        }
    }
})();