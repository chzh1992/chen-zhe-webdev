(function (){
    angular
        .module('Libri')
        .config(Config);

    function Config($routeProvider){
        $routeProvider
            .otherwise({
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when('/search/text=:searchText',{
                templateUrl: "views/book/templates/search-results.view.client.html",
                controller: "SearchResultController",
                controllerAs: "model"
            })
            .when('/book/goodreadsId=:goodreadsId',{
                templateUrl: "views/book/templates/book-details.view.client.html",
                controller: "BookDetailsController",
                controllerAs: "model"
            })
            .when('/book/libriId=:libriId',{
                templateUrl: "views/book/templates/book-details.view.client.html",
                controller: "BookDetailsController",
                controllerAs: "model"
            })
            .when('/login',{
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when('/register',{
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when('/personal-page',{
                templateUrl: "views/user/templates/personal-page/personal-page-profile.view.client.html",
                controller: "PersonalPageProfileController",
                controllerAs: "model",
                resolve: {
                    CurrentUser: getCurrentUser
                }
            })
            .when('/personal-page/bookshelf',{
                templateUrl: "views/user/templates/personal-page/personal-page-bookshelf.view.client.html",
                controller: "PersonalPageBookshelfController",
                controllerAs: "model",
                resolve: {
                    CurrentUser: getCurrentUser
                }
            })
            .when('/personal-page/news',{
                templateUrl: "views/user/templates/personal-page/personal-page-news.view.client.html",
                controller: "PersonalPageNewsController",
                controllerAs: "model",
                resolve: {
                    CurrentUser: getCurrentUser
                }
            })
            .when('/personal-page/works',{
                templateUrl: "views/user/templates/personal-page/personal-page-works.view.client.html",
                controller: "PersonalPageWorksController",
                controllerAs: "model",
                resolve: {
                    CurrentUser: getCurrentUser
                }
            })
            .when('/profile/:userId',{
                templateUrl: "views/user/templates/public-profile.view.client.html",
                controller: "PublicProfileController",
                controllerAs: "model"
            });
    }

    function getCurrentUser($q,$location,UserService){
        var deferred = $q.defer();
        UserService
            .populateUserInformation()
            .then(
                function (response){
                    var user = response.data;
                    deferred.resolve(user);
                },function (err){
                    deferred.reject();
                    $location.url('/login');
                }
            );
        return deferred.promise;
    }
})();