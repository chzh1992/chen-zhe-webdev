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
               templateUrl: "views/user/templates/personal-page.view.client.html",
               controller: "PersonalPageController",
               controllerAs: "model",
               resolve: {
                   CurrentUser: getCurrentUser
               }
           });
   }

   function getCurrentUser($q,$location,UserService){
       var deferred = $q.defer();
       UserService
           .checkLoggedIn()
           .then(
               function (response){
                   var currentUser = response.data;
                   deferred.resolve(currentUser);
               },function (err){
                   deferred.reject();
                   $location.url('/login');
               });
       return deferred.promise;
   }
})();