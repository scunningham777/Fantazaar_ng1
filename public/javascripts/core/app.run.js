(function () {
    'use strict';

    angular
        .module('fantazaar.core')
        .run(runBlock);

    /*@ngInject*/
    function runBlock(routeManagerService) {
        routeManagerService.handleLaunch();
        routeManagerService.initRouteWatching();
    }

})();