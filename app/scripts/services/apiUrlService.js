'use strict';

/**
 * Created by venkat on 4/11/14.
 */

angular.module('weatherAppApp')
.factory('ApiUrl',function($http){
    return {
        apiKey:'key=469d152bc669c4c062df87bba0d49',
        apiUrl1: 'https://api.worldweatheronline.com/free/v2/',
        searchString:'search.ashx?q=',
        weather:{
            string:'weather.ashx?q=',
            string2:'&format=json&num_of_days=0&date=today&includelocation=yes&'
        },
        apiUrl2:'&format=json&popular=yes&num_of_results=200&',
        setUrlForSearch:function(city){
            var url = this.apiUrl1+this.searchString+city+this.apiUrl2+this.apiKey;
            return url;
        },
        getLocationName: function(city){
            var self = this;
            var url = self.apiUrl1+self.searchString+city+self.apiUrl2+self.apiKey;
            return  $http({method:'GET',url:url})
                .success(function(data){
                    return data;
                })
                .error(function(err){
                    console.log('failed to get data from search.aspx',err);
                });
        },
        setCurrentPlaceWeather:function(ip){
            var self = this;
            var url = self.apiUrl1+self.weather.string+ip+self.weather.string2+self.apiKey;
            return $http({method:'GET',url:url}).success(function(data){
                return data;
            }).error(function(err){
                console.log(err);
            });
        }

    };
    });
