(function () {
    'use strict';

    angular
        .module('fantazaar.core')
        .controller('ItemsController', ItemsController);

    /*@ngInject*/
    function ItemsController(itemsService) {
        var vm = this;

        vm.items = {};      //use item.id as the key, and item as the value
        vm.modifyItemOwnedCount = modifyItemOwnedCount;
        vm.modifyItemSoldCount = modifyItemSoldCount;
        vm.incrementItemOwnedCount = incrementItemOwnedCount;
        vm.transferCountFromOwnedToSold = transferCountFromOwnedToSold;

        initialize();
        function initialize() {
            vm.items = itemsService.getItems();
        }

        function modifyItemOwnedCount(item, countModifier) {
            if (!item._id || !vm.items.hasOwnProperty(item._id + "")) {
                //do some kind of error handling
                return;
            }

            var modifiedItem = vm.items[item];
            modifiedItem.numberOwned += countModifier;
        }

        function modifyItemSoldCount(item, countModifier) {
            if (!item._id || !vm.items.hasOwnProperty(item._id + "")) {
                //do some kind of error handling
                return;
            }

            var modifiedItem = vm.items[item];
            modifiedItem.numberSold += countModifier;
        }

        function incrementItemOwnedCount(item) {
            editItemOwnedCount(item, 1);
        }

        function transferCountFromOwnedToSold(item, countTransferred) {
            editItemOwnedCount(item, countTransferred * -1);
            editItemSoldCount(item, countTransferred);
        }
    }
})();