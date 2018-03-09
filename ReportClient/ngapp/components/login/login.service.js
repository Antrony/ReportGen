app.factory('authservice',function($http, globalValue){
   var obj = {};
   var url = globalValue.url;

    obj.loginData = function(data){
       return $http.post(url+'login/?format=json',data);
    }

    return obj;
});