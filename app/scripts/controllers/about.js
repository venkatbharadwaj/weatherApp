'use strict';

/**
 * @ngdoc function
 * @name weatherAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weatherAppApp
 */
angular.module('weatherAppApp')
    .controller('AboutCtrl', function ($scope,$location) {
        $scope.prev = function(month){
            console.log(month);
            month = month || (new Date().getMonth()+1);
            month = (+(month) - 1);
            $location.path("calender/"+month);
        };
        $scope.next = function(month){
            console.log(month);
            month = month || (new Date().getMonth()+1);
            month = (+(month) + 1);
            $location.path("calender/"+month);
        }
  })
    .directive('calender',function(){
        return {
          restrict: "E",
            templateUrl:'views/calender.html',
            scope:{
                month:'@'

            },
            link:function(scope,ele,attr){
                console.log(attr.month);
                var monthData = [];
                var patch = 1;
                var today = new Date();
                var year = today.getFullYear();//2014
                var month = attr.month || today.getMonth()+1;
                var firstDay= new Date(""+year+"/"+month+"/"+"01"),
                    lastDay = new Date(today.getFullYear(), today.getMonth()+1, 0);
                var firstRemDays = firstDay.getDay()+patch,
                    lastRemDays = ((6-patch)-lastDay.getDay());
                console.log((firstDay.getDate()+lastDay.getDate())/7);
                var weekCount = Math.ceil(((lastDay.getDate()+firstRemDays+lastRemDays)/7));
                console.log(weekCount);
                var singeDate = 86400000;
                var date = +firstDay - (firstRemDays*singeDate);
                var count = 0;

                for(var i = 0;i<= (weekCount);i++){
                    for(var j =0;j< 7;j++)  {
                        if((i == 0 && j < firstDay.getDay()) || (i == weekCount && j > lastDay.getDay())){
                            date = date+singeDate;
                            console.log(new Date(date));
                            monthData.push({
                                date:new Date(date)
                            });
                        }else {
                            date = date+singeDate;
                            monthData.push({
                                date:new Date(date)
                            });
                        }
                    }
                }
                scope.monthName = firstDay.getMonth();
                scope.rows = [];
                scope.rows.length = weekCount;
                scope.cols = [];
                scope.cols.length = 7;
                scope.monthData = monthData;
                console.log(month);
            }/*,
            controller:function ($scope) {
                var monthData = [];
                var patch = 1;
                var today = new Date("2014/2/25");
                var year = today.getFullYear();
                var month = today.getMonth()+1;
                var firstDay= new Date(""+year+"/"+month+"/"+"01"),
                    lastDay = new Date(today.getFullYear(), today.getMonth()+1, 0);
                var firstRemDays = firstDay.getDay()+patch,
                    lastRemDays = ((6-patch)-lastDay.getDay());
                console.log((firstDay.getDate()+lastDay.getDate())/7);
                var weekCount = Math.ceil(((lastDay.getDate()+firstRemDays+lastRemDays)/7));
                console.log(weekCount);
                var singeDate = 86400000;
                var date = +firstDay - (firstRemDays*singeDate);
                var count = 0;

                for(var i = 0;i<= (weekCount);i++){
                    for(var j =0;j< 7;j++)  {
//                date++;

                        if((i == 0 && j < firstDay.getDay()) || (i == weekCount && j > lastDay.getDay())){
                            date = date+singeDate;
                            console.log(new Date(date));
                            monthData.push({
                                date:new Date(date)
                            });
                        }else {
                            date = date+singeDate;
                            monthData.push({
                                date:new Date(date)
                            });
                        }
                    }
                }
                $scope.rows = [];
                $scope.rows.length = weekCount;
                $scope.cols = [];
                $scope.cols.length = 7;
                $scope.monthData = monthData;
            }*/
        };
    });
