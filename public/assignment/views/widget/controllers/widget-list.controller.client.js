(function (){
    angular
        .module('WebAppMaker')
        .controller('WidgetListController',WidgetListController);

    function WidgetListController($routeParams,WidgetService,$sce){
        var model = this;

        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        model.getWidgetUrlForType = getWidgetUrlForType;
        model.getYoutubeEmbedUrl = getYoutubeEmbedUrl;
        model.trustThisContent = trustThisContent;

        function init(){
            model.widgets = WidgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function getWidgetUrlForType(type){
            return "views/widget/templates/widget-" + type.toLowerCase()+".view.client.html";
        }

        function getYoutubeEmbedUrl(youtubeLink){
            var embedUrl = "https://www.youtube.com/embed/";
            var youtubeLinkParts = youtubeLink.split("/");
            var id = youtubeLinkParts[youtubeLinkParts.length-1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trustThisContent(html){
            return $sce.trustAsHtml(html);
        }
    }
})();