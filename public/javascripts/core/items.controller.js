(function () {
    'use strict';

    angular
        .module('fantazaar.core')
        .controller('ItemsController', ItemsController);

    /*@ngInject*/
    function ItemsController(itemsService, inventoryService, $window) {
        var vm = this;

        vm.inventory = {};      //use item.name as the key, and then an object with # owned and # sold as the value
        vm.items = {};      //use item.name as the key, and item as the value
        vm.incrementItemOwnedCount = incrementItemOwnedCount;
        vm.modifyItemOwnedCount = modifyItemOwnedCount;
        vm.modifyItemSoldCount = modifyItemSoldCount;
        vm.showItemDetails = showItemDetails;
        vm.transferCountFromOwnedToSold = transferCountFromOwnedToSold;

        activate();
        
        function activate() {
            vm.items = itemsService.getItems();
            vm.inventory = inventoryService.getCurrentPlayerInventory();
        }

        function incrementItemOwnedCount(item) {
            modifyItemOwnedCount(item, 1);
        }

        function modifyItemOwnedCount(item, countModifier) {
            if (!_isValidItem(item)) {
                //do some kind of error handling
                return;
            }

            if (!vm.inventory.hasOwnProperty(item.name)) {
                _initAndAddInventoryItem(item.name);
            } 
            
            var inventoryItem = vm.inventory[item.name];
            inventoryItem.numberOwned += countModifier;
            
            _persistInventoryUpdates();
        }

        function modifyItemSoldCount(item, countModifier) {
            if (!_isValidItem(item)) {
                //do some kind of error handling
                return;
            }

            if (!vm.inventory.hasOwnProperty(item.name)) {
                _initAndAddInventoryItem(item.name);
            } 

            var inventoryItem = vm.inventory[item.name];
            inventoryItem.numberSold += countModifier;
            
            _persistInventoryUpdates();
        }
        
        function showItemDetails(itemName) {
            if (vm.items.hasOwnProperty(itemName)) {
                var sourcesString = vm.items[itemName].sources.join("; ");
                $window.alert("This item can be procured from the following sources: " + sourcesString);
            }
        }

        function transferCountFromOwnedToSold(item, countTransferred) {
            if (!_isValidItem(item)) {
                return;
            }
            
            if (vm.inventory[item.name].numberOwned < countTransferred) {
                countTransferred = vm.inventory[item.name].numberOwned;
            }
            modifyItemOwnedCount(item, countTransferred * -1);
            modifyItemSoldCount(item, countTransferred);
        }
        
        function _initAndAddInventoryItem(itemName) {
            vm.inventory[itemName] = {
                    'numberOwned': 0,
                    'numberSold': 0
                };
        }

        function _isValidItem(item) {
            return (item.name && vm.items.hasOwnProperty(item.name + ""));
        }
        
        function _persistInventoryUpdates() {
            return;
        }
    }
})();