(function() {
    'use strict';
    
    angular
        .module('fantazaar.core')
        .controller('ItemDetailsController', ItemDetailsController);

    /*@ngInject*/
    function ItemDetailsController(itemsService, $stateParams) {
        var vm = this;

        vm.curItem;
        vm.getStringSources = getStringSources;
        vm.getBazaarSources = getBazaarSources;
        vm.doesCurItemHaveBazaarSources = doesCurItemHaveBazaarSources;
        vm.doesCurItemHaveStringSources = doesCurItemHaveStringSources;

        activate();

        function activate() {
            vm.curItem = itemsService.getItem($stateParams.itemName);
        }

        function doesCurItemHaveBazaarSources() {
            return vm.curItem.sources.some(Array.isArray);
        }

        function doesCurItemHaveStringSources() {
            return vm.curItem.sources.some(_isString);
        }

        function getBazaarSources() {
            return vm.curItem.sources.filter(Array.isArray)[0];
        }

        function getStringSources() {
            return vm.curItem.sources.filter(_isString);
        }

        function _isString(source) {
            return (typeof source === "string");
        }
    }
})();