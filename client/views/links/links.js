(function(){
  'use strict';

  angular.module('capstone')
  .controller('LinksCtrl', ['$scope', 'Link', '$location', function($scope, Link, $location){
    $scope.link = {};
    $scope.links = [];
    $scope.link.url = $location.search().url;

    $scope.addLink = function(){
      Link.create($scope.link).then(function(response){
        $scope.links.push(response.data.link);
        $scope.link = {};
      });
    };

    Link.all().then(function(response){
      $scope.links = response.data.links;
    });

  }]);
})();
