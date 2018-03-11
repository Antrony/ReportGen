app.factory('productservice',function($http, globalValue){
   var obj = {};
   var url = globalValue.url+'report/';

    obj.productData = function(token){
       return $http.get(url+'product_list/?format=json',
       {
        headers: {'Authorization': 'Token '+ token}
       });
    }
    obj.sendProductDetail = function(data,token){
        return $http.post(url+'add_product/?format=json',data,
       {
        headers: {'Authorization': 'Token '+ token}
       });
    }
    return obj;
});