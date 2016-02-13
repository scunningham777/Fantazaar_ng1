(function () {
    'use strict';

    angular
        .module('fantazaar.core')
        .config(configURLRouterProvider);

    /*@ngInject*/
    function configURLRouterProvider($urlRouterProvider) {
        $urlRouterProvider.otherwise('/items');
    }

})();