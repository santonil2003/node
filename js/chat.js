var webApp = angular.module('webApp', []);

var socket = io('http://127.0.0.1:8080/');

webApp.controller('webAppCtrl', function ($scope) {


    /**
     * Listen to server event
     */
    socket.on('event_connected', function (data) {
        $scope.msg = data;
        $scope.$apply();
        console.log("Client : " + data);

        // ping back to server
        socket.emit('pingToServer', {'socketId': socket.id, 'operatorId': '1005'});

    });


    /**
     * Disconnect from server
     */
    socket.on('disconnect', function (socket) {
        $scope.msg = socket;
        $scope.$apply();
        console.log("Client : Connection dropped by server.");
    });



});




$(document).ready(function () {

});


