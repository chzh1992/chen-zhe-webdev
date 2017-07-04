(function (){
    angular
        .module('WebAppMaker')
        .controller('ProfileController',ProfileController);

    function ProfileController($location,$routeParams, UserService){
        var model = this;
        model.userId = $routeParams["uid"];
        model.updateProfile = updateProfile;

        function init() {
            UserService
                .findUserById(model.userId)
                .then(function (response){
                    model.user = response.data;
                });
        }
        init();

        function updateProfile(){
            UserService
                .updateUser(model.userId,model.user)
                .then(function (response){
                    model.message = "Profile successfully updated!"
                });
        }
    }
})();