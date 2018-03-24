app.controller('client',function($scope,$state,clientservice,localStorageService,DTOptionsBuilder,$uibModal){

    $scope.token=localStorageService.get('user').token;
    $scope.programPage = false;
    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(15).withOption('lengthMenu', [15, 25, 50, 100]).withOption('order', []);

    clientservice.clientData($scope.token).then(function(response){
        $scope.clientList=response.data;
    });

    $scope.showModal = function() {
     $uibModal.open({
        templateUrl: "addClient.template.html",
        controller: 'addClient',
        resolve: {
                token: function() {
                    return $scope.token
                }
            }
        }).result.then(function(status) {
        if(status=='added'){
            toastr.success('Client added successfully!')
            $state.reload()
        }
        },function() {
        //cancel
        });
    };

    $scope.clientID = null;
    $scope.getPrograms = function(clientID){
        $scope.clientID = clientID;
        $scope.programPage = true;
        clientservice.programData($scope.token).then(function(response){
            $scope.programList=response.data;
            console.log($scope.programList)
        });
    }

    $scope.backToClient = function(){
        $scope.programPage = false;
    };

    $scope.showProgramAddModal = function() {
     $uibModal.open({
        templateUrl: "addProgram.template.html",
        controller: 'addProgram',
        resolve: {
                token: function() {
                    return $scope.token
                }
            }
        }).result.then(function(status) {
        if(status=='added'){
            toastr.success('Program added successfully!')
            $state.reload()
        }
        },function() {
        //cancel
        });
    };
});

app.controller('addClient', function($scope,$uibModalInstance,token,clientservice) {
    $scope.closemodal=function(status){
        $uibModalInstance.close(status);
    }
    $scope.addClientData=function(){
        clientservice.sendClientDetail({'client_data':$scope.clientData},token).then(function(response){
            $scope.clientresult=response.data
              if($scope.clientresult.status==='success'){
                    $scope.closemodal('added')
                }
                else if( $scope.clientresult.status==='exists'){
                    toastr.error('Client username already exists!')
                }else{
                    toastr.error('Client not added!')
               }
        });
    }

});

app.controller('addProgram', function($scope,$uibModalInstance,token,clientservice) {
    $scope.closemodal=function(status){
        $uibModalInstance.close(status);
    }
    $scope.addProgramData=function(){
        clientservice.sendProgramDetail({'client_data':$scope.programData},token).then(function(response){
            $scope.programresult=response.data
            console.log($scope.programresult)
              if($scope.programresult.status==='success'){
                    $scope.closemodal('added')
                }
                else if( $scope.programresult.status==='exists'){
                    toastr.error('Client username already exists!')
                }else{
                    toastr.error('Client not added!')
               }
        });
    }

});