(function (){
    angular
        .module('Libri')
        .controller('HomeController',HomeController);

    function HomeController(UserService){
        var model = this;
        model.getSearchText = getSearchText;
        model.logout = logout;

        function init(){
            UserService
                .checkLoggedIn()
                .then(
                    function (response){
                        model.user = response.data;
                    }
                )
        }
        init();

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