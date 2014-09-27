(function(){
  'use strict';

  angular.module('capstone')
  .controller('HomeCtrl', ['$scope', '$interval', 'Home', function($scope, $interval, Home){
    $scope.names = [];

    $scope.getRecipe = function(){
      $scope.names.push($scope.name);
      $scope.name = null;
    };

    $scope.getDirections = function(){
      $scope.recipeIds.push($scope.recipeId);
      $scope.recipeId = null;
    };

  }]);
})();

