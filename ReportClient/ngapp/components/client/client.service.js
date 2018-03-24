app.factory('clientservice',function($http, globalValue){
   var obj = {};
   var url = globalValue.url+'report/';

    obj.clientData = function(token){
       return $http.get(url+'client_list/?format=json',
       {
        headers: {'Authorization': 'Token '+ token}
       });
    }
    obj.sendClientDetail = function(data,token){
        return $http.post(url+'add_client/?format=json',data,
       {
        headers: {'Authorization': 'Token '+ token}
       });
    }
    obj.programData = function(token){
       return $http.get(url+'program_list/?format=json',
       {
        headers: {'Authorization': 'Token '+ token}
       });
    }
    return obj;
});