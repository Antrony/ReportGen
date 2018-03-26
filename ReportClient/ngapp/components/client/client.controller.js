app.controller('client', function ($scope, $state, clientservice, localStorageService, DTOptionsBuilder, DTColumnDefBuilder, $uibModal, $filter) {

    $scope.token = localStorageService.get('user').token;
    $scope.programPage = false;
    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10).withOption('lengthMenu', [10, 25, 50, 100]).withOption('order', []);
    $scope.progdtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10).withOption('lengthMenu', [10, 25, 50, 100]).withOption('order', []);
    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];
    clientservice.clientData($scope.token).then(function (response) {
        $scope.clientList = response.data;
    });

    $scope.showModal = function () {
        $uibModal.open({
            templateUrl: "addClient.template.html",
            controller: 'addClient',
            resolve: {
                token: function () {
                    return $scope.token
                }
            }
        }).result.then(function (status) {
            if (status == 'added') {
                toastr.success('Client added successfully!')
                $state.reload()
            }
        }, function () {
            //cancel
        });
    };

    $scope.clientID = null;
    $scope.getPrograms = function (clientID) {
        $scope.clientID = clientID;
        $scope.programPage = true;
        clientservice.getProgramData({'client_id': $scope.clientID}, $scope.token).then(function (response) {
            $scope.programList = response.data;
        });
    };

    $scope.backToClient = function () {
        $scope.programPage = false;
    };

    $scope.showProgramAddModal = function () {
        $uibModal.open({
            templateUrl: "addProgram.template.html",
            controller: 'addProgram',
            resolve: {
                token: function () {
                    return $scope.token
                },
                clientID: function () {
                    return $scope.clientID
                }
            }
        }).result.then(function (status) {
            if (status == 'added') {
                toastr.success('Program added successfully!')
                $scope.getPrograms($scope.clientID)
            }
        }, function () {
            //cancel
        });
    };
    $scope.isAllSelected = {
        check: false
    };
    $scope.programArray = [];
    $scope.chkboxchange = function () {
        $scope.programArray = [];
        angular.forEach($scope.programList, function (program) {
            if (program.selected) {
                $scope.programArray.push(program.id)
            }
        });
        if($scope.programArray.length < $scope.programList.length) {
            $scope.isAllSelected.check = false;
        }
        else {
            $scope.isAllSelected.check = true;
        }
    };

    $scope.toggleAll = function () {
        var toggleStatus = $scope.isAllSelected.check;
         $scope.programArray = [];
        angular.forEach($scope.programList, function (program) {
            program.selected = toggleStatus;
            if (program.selected) {
                $scope.programArray.push(program.id)
            }
        });
    };

    $scope.printProgram = function () {
        console.log($scope.programArray)
        if ($scope.programArray.length == 0) {
            toastr.info("Select at least one program to generate invoice!")
        }
        else {
            $scope.serail = 1;
            $scope.printData ='';
            angular.forEach($scope.programArray, function (selected) {
                $scope.selectedProgram=$scope.programList.find(item => item.id === selected)
                $scope.printData=$scope.printData+'<tr><td>'+$scope.serail++ +'</td><td>'+$scope.selectedProgram.program_name+'</td><td>'+$filter('date')($scope.selectedProgram.program_start_date, "dd/MM/yyyy")+' - '+$filter('date')($scope.selectedProgram.program_end_date, "dd/MM/yyyy") +'</td><td>'+$scope.selectedProgram.program_total_amount+'</td><td>0</td></tr>'
            });
            var beforeData = '<html><head><title>Report</title></head><body><table border="1" width="100%"><tr><th>S.No.</th><th>Particulars</th><th>Period</th><th>Total Amount(Rs.)</th><th>Paid Amount(Rs.)</th></tr>'
            var printData = '<tbody>'+$scope.printData;
            var afterData = '</tbody></table></body></html>'
            var winPrint = window.open();
            winPrint.document.write(beforeData+printData+afterData);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
            winPrint.close();
        }
    };


});

app.controller('addClient', function ($scope, $uibModalInstance, token, clientservice) {
    $scope.closemodal = function (status) {
        $uibModalInstance.close(status);
    };
    $scope.addClientData = function () {
        clientservice.sendClientDetail({'client_data': $scope.clientData}, token).then(function (response) {
            $scope.clientresult = response.data;
            if ($scope.clientresult.status === 'success') {
                $scope.closemodal('added')
            }
            else if ($scope.clientresult.status === 'exists') {
                toastr.error('Client username already exists!')
            } else {
                toastr.error('Client not added!')
            }
        });
    }

});

app.controller('addProgram', function ($scope, $uibModalInstance, token, clientID, clientservice, productservice) {
    $scope.closemodal = function (status) {
        $uibModalInstance.close(status);
    };
    productservice.productData(token).then(function (response) {
        $scope.productList = response.data;
    });
    clientservice.clientData(token).then(function (response) {
        $scope.clientList = response.data;
    });

    $scope.startPicker = false;
    $scope.endPicker = false;
    $scope.programData = {};

    $scope.programData.startDate = new Date();
    $scope.programData.endDate = new Date();

    $scope.stDateOptions = {
        minDate: new Date(),
        startingDay: 1
    };

    $scope.openStart = function () {
        $scope.startPicker = true;
    };

    $scope.changeEndDate = function () {
        if ($scope.programData.endDate < $scope.programData.startDate) {
            $scope.programData.endDate = $scope.programData.startDate;
        }
    };

    $scope.openEnd = function () {
        $scope.endPicker = true;
        $scope.enDateOptions = {
            minDate: $scope.programData.startDate,
            startingDay: 1
        };
    };

    $scope.addProgramData = function () {
        $scope.programData['clientId'] = clientID;
        clientservice.sendProgramDetail({'program_data': $scope.programData}, token).then(function (response) {
            $scope.programresult = response.data;
            if ($scope.programresult.status === 'success') {
                $scope.closemodal('added')
            }
            else if ($scope.programresult.status === 'exists') {
                toastr.error('Program name already exists!')
            } else {
                toastr.error('Program not added!')
            }
        });
    }

});