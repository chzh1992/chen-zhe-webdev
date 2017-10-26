(function (){
    angular
        .module('Libri')
        .controller('HomeController',HomeController);

    function HomeController(UserService,BookService,GoodreadsService){
        var model = this;
        model.getSearchText = getSearchText;
        model.logout = logout;

        function init(){
            checkLoggedIn();
            getPopUsers();
            getPopBooks();
            getNewBooks();
            getQuote();
        }
        init();

        function checkLoggedIn(){
            UserService
                .checkLoggedIn()
                .then(
                    function (response){
                        model.user = response.data;
                    }
                );
        }

        function getPopUsers(){
            UserService
                .getPopUsers()
                .then(
                    function (response){
                        model.popUsers = response.data;
                    }
                );
        }

        function getPopBooks(){
            BookService
                .getPopBooks()
                .then(
                    function (response){
                        model.popBooks = response.data;
                    }
                );
        }

        function getNewBooks(){
            BookService
                .getNewBooks()
                .then(
                    function (response){
                        model.newBooks = response.data;
                    }
                );
        }

        function getQuote(){
            BookService
                .getQuote()
                .then(
                    function (response){
                        model.quote = response.data;
                    }
                );
        }

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