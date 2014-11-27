'use strict';
/**
 * Created by venkat on 19/11/14.
 */
angular.module('weatherAppApp')
    .controller('SignCtrl',function($scope){
//        console.log("In SignCtrl");
//        $scope.signInForm = {};
        $scope.signIn = function(form,formModel){
            console.log(form,$scope.signInForm,$scope.form,formModel);

        };
    });