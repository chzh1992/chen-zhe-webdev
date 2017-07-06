(function (){
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController',FlickrImageSearchController);

    function FlickrImageSearchController($location,$routeParams,WidgetService,FlickrService){

        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init(){
            WidgetService
                .findWidgetById(model.widgetId)
                .then(function (response){
                    model.widget = response.data;
                })
        }
        init();

        function searchPhotos(){
            FlickrService
                .searchPhotos(model.searchText)
                .then(function (response){
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            model.widget.url = url;
            WidgetService
                .updateWidget(model.widgetId,model.widget)
                .then(function(response){
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" +
                        model.pageId + "/widget/"+ model.widgetId);
                });
        }
    }
})();