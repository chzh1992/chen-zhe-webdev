(function (){
    angular
        .module('Libri')
        .controller('RegisterController',RegisterController);

    function RegisterController($location,UserService){
        var model = this;
        model.register = register;

        function register(){
            if (model.form.username.$error.required ||
                model.form.password.$error.required ||
                model.form.verifyPassword.$error.required){
                model.error = "Required field(s) empty"
                return;
            }

            if (model.user.password != model.user.verifyPassword){
                model.error = "Passwords don't match!";
                model.passwordsMismatch = true;
                return;
            }

            model.user.role = model.user.role.toUpperCase();

            UserService
                .isUsernameAvailable(model.user.username)
                .then(registerUser,setErrorMessage);

            function registerUser(response) {
                UserService
                    .register(model.user)
                    .then(function (response) {
                        $location.url("/personal-page");
                    });
            }
            function setErrorMessage(response){
                model.error = "Username " + model.user.username + " not available";
            }
        }
    }
})();