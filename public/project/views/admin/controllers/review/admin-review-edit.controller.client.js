(function (){
    angular
        .module('Libri')
        .controller('AdminReviewEditController',AdminReviewEditController);

    function AdminReviewEditController(Admin,UserService,$location,ReviewService,$routeParams){
        var model = this;
        var reviewId = $routeParams['reviewId'];

        model.user = Admin;

        model.logout = logout;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;

        function init(){
            ReviewService
                .findReviewById(reviewId)
                .then(
                    function (response){
                        model.review = response.data;
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

        function updateReview(){
            if (model.form.reviewerId.$error.required ||
                model.form.reviewerName.$error.required ||
                model.form.onBook.$error.required) {
                model.error = "Required field(s) empty!";
            } else{
                ReviewService
                    .updateReview(model.review._id,model.review)
                    .then(
                        function (response){
                            model.message = "Successfully updated!";
                        }
                    );
            }
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