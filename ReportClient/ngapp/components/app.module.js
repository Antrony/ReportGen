var app = angular.module('app',['ui.router','LocalStorageModule','datatables','ui.bootstrap']);

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
    })
    .state('product',{
        url:'/product',
        templateUrl:'components/product/product.template.html',
        controller:'product'
    })
    .state('client',{
        url:'/client',
        templateUrl:'components/client/client.template.html',
        controller:'client'
    });
    $urlRouterProvider.otherwise('/');
});

app.filter('capitalizeWord', function() {
    return function(text) {
      return (!!text) ? text.charAt(0).toUpperCase() + text.substr(1).toLowerCase() : '';
    }
});