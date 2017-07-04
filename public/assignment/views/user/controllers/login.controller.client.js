(function (){
    angular
        .module('WebAppMaker')
        .controller('LoginController',LoginController);

    function LoginController($location,UserService){
        var model = this;
        model.login = login;

        function login(){
            UserService
                .findUserByCredentials(model.user.username,model.user.password)
                .then(successfulLogin,failedLogin);

            function successfulLogin(response){
                var user = response.data;
                $location.url("/user/"+user._id);
            }

            function failedLogin(response){
                model.message = "User " + model.user.username + " not found";
            }
        }
    }
})();