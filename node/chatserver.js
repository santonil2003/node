var app = require('http').createServer();
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);


var clients = {};

io.on('connection', function (socket) {

    socket.emit('server_connected', socket.id);


    socket.on('pingToServer', function (data) {

        clients[data.socketId] = data.operatorId;

        console.log(clients);

        // send message to only sender
        socket.emit('connected_clients', clients);
        
        // send message to every one except sender
        socket.broadcast.emit('connected_clients', clients);


    });




    socket.on('disconnect', function () {
        console.log("$ Socket " + socket.id + " disconnected.");
        
        
        /**
         * delete enntry form array
         */
        var key = socket.id;
        key = key.replace('/#',"");
        
        
        delete clients[key];
        
        
        console.log(clients);
        
        socket.broadcast.emit('connected_clients', clients);
    });



});
