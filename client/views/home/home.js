(function(){
  'use strict';

  angular.module('capstone')
  .controller('HomeCtrl', ['$scope', '$interval', 'Home', function($scope, $interval, Home){

    $scope.names = [];

    $scope.getRecipe = function(){
      $scope.names.push($scope.name);
      $scope.name = null;
    };
    $scope.quotes = [
          {body: 'Recipes don’t work unless you use your heart!', author:'Dylan Jones'},
          {body: 'This is my advice to people: Learn how to cook, try new recipes, learn from your mistakes, be fearless, and above all have fun.', author: 'Julia Child'},
          {body: 'Cookery is not chemistry. It is an art. It requires instinct and taste rather than exact measurements.', author: 'Marcel Boulestin'},
          {body: 'Cooking is an observation-based process that you can’t do if you’re so completely focused on a recipe.', author: 'Alton Brown'},
          {body: 'I can’t stand people that do not take food seriously.', author:'Oscar Wilde'},
          {body: 'Fish to taste right, must swim three times in water, in butter and in wine.', author:'Polish Proverb'},
          {body: 'There is no greater love than the love of food.', author: 'George Bernard Shaw'},
          {body: 'Kitchen - a gathering place for family and friends where memories are homemade and seasoned with love.', author: 'Anonymous'}
      ];

          $scope.init = function(){
                  var shuffledQuotes = _.shuffle($scope.quotes),
          quote = _.sample(shuffledQuotes, [1]);
        $scope.quote = quote[0];
            };

  }]);
})();

