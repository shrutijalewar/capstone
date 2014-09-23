(function(){
  'use strict';

  angular.module('capstone')
  .controller('RegisterCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    $scope.user = {};

    function success(response){
      toastr.success('User successfully registered.');
      $location.path('/login');
    }

    function failure(response){
      toastr.error('Error during user registration, try again.');
      $scope.user = {};
    }

    $scope.register = function(){
      User.register($scope.user).then(success, failure);
    };

    $scope.logUser = {};

    function logSuccess(response){
      toastr.success('Successful login.');
      $location.path('/');
    }

    function logFailure(response){
      toastr.error('Error during login, try again.');
      $scope.logUser = {};
    }

    $scope.login = function(){
      User.login($scope.logUser).then(logSuccess, logFailure);
    };
  }]);

})();

