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
                .then(loginUser,setErrorMessage);

            function loginUser(response){
                var user = response.data;
                $location.url("/user/"+user._id);
            }

            function setErrorMessage(response){
                model.message = "User " + model.user.username + " not found";
            }
        }
    }
})();