(function (){
    angular
        .module('WebAppMaker')
        .controller('ProfileController',ProfileController);

    function ProfileController($location,$routeParams, UserService,currentUser){
        var model = this;
        model.userId = currentUser._id;
        model.updateProfile = updateProfile;
        model.logout = logout;

        function init() {
            // UserService
            //     .findUserById(model.userId)
            //     .then(function (response){
            //         model.user = response.data;
            //     });
            model.user = currentUser;
        }
        init();

        function updateProfile(){
            UserService
                .updateUser(model.userId,model.user)
                .then(function (response){
                    model.message = "Profile successfully updated!";
                });
        }

        function logout(){
            UserService
                .logout()
                .then(function (response){
                    $location.url('/');
                });
        }
    }
})();