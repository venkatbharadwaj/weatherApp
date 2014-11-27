'use strict';

/**
 * @ngdoc function
 * @name weatherAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherAppApp
 */
angular.module('weatherAppApp')
//        $scope.city = "";
    .controller('MainCtrl', function ($http,ApiUrl,$scope,$interval) {
        $scope.weather = {
            city:'',
            country:'',
            temperature:{
                tempC:'',
                tempF:''
            },
            date: new Date().getDate(),
            month: (new Date().getMonth()+1)
        };
        $scope.lists = ['Dashboard','Forecast','Past Weather','Reports'];

        $http({method:'GET',url:'http://localhost:8000/api/names'}).success(function(data){
           console.log(data);
        });

        $http({method:'GET',url:'http://jsonip.com/'}).success(function(data){
            var ip = data.ip;
//            var url = ApiUrl.setCurrentPlaceWeather(ip);
            ApiUrl.setCurrentPlaceWeather(ip).success(function(data){
                var count = 0;
                var timer = $interval(function(){
                    if(count === +(data.data.current_condition[0].temp_C)){
                        $interval.cancel(timer);
                    }
                    $scope.weather.temperature.tempC = count;
                    count++;
                },50);

//                $scope.weather.temperature.tempC = data.data.current_condition[0].temp_C;

                $scope.weather.temperature.tempF = data.data.current_condition[0].temp_F;
            }).error(function(err){
                console.log("failed to get data from weather.aspx",err);
            });
//            var searchUrl = ApiUrl.setUrlForSearch(ip);
            ApiUrl.getLocationName(ip).success(function(data){
                var result = data.search_api.result;
                $scope.weather.city = result[0].areaName[0].value;
                $scope.weather.country = result[0].country[0].value;
            }).error(function(err){console.log(err);});

        }).error(function(err){
            console.log(err);
        });

        $scope.getCityData = function(city,ele){
            console.log(ele);
            ApiUrl.getLocationName(city)
                .success(function(data){
                    console.log(data,ApiUrl.apiKey);
                })
                .error(function(err){
                    console.log(err);
                });
        };
        $scope.handleTempScale = function(scale) {
            $scope.scale = !$scope.scale;
        };
        $scope.scale = true;

    })
    .directive('slider',function(){
        return {
            restrict:'E',
            scope:{
                list:'='
            },
            controller:function($scope){
                this.toggleIsActiveClass = function(){
                    $scope.isActiveClass = !$scope.isActiveClass;
                };
            },
            template:'<aside style="background: #f5f5f5">' +
                    '<ul>' +
                    '<li ng-repeat="x in list"><a href="">{{x}}</a></li>' +
                    '</ul></aside>',
            transclude:true,
            link:function(scope,ele,attr){

            }
        };
    })
    .directive('hamberger',function(){
        return {
            restrict:'EA',
            template:'<div id="nav-toggle" ng-click="setClass()" ng-class="isActiveClass ? \'active\':\'\'"><span></span></div>',
            controller:function($scope){
                $scope.isActiveClass = false;
                $scope.setClass = function(){
                    $scope.isActiveClass = !$scope.isActiveClass;
                };
            },
            link:function(scope,attr,ele,slider){
            }
        };
    })
    .directive('mySlider',function(){
        return {
            restrict:'E',
            template:'<hamberger></hamberger>' +
                '<slider list="lists" ng-class="isActiveClass ? \'\':\'show-aside\'" ></slider>',
            link:function(){
                console.log("in my-slider dir");
            }
        };
    });

