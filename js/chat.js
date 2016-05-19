var webApp = angular.module('webApp', []);

var socket = io('http://127.0.0.1:8080/');

webApp.controller('webAppCtrl', function ($scope) {


    var clientId = new Date().valueOf();

    /**
     * Listen to server event
     */
    socket.on('server_connected', function (data) {
        $scope.msg = data;
        $scope.$apply();

        // ping back to server
        socket.emit('pingToServer', {'socketId': socket.id, 'operatorId': clientId});

    });


    /**
     * connected clietns
     */
    socket.on('connected_clients', function (data) {
        $scope.clients = data;
        $scope.$apply();
        console.log(data);
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


