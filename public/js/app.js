'use strict';
var app = angular.module('app', ['ngRoute', 'ngResource'])
    .constant('config', {
        states: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
    });

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html'
        })
        .when('/students', {
            templateUrl: 'students.html',
            controller: 'StudentsCtrl'
        })
        .when('/students/:studentId', {
            templateUrl: 'student.html',
            controller: 'StudentCtrl'
        })
        .when('/departments', {
            templateUrl: 'departments.html',
            controller: 'DepartmentsCtrl'
        })
        .when('/departments/:departmentId', {
            templateUrl: 'department.html',
            controller: 'DepartmentCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.factory('StudentService', ['$resource', function($resource) {
    return $resource('/students/:studentId', {}, {
        update: {
            method: 'PUT'
        }
    });
}]);

app.factory('DepartmentService', ['$resource', function($resource) {
    return $resource('/departments/:departmentId');
}]);

app.directive('imageFallback', function() {
    return {
        link: function(scope, elem, attrs) {
            elem.bind('error', function() {
                angular.element(this).attr('src', attrs.imageFallback);
            });
        }
    };
}).directive('editInLine', function($compile) {
    var exports = {};

    function link(scope, element, attrs) {
        var template = '<div class="in-line-container">';
        var newElement;
        var displayValue;
        var options;
        switch (attrs.editType) {
            case 'select':
                displayValue = attrs.displayValue ? 'displayValue' : 'value';
                options = attrs.editOption;
                options = options.replace(attrs.editList, 'editList');
                template += '<div class="in-line-value" ng-hide="editing"> {{' + displayValue + '}}</div>';
                template += '<select class="in-line-input form-control" ng-show="editing" ng-model="value" ng-options="' + options + '"> </select>';
                break;
            case 'number':
                template += '<div class="in-line-value" ng-hide="editing"> {{value}}</div>';
                template += '<input class="in-line-input form-control" ng-show="editing" type="number" ng-model="value" step="any" min="0" max="99999" />'
                break;
            default:
                template += '<div class="in-line-value" ng-hide="editing"> {{value}}</div>';
                template += '<input class="in-line-input form-control" ng-show="editing" type="text" ng-model="value" />';
        }

        // Close the outer div
        template += '</div>';
        newElement = $compile(template)(scope);
        element.replaceWith(newElement);
        scope.$on('$destroy', function() {
            newElement = undefined;
            element = undefined;
        });
    }

    exports.scope = {
        value: '=',
        editing: '=',
        editList: '=',
        displayValue: '='
    };

    exports.restrict = 'E';
    exports.link = link;
    return exports;
});

app.controller('StudentsCtrl', ['$scope', 'StudentService', function($scope, service) {
    service.query(function(data, headers) {
        $scope.students = data;
    }, _handleError);
}]);

app.controller('StudentCtrl', ['$scope', '$routeParams', 'StudentService', 'DepartmentService', '$q', 'config', '$route',
    function($scope, $routeParams, student, department, $q, config, $route) {
        $scope.address = {};

        function getDepartment(departments, departmentId) {
            for (var i = 0, l = departments.length; i < l; ++i) {
                var t = departments[i];
                if (t._id === departmentId) {
                    return t;
                }
            }
        }

        $q.all([
            student.get({
                studentId: $routeParams.studentId
            }).$promise,
            department.query().$promise
        ]).then(function(values) {
            $scope.departments = values[1];
            $scope.student = values[0];
            $scope.student.department = getDepartment($scope.departments, $scope.student.department._id);
        }).catch(_handleError);
        $scope.editing = false;
        // To prevent multiple references to the same array, give us a new copy of it.
        $scope.states = config.states.slice(0);
        $scope.edit = function() {
            $scope.editing = !$scope.editing;
        };

        $scope.save = function() {
            // To prevent empty lines in the database and keep the UI clean
            // remove any blank lines
            var lines = $scope.student.address.lines;
            if (lines.length) {
                lines = lines.filter(function(value) {
                    return value;
                });
            }
            $scope.student.address.lines = lines;
            student.update({
                studentId: $routeParams.studentId
            }, $scope.student, function() {
                $scope.editing = !$scope.editing;
            });
        };

        $scope.cancel = function() {
            $route.reload();
        }

        $scope.address.addLine = function(index) {
            var lines = $scope.student.address.lines;
            lines.splice(index + 1, 0, ''); //ADD ITEM TO LIST
        }

        $scope.address.removeLine = function(index) {
            var lines = $scope.student.address.lines;
            lines.splice(index, 1);
        }
    }
]);

app.controller('DepartmentsCtrl', ['$scope', 'DepartmentService', function($scope, service) {
    service.query(function(data) {
        $scope.departments = data;
    }, _handleError);
}]);

app.controller('DepartmentCtrl', ['$scope', '$routeParams', 'DepartmentService', function($scope, $routeParams, service) {
    service.get({
        departmentId: $routeParams.departmentId
    }, function(data, headers) {
        $scope.department = data;
    }, _handleError);
}]);

function _handleError(response) {
    // TODO: Do something here. Probably just redirect to error page
    console.log('%c ' + response, 'color:red');
}