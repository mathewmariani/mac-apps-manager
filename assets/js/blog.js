var blog = angular.module('blogApp', []);

blog.controller('FormController', function ($scope, $http, $location) {
    console.log('Form Controller Initialized');

    // @TODO Toggle All needs to be implemented
    $scope.toggle = function () {
        console.log('toggle');
    };

    $scope.submit = function () {
        console.log($scope.apps);

        for (app in $scope.apps) {
            if ($scope.apps[app]) {
                console.log('curl -s ' + $location.absUrl() + '/_includes/' + app + ' | sh');
            }
        }
    };
});
