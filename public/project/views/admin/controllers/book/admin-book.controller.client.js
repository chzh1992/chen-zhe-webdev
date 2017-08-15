(function (){
    angular
        .module('Libri')
        .controller('AdminBookController',AdminBookController);

    function AdminBookController(Admin,UserService,$location,BookService){
        var model = this;

        model.user = Admin;

        model.logout = logout;
        model.search = search;
        model.findAllBooks = findAllBooks;


        function search(){
            BookService
                .findBookById(model.searchText)
                .then(
                    function (response){
                        model.books = [response.data];
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

        function findAllBooks(){
            BookService
                .findAllBooks()
                .then(
                    function (response){
                        model.books = response.data;
                    }
                );
        }

    }
})();