(function(){
  'use strict';

  angular.module('capstone', ['ngRoute', 'LocalForageModule'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/register', {templateUrl:'/views/register/register.html', controller:'RegisterCtrl'})
    .when('/login', {templateUrl:'/views/register/register.html', controller:'RegisterCtrl'})
    .when('/profile', {templateUrl:'/views/profile/profile.html', controller:'ProfileCtrl'})
    .when('/newRecipe', {templateUrl:'/views/newRecipe/newRecipe.html', controller:'NewRecipeCtrl'})
    .when('/recipe', {templateUrl:'/views/recipe/recipe.html', controller:'RecipeCtrl'})
    .when('/recipes', {templateUrl:'/views/recipes/recipes.html', controller:'RecipesCtrl'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html',     controller:'LogoutCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'capstone', storeName:'cache', version:1.0});
  }]);

})();

