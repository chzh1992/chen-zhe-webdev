(function (){
    angular
        .module('WebAppMaker')
        .controller('ProfileController',ProfileController);

    function ProfileController($location,$routeParams, UserService){
        var model = this;
        model.userId = $routeParams["uid"];
        function init() {
            var user = UserService.findUserById(model.userId);
            model.user = user;
        }
        init();

        model.updateProfile = updateProfile;

        function updateProfile(){
            UserService.updateUser(model.userId,model.user);
            $location.url("/user/" + model.userId);
        }
    }
})();