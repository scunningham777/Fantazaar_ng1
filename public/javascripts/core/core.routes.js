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
                    stateName: 'home.items',
                    config: {
                        url: 'items',
                        views: {
                            '': {
                                templateUrl: 'public/views/items.html',
                                controller: 'ItemsController',
                                controllerAs: 'vm'
                            }
                        }
                    }
                },

                {
                    stateName: 'home.itemDetails',
                    config: {
                        url: '/item/:id',
                        views: {
                            '': {
                                templateUrl: 'public/views/itemDetails.html',
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