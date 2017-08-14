(function (){
    angular
        .module('Libri')
        .controller('BookEditController',BookEditController);

    function BookEditController(BookService,$routeParams,$location){
        var model = this;
        var libriId = $routeParams['libriId'];

        model.updateBook = updateBook;

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

        function updateBook(){
            if (model.form.title.$error.required ||
                model.form.author.$error.required ||
                model.form.publisher.$error.required){
                model.error = "Required field(s) empty!";
            } else{
                BookService
                    .updateBook(model.book._id,model.book)
                    .then(
                        function (book){
                            $location.url('/book/libriId=' + libriId);
                        }
                    )
            }
        }
    }
})();