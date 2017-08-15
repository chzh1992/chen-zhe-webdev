(function (){
    angular
        .module('Libri')
        .controller('AdminReviewController',AdminReviewController);

    function AdminReviewController(Admin,UserService,$location,ReviewService){
        var model = this;

        model.user = Admin;

        model.logout = logout;
        model.search = search;
        model.findAllReviews = findAllReviews;

        function search(){
            ReviewService
                .findReviewById(model.searchText)
                .then(
                    function (response){
                        model.reviews = [response.data];
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

        function findAllReviews(){
            ReviewService
                .findAllReviews()
                .then(
                    function (response){
                        model.reviews = response.data;
                    }
                )
        }

    }
})();