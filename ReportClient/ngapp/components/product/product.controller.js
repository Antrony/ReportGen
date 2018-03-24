app.controller('product', function($scope,$state,productservice,localStorageService,DTOptionsBuilder,$uibModal){
    $scope.token=localStorageService.get('user').token;

    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10).withOption('lengthMenu', [10, 25, 50, 100]).withOption('order', []);

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
         },function() {
         //cancel
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
              if($scope.pdtresult.status==='success'){
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
