(function (){
    angular
        .module('Libri')
        .controller('AdminBookController',AdminBookController);

    function AdminBookController(Admin,UserService,$location,BookService){
        var model = this;

        model.user = Admin;

        model.logout = logout;
        model.search = search;
        model.updateBook = updateBook;
        model.deleteBook = deleteBook;

        function search(){
            BookService
                .findBookById(model.searchText)
                .then(
                    function (response){
                        model.book = response.data;
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

        function updateBook(){
            BookService
                .updateBook(model.book._id,model.book)
                .then(
                    function (response){
                        model.message = "Successfully updated!";
                    }
                );
        }

        function deleteBook(){
            BookService
                .deleteBook(model.book._id)
                .then(
                    function (response){
                        $location.url('/admin');
                    }
                )
        }
    }
})();