(function () {
    angular
        .module('Libri')
        .controller('PersonalPageController',PersonalPageController);

    function PersonalPageController(CurrentUser,BookService,UserService){
        var model = this;

        function init(){
            model.user = CurrentUser;
            model.user.associatedBooks = getAssociatedBooks(model.user);
            model.user.associatedUsers = getAssociatedUsers(model.user);
        }
        init();

        function getAssociatedBooks(user){
            return BookService
                .findAssociatedBooksByUser(user._id)
                .then(
                    function (response){
                        var books = response.data;
                        return books;
                    }
                );
        }

        function getAssociatedUsers(user){
            return UserService
                .findAssociatedUsersByUser(user._id)
                .then(
                    function (response){
                        var users = response.data;
                        return users;
                    }
                );
        }
    }
})();