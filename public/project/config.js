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
           });
   }
})();