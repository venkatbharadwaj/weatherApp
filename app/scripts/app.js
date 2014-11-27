'use strict';

/**
 * @ngdoc overview
 * @name weatherAppApp
 * @description
 * # weatherAppApp
 *
 * Main module of the application.
 */
angular
  .module('weatherAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
    /*.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/signin', {
            templateUrl: 'views/signIn.html',
            controller: 'SignCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  })*/
    .config(function($stateProvider, $urlRouterProvider){
//        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('landing',{
                url:'/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state('calender',{
                url:'/calender',
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .state('calender.month',{
                url:'/:month',
                templateUrl: 'views/about.html',
                controller:function($scope,$stateParams){
                    $scope.month = $stateParams.month;
                }
            })
            .state('signin',{
                url:'/signin',
                templateUrl: 'views/signIn.html',
                controller: 'SignCtrl'
            });
    });
