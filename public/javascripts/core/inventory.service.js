(function () {
    'use strict'
    
    angular
        .module('fantazaar.core')
        .factory('inventoryService', inventoryService);
        
    /*@ngInject*/
    function inventoryService() {
        var service = {
            getCurrentPlayerInventory: getCurrentPlayerInventory
        };
        
        return service; 
        
        function getCurrentPlayerInventory() {
            return {};
        }
    }
    
})();