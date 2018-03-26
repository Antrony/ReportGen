app.factory('clientservice', function ($http, globalValue) {
    var obj = {};
    var url = globalValue.url + 'report/';

    obj.clientData = function (token) {
        return $http.get(url + 'client_list/?format=json',
            {
                headers: {'Authorization': 'Token ' + token}
            });
    };
    obj.sendClientDetail = function (data, token) {
        return $http.post(url + 'add_client/?format=json', data,
            {
                headers: {'Authorization': 'Token ' + token}
            });
    };
    obj.getProgramData = function (data, token) {
        return $http.post(url + 'program_list/?format=json', data,
            {
                headers: {'Authorization': 'Token ' + token}
            });
    };
    obj.sendProgramDetail = function (data, token) {
        return $http.post(url + 'add_program/?format=json', data,
            {
                headers: {'Authorization': 'Token ' + token}
            });
    };
    obj.getPaymentData = function (data, token) {
        return $http.post(url + 'payment_list/?format=json', data,
            {
                headers: {'Authorization': 'Token ' + token}
            });
    };
    obj.sendPaymentDetail = function (data, token) {
        return $http.post(url + 'add_payment/?format=json', data,
            {
                headers: {'Authorization': 'Token ' + token}
            });
    };
    return obj;
});