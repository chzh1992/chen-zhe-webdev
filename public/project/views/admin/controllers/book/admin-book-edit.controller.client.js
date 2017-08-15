(function (){
    angular
        .module('Libri')
        .controller('AdminBookEditController',AdminBookEditController);

    function AdminBookEditController(Admin,UserService,BookService,$location,$routeParams){
        var model = this;
        var libriId = $routeParams['libriId'];
        model.user = Admin;

        model.logout = logout;
        model.updateBook = updateBook;
        model.deleteBook = deleteBook;

        function init(){
            BookService
                .findBookById(libriId)
                .then(
                    function (response){
                        model.book = response.data;
                    }
                )
        }
        init();

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
            if (model.form.title.$error.required ||
                model.form.author.$error.required ||
                model.form.publisher.$error.required) {
                model.error = "Required field(s) empty!";
            } else{
                BookService
                    .updateBook(model.book._id,model.book)
                    .then(
                        function (response){
                            model.message = "Successfully updated!";
                        }
                    );
            }
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