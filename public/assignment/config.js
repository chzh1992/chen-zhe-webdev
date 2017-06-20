(function () {
    angular
        .module('WebAppMaker')
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
            // default route
            .when('/',{
                templateUrl:"home.html"
            })
            .otherwise({
                templateUrl:"home.html"
            })

            // route to user pages
            .when('/login',{
                templateUrl: "views/user/templates/login.view.client.html"
            })
            .when('/register',{
                templateUrl: "views/user/templates/register.view.client.html"
            })
            .when('/user/:uid',{
                templateUrl: "views/user/templates/profile.view.client.html"
            })

            // route to website pages
            .when('/user/:uid/website',{
                templateUrl:"views/website/templates/website-list.view.client.html"
            })
            .when('/user/:uid/website/new',{
                templateUrl:"views/website/templates/website-new.view.client.html"
            })
            .when('/user/:uid/website/:wid',{
                templateUrl:"views/website/templates/website-edit.view.client.html"
            })

            // route to page pages
            .when('/user/:uid/website/:wid/page',{
                templateUrl:"views/page/templates/page-list.view.client.html"
            })
            .when('/user/:uid/website/:wid/page/new',{
                templateUrl:"views/page/templates/page-new.view.client.html"
            })
            .when('/user/:uid/website/:wid/page/:pid',{
                templateUrl:"views/page/templates/page-edit.view.client.html"
            })

            // route to widget pages
            .when('/user/:uid/website/:wid/page/:pid/widget',{
                tempalteUrl:"views/widget/templates/widget-list.view.client.html"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new',{
                tempalteUrl:"views/widget/templates/widget-choose.view.client.html"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wid',{
                tempalteUrl:"views/widget/templates/widget-edit.view.client.html"
            })
    }
})();