(function(){
  'use strict';


  angular.module('capstone')
  .controller('RecipesCtrl', ['$scope', 'Recipe', function($scope, Recipe){
    $scope.priorities = [];
    Recipe.all().then(function(response){
      $scope.recipes = response.data.recipes;
    });
  }]);
})();

