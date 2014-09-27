(function(){
  'use strict';


  angular.module('yummlyModule', [])
  .factory('RecipeApi', ['$http', function($http){
    function recipe(name){
      return $http.jsonp('http://api.yummly.com/v1/api/recipes?_app_id=21a22eae&_app_key=26b6066eff61fad6f1f5c16a8ae3134e&q='+ name +'&requirePictures=true&callback=JSON_CALLBACK');
    }
    return {recipe:recipe};
  }])
  .factory('DirectionsApi', ['$http', function($http){
    function directions(recipeId){
      debugger;
      return $http.jsonp('http://api.yummly.com/v1/api/recipe/'+ recipeId +'?_app_id=21a22eae&_app_key=26b6066eff61fad6f1f5c16a8ae3134e&callback=JSON_CALLBACK');
    }
    return {directions:directions};
  }])
  .directive('ssRecipe', ['$interval', function($interval){
    var o = {};
    o.restrict    = 'A';
    o.templateUrl = '/components/directives/yummly/yummly.html';
    o.scope       = {name: '@', remove:'&'};
    o.link        = function(scope, element, attrs){

                    };
    o.controller  = ['$scope', 'RecipeApi','DirectionsApi','$window', function($scope,RecipeApi, DirectionsApi, $window){
                    function getRecipe(){
                      RecipeApi.recipe($scope.name).then(function(response){
                        //debugger;
                        response.data.matches.forEach(function(rec){
                          rec.smallImageUrls[0] = rec.smallImageUrls[0].replace(/s90/, 's250');
                        });

                        $scope.yumRecipes = response.data.matches;
                      });
                    }
                  getRecipe();

                  $scope.getDirections = function(recipeId){
                    DirectionsApi.directions(recipeId).then(function(response){
                      //debugger;
                      $scope.url = response.data.source.sourceRecipeUrl;
                      $window.open($scope.url);
                    });
                  };

                 }];
    return o;
  }]);
})();
