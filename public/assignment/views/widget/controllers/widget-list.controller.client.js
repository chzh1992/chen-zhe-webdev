(function (){
    angular
        .module('WebAppMaker')
        .controller('WidgetListController',WidgetListController);

    function WidgetListController($routeParams,WidgetService,$sce){
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        function init(){
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        model.getWidgetUrlForType = getWidgetUrlForType;

        function getWidgetUrlForType(type){
            return "views/widget/templates/widget-" + type.toLowerCase()+".view.client.html";
        }

        model.getYoutubeEmbedUrl = getYoutubeEmbedUrl;

        function getYoutubeEmbedUrl(youtubeLink){
            var embedUrl = "https://www.youtube.com/embed/";
            var youtubeLinkParts = youtubeLink.split("/");
            var id = youtubeLinkParts[youtubeLinkParts.length-1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        model.trustThisContent = trustThisContent;

        function trustThisContent(html){
            return $sce.trustAsHtml(html);
        }
    }
})();