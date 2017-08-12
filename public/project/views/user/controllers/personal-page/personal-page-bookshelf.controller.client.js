(function (){
    angular
        .module('Libri')
        .controller('PersonalPageBookshelfController',PersonalPageBookshelfController);

    function PersonalPageBookshelfController(){
        var model = this;

        model.getSearchText = getSearchText;
        model.logout = logout;

        function logout(){
            UserService
                .logout()
                .then(
                    function (response){
                        $location.url('/');
                    }
                );
        }

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

    }

})();