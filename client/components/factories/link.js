(function(){
  'use strict';

  angular.module('capstone')
  .factory('Link', ['$http', function($http){

    function create(link){
      return $http.post('/links', link);
    }
    function all(){
      return $http.get('/links');
    }

    return {create:create, all:all};
  }]);
})();
