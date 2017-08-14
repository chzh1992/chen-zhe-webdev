(function (){
    angular
        .module('Libri')
        .controller('AdminUserController',AdminUserController);

    function AdminUserController(Admin,UserService,$location){
        var model = this;

        model.user = Admin;

        model.logout = logout;
        model.search = search;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function search(){
            UserService
                .findUserById(model.searchText)
                .then(
                    function (response){
                        model.userFound = response.data;
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

        function updateUser(){
            UserService
                .updateUser(model.userFound._id,model.userFound)
                .then(
                    function(response){
                        model.message = "Successfully updated!";
                    }
                )
        }

        function deleteUser(){
            UserService
                .deleteUser(model.userFound._id)
                .then(
                    function(response){
                        $location.url('/admin');
                    }
                )
        }
    }
})();