(function(){
  'use strict';


  angular.module('capstone')
  .controller('NewRecipeCtrl', ['$scope', 'Recipe', function($scope, Recipe){
    $scope.recipe = {};
    $scope.recipes = [];

    $scope.addRecipe = function(){
      Recipe.create($scope.recipe).then(function(response){
        $scope.recipes.push(response.data.recipe);
        $scope.recipe = {};
      });
    };
  }]);//
})();//

