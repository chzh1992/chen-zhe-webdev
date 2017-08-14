(function (){
    angular
        .module('Libri')
        .controller('PersonalPageWorksController',PersonalPageWorksController);

    function PersonalPageWorksController(UserService,ReviewService,$location,$sce,CurrentUser){
        var model = this;

        model.getSearchText = getSearchText;
        model.logout = logout;
        model.trustThisContent = trustThisContent;
        model.getWantToReadNumber = getWantToReadNumber;
        model.getReadingNumber = getReadingNumber;
        model.getHaveReadNumber = getHaveReadNumber;
        model.getBookReviewNumber = getBookReviewNumber;

        function init(){
            UserService
                .getAuthorWorks()
                .then(
                    function (response){
                        model.user = {works: response.data};
                        model.user.role = CurrentUser.role;
                        model.user.workStatistics = [];
                        for (var work in model.user.works){
                            model.user.workStatistics.push({
                                wantToRead: 0,
                                reading: 0,
                                haveRead: 0,
                                reviewNumber: 0
                            });
                            getWantToReadNumber(work);
                            getReadingNumber(work);
                            getHaveReadNumber(work);
                            getBookReviewNumber(work);
                        }
                    }
                )

        }
        init();

        function logout(){
            UserService
                .logout()
                .then(
                    function (response){
                        $location.url('/');
                    }
                );
        }

        function getSearchText(){
            if (model.searchText){
                return model.searchText.replace(/\s/g,'+');
            }
        }

        function trustThisContent(html){
            return $sce.trustAsHtml(html);
        }

        function getWantToReadNumber(work){
            var libriId = model.user.works[work]._id;
            UserService
                .getWantToReadNumber(libriId)
                .then(
                    function (response){
                        model.user.workStatistics[work].wantToRead = response.data.count;
                    }
                )
        }

        function getReadingNumber(work){
            var libriId = model.user.works[work]._id;
            UserService
                .getReadingNumber(libriId)
                .then(
                    function (response){
                        model.user.workStatistics[work].reading = response.data.count;
                    }
                )
        }

        function getHaveReadNumber(work){
            var libriId = model.user.works[work]._id;
            UserService
                .getHaveReadNumber(libriId)
                .then(
                    function (response){
                        model.user.workStatistics[work].haveRead = response.data.count;
                    }
                )
        }

        function getBookReviewNumber(work){
            var libriId = model.user.works[work]._id;
            ReviewService
                .getBookReviewNumber(libriId)
                .then(
                    function (response){
                        model.user.workStatistics[work].reviewNumber = response.data.count;
                    }
                )
        }

    }

})();