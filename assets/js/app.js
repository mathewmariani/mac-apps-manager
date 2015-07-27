var blog = angular.module('mac-apps-manager', []);

blog.factory('AppService', function ($http, $q) {
    return {
        query: function () {
            var deferred = $q.defer();

            $http.get('//raw.githubusercontent.com/nonsane/mac-apps/master/apps.json')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }
    };
});

blog.controller('FormController', function ($scope, $http, $location, AppService) {
    $scope.selection = [];
    $scope.cmd = '';

    $scope.getApps = function () {
        AppService.query()
            .then(function (data) {
                $scope.apps = data;
            })
    }

    $scope.getApps();

    $scope.toggle = function (name) {
        var app = name.toLowerCase().replace(/ /g, "");
        var index = $scope.selection.indexOf(app);

        if (index === -1) {
            $scope.selection.push(app);
        } else {
            $scope.selection.splice(index, 1);
        }
    };

    $scope.submit = function () {
        var command = "";

        for (app in $scope.selection) {
            if ($scope.selection[app]) {
                var str = "curl -s https://raw.githubusercontent.com/nonsane/mac-apps/master/" + $scope.selection[app] + " | sh";

                if (!command) {
                    command = command + str;
                } else {
                    command = command + " && " + str;
                }
            }
        }

        $scope.cmd = command;
    };
});
