var app = require('http').createServer();
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);


io.on('connection', function (socket) {

  socket.emit('event_connected', socket.id);
  console.log("$ Socket "+socket.id+" connected.");




  socket.on('pingToServer', function(data){
    console.log("$ Client :"+ data.socketId);
    console.log("$ Client :"+ data.operatorId);
  });




  socket.on('disconnect', function(){
      console.log("$ Socket "+ socket.id+" disconnected.");
  });

  
});
