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
        $scope.isAllSelected.check = false;
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
        if ($scope.programArray.length == 0) {
            toastr.info("Select at least one program to generate invoice!")
        }
        else {
            $scope.overallTotalAmount = 0;
            $scope.totalPaidAmount =0;
            $scope.particluarTableData ='';
            angular.forEach($scope.programArray, function (selected) {
                $scope.selectedProgram=$scope.programList.find(item => item.id === selected)
                $scope.overallTotalAmount = $scope.overallTotalAmount + $scope.selectedProgram.program_total_amount;
                $scope.totalPaidAmount = $scope.totalPaidAmount + $scope.selectedProgram.program_paid_amount;
                $scope.particluarTableData=$scope.particluarTableData+'<tr><td><span>'+$scope.selectedProgram.program_name+'</span></td><td><span>'+$filter('date')($scope.selectedProgram.program_start_date, "dd/MM/yyyy")+'</span></td><td><span>'+$filter('date')($scope.selectedProgram.program_end_date, "dd/MM/yyyy") +'</span></td><td><span data-prefix="">₹</span><span>'+$scope.selectedProgram.program_total_amount+'</span></td><td><span data-prefix="">₹</span><span>'+$scope.selectedProgram.program_paid_amount+'</span></td><td><span data-prefix="">₹</span><span>'+($scope.selectedProgram.program_total_amount-$scope.selectedProgram.program_paid_amount)+'</span></td></tr>'
            });
            var beforeData = '<html><head><title>Invoice</title><style>*{border: 0;box-sizing: content-box;color: inherit;font-family: inherit;font-size: inherit;font-style: inherit;font-weight: inherit;line-height: inherit;list-style: none;margin: 0;padding: 0;text-decoration: none;vertical-align: top;}/* heading */h1{font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase;}/* table */table{font-size: 75%; table-layout: fixed; width: 100%;}table{border-collapse: separate; border-spacing: 2px;}th, td{border-width: 1px; padding: 0.5em; position: relative; text-align: left;}th, td{border-radius: 0.25em; border-style: solid;}th{background: #EEE; border-color: #BBB;}td{border-color: #DDD;}/* page */html{font: 16px/1 \'Open Sans\', sans-serif; overflow: auto; padding: 0.5in;}html{background: #999; cursor: default;}body{box-sizing: border-box; height: 11in; margin: 0 auto; overflow: hidden; padding: 0.5in; width: 8.5in;}body{background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);}/* header */header{margin: 0 0 3em;}header:after{clear: both; content: ""; display: table;}header h1{background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0;}header address{float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0;}header address p{margin: 0 0 0.25em;}header span, header img{display: block; float: right;}header span{margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative;}header img{max-height: 100%; max-width: 100%;}header input{cursor: pointer; -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"; height: 100%; left: 0; opacity: 0; position: absolute; top: 0; width: 100%;}/* article */article, article address, table.meta, table.inventory{margin: 0 0 3em;}article:after{clear: both; content: ""; display: table;}article h1{clip: rect(0 0 0 0); position: absolute;}article address{float: left; font-size: 125%; font-weight: bold;}/* table meta & balance */table.meta, table.balance{float: right; width: 36%;}table.meta:after, table.balance:after{clear: both; content: ""; display: table;}/* table meta */table.meta th{width: 40%;}table.meta td{width: 60%;}/* table items */table.inventory{clear: both; width: 100%;}table.inventory th{font-weight: bold; text-align: center;}table.inventory td:nth-child(1){width: 26%;}table.inventory td:nth-child(2){width: 38%;}table.inventory td:nth-child(3){text-align: right; width: 12%;}table.inventory td:nth-child(4){text-align: right; width: 12%;}table.inventory td:nth-child(5){text-align: right; width: 12%;}/* table balance */table.balance th, table.balance td{width: 50%;}table.balance td{text-align: right;}/* aside */aside h1{border: none; border-width: 0 0 1px; margin: 0 0 1em;}aside h1{border-color: #999; border-bottom-style: solid;}/* javascript */@media print{*{-webkit-print-color-adjust: exact;}html{background: none; padding: 0;}body{box-shadow: none; margin: 0;}span:empty{display: none;}}@page{margin: 0;}.bill-footer{z-index: 2;min-height: 66px;background-color: #573996;text-align: center;color: #FFFFFF;position: absolute;bottom: 0.5%;left:0.5%;right:0.5%;}.footer-text{ margin: 3%; }</style></head><body><header><h1>Invoice</h1><address></address><span><p>Avinashi,</p><p>Tirupur.</p></span></header><article>';
            var clientData = '<h1>Recipient</h1><address><p>Some Company<br>c/o Some Guy</p><br><p><input type="text"/></p></address>'
            var paymentData = '<table class="meta"><tbody><!--<tr><th><span>Invoice #</span></th><td><span></span></td></tr>--><tr><th><span>Date</span></th><td><span>'+$filter('date')(new Date(), "dd/MM/yyyy")+'</span></td></tr></tbody></table>'
            var particluarTablePrefix= '<table class="inventory"><thead><tr><th><span>Program Name</span></th><th><span>Start Date</span></th><th><span>End Date</span></th><th><span>Total Amount</span></th><th><span>Paid Amount</span></th> <th><span>Due Amount</span></th></tr></thead><tbody>'
            var particularTable = particluarTablePrefix+$scope.particluarTableData+'</tbody></table>'
            var balanceData = '<table class="balance"><tbody><tr><th><span>Overall Total Amount</span></th><td><span>₹</span><span>'+$scope.overallTotalAmount+'</span></td></tr><tr><th><span>Total Amount Paid</span></th><td><span>₹</span><span>'+$scope.totalPaidAmount+'</span></td></tr><tr><th><span>Total Due Amount</span></th><td><span>₹</span><span>'+($scope.overallTotalAmount-$scope.totalPaidAmount)+'</span></td></tr></tbody></table>'
            var afterData = '</article><aside><h1><span>Visit Once Again</span></h1></aside><footer class="bill-footer"><p class="footer-text">No.5, Amirtha Tv , Opposite GH, Seyur Road, Avinashi - 641 654.</p></footer></body></html>';
            var winPrint = window.open();
            winPrint.document.write(beforeData+ clientData + paymentData + particularTable + balanceData +afterData);
            winPrint.document.write('');
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
            winPrint.close();
        }
    };

    $scope.programID = null;
    $scope.getPayments = function (programID) {
        $scope.programID = programID;
        $scope.programPage = false;
        $scope.paymentPage = true;
        clientservice.getPaymentData({'program_id': $scope.programID}, $scope.token).then(function (response) {
            $scope.paymentList = response.data;
        });
    };

     $scope.backToProgram = function () {
        $scope.getPrograms($scope.clientID);
        $scope.paymentPage = false;
        $scope.programPage = true;
    };

     $scope.showPaymentModal =function () {
         $uibModal.open({
            templateUrl: "addPayment.template.html",
            controller: 'addPayment',
            resolve: {
                token: function () {
                    return $scope.token
                },
                programID: function () {
                    return $scope.programID
                }
            }
        }).result.then(function (status) {
            if (status == 'added') {
                toastr.success('Payment added successfully!')
                $scope.getPayments($scope.programID)
            }
        }, function () {
            //cancel
        });
     }

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

app.controller('addPayment', function ($scope, $uibModalInstance, token, programID, clientservice) {
    $scope.closemodal = function (status) {
        $uibModalInstance.close(status);
    };
    $scope.addPaymentData = function () {
        clientservice.sendPaymentDetail({'payment_paid_amount': $scope.paidAmount, 'payment_program_id': programID}, token).then(function (response) {
            $scope.paymentresult = response.data;
            if ($scope.paymentresult.status === 'success') {
                $scope.closemodal('added')
            }
            else {
                toastr.error('Payment not added!')
            }
        });
    }
});