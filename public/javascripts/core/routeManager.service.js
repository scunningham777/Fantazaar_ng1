(function () {
    'use strict';

    angular
        .module('fantazaar.core')
        .provider('routeManagerConfig', routeManagerConfig);

    /*@ngInject*/
    //to provide runtime access to $stateProvider
    function routeManagerConfig($stateProvider) {
        /* jshint validthis:true */
        this.$get = function() {
            return {
                configureRoutes: configureRoutes
            };
        };

        function configureRoutes(routes) {
            routes.forEach(function(route) {
                $stateProvider.state(route.stateName, route.config);
            });
        }
    }
})();
