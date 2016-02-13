(function () {
    'use strict';

    angular
        .module('fantazaar.core')
        .controller('ItemsController', ItemsController);

    /*@ngInject*/
    function ItemsController($state) {
        var vm = this;

        vm.items = [];
    }
})();