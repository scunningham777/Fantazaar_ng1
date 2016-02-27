(function () {
    'use strict';

    angular
        .module('fantazaar.core')
        .factory('itemsService', itemsService);

    /*@ngInject*/
    function itemsService() {
        var service = {
            getItems: getItems
        };

        return service;

        function getItems() {

        }
    }

})();