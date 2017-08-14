(function (){
    angular
        .module('Libri')
        .controller('AdminHomeController',AdminHomeController);

    function AdminHomeController(Admin,UserService,$location){
        var model = this;

        model.user = Admin;

        model.logout = logout;

        function logout(){
            UserService
                .logout()
                .then(
                    function (resonse){
                        $location.url('/');
                    }
                )
        }
    }
})();