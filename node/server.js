var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/data.json',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
 
  var data = [
		{id:1, name:'sanil'},
		{id:2, name:'ram'},
		{id:3, name: 'hari'}
	     ]; 

  socket.emit('event1', data);


  socket.on('event2', function (data) {
	console.log(data);
   	socket.emit('event1', data);
  });


});
