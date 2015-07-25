var blog = angular.module('blogApp', []);

blog.controller('FormController', function ($scope, $http, $location) {
    console.log('Form Controller Initialized');

    $scope.cmd = '';

    // @TODO Toggle All needs to be implemented
    $scope.toggle = function () {
        console.log('toggle');
    };

    $scope.submit = function () {
        var command = "";

        for (app in $scope.apps) {
            if ($scope.apps[app]) {
                var str = "curl -s https://raw.githubusercontent.com/nonsane/mac-apps/master/" + app + " | sh";

                if(!command) {
                    command = command + str;
                } else {
                    command = command + " && " + str;
                }
            }
        }

        console.log(command);
        $scope.cmd = command;
    };
});
