var app = angular.module('mac-apps-manager', ['ui.bootstrap', 'ngClipboard']);

app.factory('AppService', function ($http, $q) {
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

app.controller('FormController', function ($scope, $http, $location, AppService, $modal) {
    $scope.selection = [];
    $scope.alerts = [
        {
            type: 'warning',
            msg: 'Warning! We are still under development!'
        },
    ];

    // @NOTE add a new alert
    $scope.addAlert = function (type, msg) {
        $scope.alerts.push({
            type: type,
            msg: msg
        });
    };

    // @NOTE remove alerts
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

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

    $scope.open = function () {
        if($scope.selection.length <= 0) {
            $scope.addAlert('danger', 'You are not authorized to access this area.');
            return;
        }
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'compileModal.html',
            controller: 'CompilerModalController',
            resolve: {
                selection: function () {
                    return $scope.selection;
                }
            }
        });

        modalInstance.result.then(function () {
            console.log('success');
            $scope.addAlert('success', 'Well done! You successfully read this important alert message.');
        }, function () {
            console.log('cancel');
        });
    };
});

app.controller('CompilerModalController', function ($scope, $modalInstance, selection) {
    $scope.selection = selection;
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.ok = function () {
        $modalInstance.close();
    };

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
});
