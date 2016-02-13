(function () {
    'use strict';

    angular
        .module('fantazaar.core')
        .run(routeConfig);

    /*@ngInject*/
    function routeConfig(routeManagerConfig) {
        routeManagerConfig.configureRoutes(getRoutes());

        function getRoutes() {
            var moduleRoutes = [
                {
                    stateName: 'items',
                    config: {
                        url: '/items',
                        views: {
                            '': {
                                templateUrl: 'views/items.html',
                                controller: 'ItemsController',
                                controllerAs: 'vm'
                            }
                        }
                    }
                },

                {
                    stateName: 'itemDetails',
                    config: {
                        url: '/items/:id',
                        views: {
                            '': {
                                templateUrl: 'views/itemDetails.html',
                                controller: 'ItemDetailsController',
                                controllerAs: 'vm'
                            }
                        }
                    }
                }
            ];
            return moduleRoutes;
        }
    }
})();