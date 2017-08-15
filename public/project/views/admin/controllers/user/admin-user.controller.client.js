(function (){
    angular
        .module('Libri')
        .controller('AdminUserController',AdminUserController);

    function AdminUserController(Admin,UserService,$location){
        var model = this;

        model.user = Admin;

        model.logout = logout;
        model.search = search;
        model.getAllUser = getAllUser;


        function search(){
            UserService
                .findUserById(model.searchText)
                .then(
                    function (response){
                        model.userFound = [response.data];
                    }
                );
        }

        function logout(){
            UserService
                .logout()
                .then(
                    function (resonse){
                        $location.url('/');
                    }
                )
        }

        function getAllUser(){
            UserService
                .findAllUser()
                .then(
                    function (response){
                        model.userFound = response.data;
                    }
                )
        }
    }
})();