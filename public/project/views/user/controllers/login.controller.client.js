(function (){
    angular
        .module('Libri')
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
                var user = response.data;
                if (user.role == 'ADMIN'){
                    $location.url('/admin');
                } else{
                    $location.url("/personal-page");
                }

            }

            function setErrorMessage(response){
                model.error = 'username/password combination not found';
            }
        }
    }
})();