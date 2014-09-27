(function(){
  'use strict';


  angular.module('capstone')
  .controller('RecipeCtrl', ['$scope', '$routeParams', 'Recipe', function($scope, $routeParams, Recipe){
    $scope.recipe = {};
    Recipe.findById($routeParams.id).then(function(response){
      $scope.recipe = response.data.recipe;
      $scope.title = $scope.recipe.name;

    });
  }]);
})();

