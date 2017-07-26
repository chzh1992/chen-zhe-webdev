(function (){
    angular
        .module('WebAppMaker')
        .controller('LoginController',LoginController);

    function LoginController($location,UserService){
        var model = this;
        model.login = login;

        function login(){
            UserService
                .login(model.user)
                .then(loginUser,setErrorMessage);

            function loginUser(response){
                $location.url("/profile");
            }

            function setErrorMessage(response){
                model.message = "User " + model.user.username + " not found";
            }
        }
    }
})();