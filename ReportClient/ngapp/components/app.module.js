var app = angular.module('app',['ui.router','ui.bootstrap']);

app.config(function($stateProvider,$urlRouterProvider,$httpProvider,$locationProvider){
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $stateProvider
    .state('login',{
        url:'/',
        templateUrl:'components/login/login.template.html',
        controller:'login'
    })
    .state('dashboard',{
        url:'/dashboard',
        templateUrl:'components/dashboard/dashboard.template.html',
        controller:'dashboard'
    });
    $urlRouterProvider.otherwise('/');
});