(function (){
    angular
        .module('Libri')
        .controller('AdminBookNewController',AdminBookNewController);

    function AdminBookNewController(Admin,UserService,BookService,$location){
        var model = this;
        model.user = Admin;

        model.logout = logout;
        model.createBook = createBook;

        function logout(){
            UserService
                .logout()
                .then(
                    function (resonse){
                        $location.url('/');
                    }
                )
        }

        function createBook(){
            if (model.form.title.$error.required ||
                model.form.author.$error.required ||
                model.form.publisher.$error.required) {
                model.error = "Required field(s) empty!";
            } else{
                BookService
                    .createBook(model.book)
                    .then(
                        function (response){
                            $location.url('/admin/book/'+ response.data._id);
                        }
                    );
            }
        }
    }
})();