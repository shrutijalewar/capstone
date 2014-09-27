(function(){
  'use strict';

  angular.module('capstone')
  .factory('Recipe', ['$http', function($http){
    function create(recipe){
      return $http.post('/recipes', recipe);
    }
    function findById(recipeId){
      return $http.get('/recipe/' + recipeId);
    }
    function all(){
      return $http.get('/recipes');
    }
    return {create:create, findById:findById, all:all};

  }]);
})();
