
attendanceApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

 $urlRouterProvider.otherwise("/sign_in");
    $stateProvider

        .state('sign_in', {
            controller:'mainController',
            url: '/sign_in',
            templateUrl: '/components/signin.html'
        })

        .state('sign_up', {
          controller:'mainController',
          url: '/sign_in',
          templateUrl: '/components/signup.html'
        })

        .state('home', {
          controller:'homeController',
          url: '/home',
          templateUrl: '/components/home/home.html'
        });

}]);
