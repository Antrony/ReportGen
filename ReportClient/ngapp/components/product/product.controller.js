app.controller('product',function($scope,$state,productservice,localStorageService,$uibModal){
    $scope.token=localStorageService.get('user').token;
    productservice.productData($scope.token).then(function(response){
        $scope.productList=response.data;
    });

    $scope.showModal = function() {
         $uibModal.open({
            templateUrl: "addProduct.template.html",
            controller: 'addProduct',
            resolve: {
                    token: function() {
                    return $scope.token
                    }
                }
            }).result.then(function(status) {
            if(status=='added'){
                toastr.success('Product added successfully!')
                $state.reload()
              }
         });
  };

});

app.controller('addProduct', function($scope,$uibModalInstance,token,productservice) {
    $scope.closemodal=function(status){
        $uibModalInstance.close(status);
    }
    $scope.addProductData=function(){
        data={'product_name':$scope.makeValidation.productName}
        productservice.sendProductDetail(data,token).then(function(response){
            $scope.pdtresult=response.data
              if( $scope.pdtresult.status==='success'){
                    $scope.closemodal('added')
                }
                else if( $scope.pdtresult.status==='exists'){
                    toastr.error('Product Name already exists!')
                }else{
                    toastr.error('Product not added!')
               }
        });
        }

});
