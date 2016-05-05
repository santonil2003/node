var webApp = angular.module('webApp',[]);


var socket = io('http://127.0.0.1:8080/');


webApp.controller('webAppCtrl', function ($scope) {

  socket.on('event1', function (data) {
    $scope.items = data;	
    $scope.$apply();
  });

});

$(document).ready(function(){
	$('body').click(function(){

		
	 var base = Math.floor((Math.random() * 100) + 1); 
         var data = [
		{id:base+1, name:'sanil'},
		{id:base+2, name:'ram'},
		{id:base+3, name: 'hari'}
	     ];

 	socket.emit('event2', data);


	});

});


