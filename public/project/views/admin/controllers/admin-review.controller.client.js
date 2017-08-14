(function (){
    angular
        .module('Libri')
        .controller('AdminReviewController',AdminReviewController);

    function AdminReviewController(Admin,UserService,$location,ReviewService){
        var model = this;

        model.user = Admin;

        model.logout = logout;
        model.search = search;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;

        function search(){
            ReviewService
                .findReviewById(model.searchText)
                .then(
                    function (response){
                        model.review = response.data;
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

        function updateReview(){
            ReviewService
                .updateReview(model.review._id,model.review)
                .then(
                    function (response){
                        model.message = "Successfully updated!";
                    }
                )
        }

        function deleteReview(){
            ReviewService
                .deleteReview(model.review._id)
                .then(
                    function (response) {
                        $location.url('/admin');
                    }
                )
        }
    }
})();