(function () {
    'use strict';

    angular
        .module('fantazaar.core')
        .provider('routeManagerConfig', routeManagerConfig)
        .factory('routeManagerService', routeManagerService);

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
                if (!!route.config.resolve && !!route.config.resolve.auth) {
                    route.config.resolve.auth =
                        routeAuthCheck(route.config.resolve.auth);
                }
                $stateProvider.state(route.stateName, route.config);
            });
        }

        function routeAuthCheck (permissionRequested) {
            routeAuthCheckInternal.$inject = ['authorizationService', '$q'];
            function routeAuthCheckInternal(authorizationService, $q) {
                return authorizationService.isActiveUserInRole(permissionRequested) ? true : $q.reject('not authorized');
            }
            return routeAuthCheckInternal;
        }
    }

    /*@ngInject*/
    function routeManagerService(loginSettings, loginService, $log, $state, appStateManager, $urlRouter, $rootScope) {

        var service = {
            handleLaunch: handleLaunch,
            initRouteWatching: initRouteWatching
        };

        return service;

        function handleLaunch() {
            function onAutoLoginError(data) {
                $log.alert('AutoLogin Failed');
                $state.go('login');
            }

            if (loginSettings != null && loginSettings.validLicense && loginSettings.userLoggedIn) {
                loginService.autoLoginAttempted()
                    .catch(onAutoLoginError);
            }
            else {
                $state.go('login');
            }
        }

        function initRouteWatching() {
            $rootScope.$on('$locationChangeSuccess', function (e) {
                if (appStateManager.isLoginInProcess()) {
                    e.preventDefault();
                }
                else if (!appStateManager.isUserLoggedIn()) {
                    e.preventDefault();
                    $state.go('login');
                }
            });

            $urlRouter.listen();

            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (error === 'not authorized') {
                    $state.go('home');
                }
            });
        }
    }
})();
