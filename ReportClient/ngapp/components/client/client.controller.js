app.controller('client',function($scope,$state,clientservice,localStorageService,DTOptionsBuilder,$uibModal){

    $scope.token=localStorageService.get('user').token;
    $scope.programPage = false;
    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10).withOption('lengthMenu', [10, 25, 50, 100]).withOption('order', []);

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
        clientservice.getProgramData({'client_id':$scope.clientID},$scope.token).then(function(response){
            $scope.programList=response.data;
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
                },
                clientID: function() {
                    return $scope.clientID
                }
            }
        }).result.then(function(status) {
        if(status=='added'){
            toastr.success('Program added successfully!')
            $scope.getPrograms($scope.clientID)
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

app.controller('addProgram', function($scope,$uibModalInstance,token,clientID,clientservice,productservice) {
    $scope.closemodal=function(status){
        $uibModalInstance.close(status);
    };
    productservice.productData(token).then(function(response){
        $scope.productList=response.data;
    });
    clientservice.clientData(token).then(function(response){
        $scope.clientList=response.data;
    });

    $scope.startPicker=false;
    $scope.endPicker=false;
    $scope.programData = {};

    $scope.programData.startDate = new Date();
    $scope.programData.endDate = new Date();

    $scope.stDateOptions = {
        minDate: new Date(),
        startingDay: 1
    };

    $scope.openStart = function () {
        $scope.startPicker=true;
    };

    $scope.changeEndDate = function () {
        if($scope.programData.endDate<$scope.programData.startDate){
            $scope.programData.endDate = $scope.programData.startDate;
        }
    };

    $scope.openEnd = function () {
        $scope.endPicker=true;
        $scope.enDateOptions = {
            minDate: $scope.programData.startDate,
            startingDay: 1
        };
    }

    $scope.addProgramData=function(){
        $scope.programData['clientId'] = clientID;
        clientservice.sendProgramDetail({'program_data':$scope.programData},token).then(function(response){
            $scope.programresult=response.data;
              if($scope.programresult.status==='success'){
                    $scope.closemodal('added')
                }
                else if( $scope.programresult.status==='exists'){
                    toastr.error('Program name already exists!')
                }else{
                    toastr.error('Program not added!')
               }
        });
    }

});