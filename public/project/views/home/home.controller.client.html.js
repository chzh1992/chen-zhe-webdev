(function (){
    angular
        .module('Libri')
        .controller('HomeController',HomeController);

    function HomeController(){
        var model = this;
        model.getSearchText = getSearchText;
        model.logout = logout;

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

        function logout(){
            UserService
                .logout()
                .then(
                    function (response){
                        $location.url('/');
                    }
                );
        }

    }
})();