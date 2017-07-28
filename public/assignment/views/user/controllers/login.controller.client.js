(function (){
    angular
        .module('WebAppMaker')
        .controller('LoginController',LoginController);

    function LoginController($location,UserService){
        var model = this;
        model.login = login;

        function login(){
            if (model.form.username.$error.required ||
                model.form.password.$error.required) {
                model.error = "Required field(s) empty";
                return;
            }
            UserService
                .login(model.user)
                .then(loginUser,setErrorMessage);

            function loginUser(response){
                $location.url("/profile");
            }

            function setErrorMessage(response){
                model.error = 'username/password combination not found';
            }
        }
    }
})();