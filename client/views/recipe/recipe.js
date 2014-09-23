(function(){
  'use strict';


  angular.module('capstone')
  .controller('RecipeCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    $scope.user = {};

$scope.updateProfile = function(){
      User.update($scope.user).then(function(response){
        //debugger;
      });
    };
  }]);
})();

