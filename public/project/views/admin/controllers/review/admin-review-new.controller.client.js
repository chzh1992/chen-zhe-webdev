(function (){
    angular
        .module('Libri')
        .controller('AdminReviewNewController',AdminReviewNewController);

    function AdminReviewNewController(Admin,UserService,$location,ReviewService){
        var model = this;
        model.user = Admin;

        model.logout = logout;
        model.createReview = createReview;

        function logout(){
            UserService
                .logout()
                .then(
                    function (resonse){
                        $location.url('/');
                    }
                )
        }

        function createReview(){
            if (model.form.reviewerId.$error.required ||
                model.form.reviewerName.$error.required ||
                model.form.onBook.$error.required) {
                model.error = "Required field(s) empty!";
            }else{
                ReviewService
                    .createReview(model.review)
                    .then(
                        function (response){
                            $location.url("/admin/review/" + response.data._id);
                        }
                    )
            }

        }

    }
})();