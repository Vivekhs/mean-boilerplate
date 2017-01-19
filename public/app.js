var attendanceApp = angular.module('attendanceApp', ['ui.router','ngMaterial','ngAnimate','ngSanitize']);


attendanceApp.controller('mainController', ['$scope', '$http', '$state', function($scope, $http, $state){
  $scope.login =true;
  $scope.user={};
  $scope.userName=null;
  $scope.firstName=null;
  $scope.lastName=null;
  $scope.password=null;
  $scope.registrationMsg=null;

    $scope.signup = function(){

        $http.post('/signup', $scope.user).success(function(response){
            console.log(response);
            $scope.registrationMsg="Registration success...";
        }).error(function(response){
            console.log(response);

        });
    }

    $scope.signin = function(){

      $http.post('/signin', $scope.user).success(function(response){
        console.log(response);
          if(response.data){
            $state.go('home');
            return;
          }
          console.log(response);
      }).error(function(response){
          console.log(response);

      });
    }

}]);

attendanceApp.config(['$locationProvider', function($locationProvider){
              $locationProvider.html5Mode(true);
}]);
