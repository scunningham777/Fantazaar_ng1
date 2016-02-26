(function () {
    'use strict';

    angular
        .module('fantazaar.core')
        .controller('ItemsController', ItemsController);

    /*@ngInject*/
    function ItemsController() {
        var vm = this;

        vm.items = {};      //use item.id as the key, and item as the value
        vm.modifyItemOwnedCount = modifyItemOwnedCount;
        vm.modifyItemSoldCount = modifyItemSoldCount;
        vm.incrementItemOwnedCount = incrementItemOwnedCount;
        vm.transferCountFromOwnedToSold = transferCountFromOwnedToSold;


        function modifyItemOwnedCount(item, newItemOwnedCount) {
            if (!vm.items.hasOwnProperty(item._id + "")) {
                return;
            }
        }

        function modifyItemSoldCount(item, newItemSoldCount) {

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