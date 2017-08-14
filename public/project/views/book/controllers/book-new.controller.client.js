(function (){
    angular
        .module('Libri')
        .controller('BookNewController',BookNewController);

    function BookNewController(BookService,$location){
        var model = this;

        model.createBook = createBook;

        function createBook(){
            if (model.form.title.$error.required ||
                model.form.author.$error.required ||
                model.form.publisher.$error.required){
                model.error = "Required field(s) empty!";
            } else{
                BookService
                    .createBook(model.book)
                    .then(
                        function (response){
                            $location.url('/book/libriId=' + response.data._id);
                        }
                    )
            }
        }
    }
})();