(function () {
    angular
        .module('Libri')
        .controller('PersonalPageController',PersonalPageController);

    function PersonalPageController(CurrentUser,UserService,$location){
        var model = this;

        model.logout = logout;

        function init(){
            model.user = CurrentUser;
            UserService
                .getUserFollowers(model.user._id)
                .then(
                    function (response){
                        model.user.followers = response.data;
                    }
                );
        }
        init();

        function logout(){
            UserService
                .logout()
                .then(
                    function (response){
                        $location.url('/');
                    }
                )
        }
    }
})();