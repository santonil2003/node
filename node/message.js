var app = require('http').createServer();
app.listen(8080);


var io = require('socket.io')(app);

var fs = require("fs");
var file = "message.db";
var exists = fs.existsSync(file);


/**
 *  check if db exists
 * @param {type} param
 */
if (!exists) {
    console.log("Creating database.....\r");
    fs.openSync(file, "w");
}


/**
 * database related
 * @type @call;require@call;verbose
 */
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function () {
    if (!exists) {
        db.run("CREATE TABLE `message`(`id` INTEGER PRIMARY KEY AUTOINCREMENT, `sender` TEXT, `recipient` TEXT, `message` TEXT, `sent_date` TEXT, `seen` INTEGER DEFAULT '0')");
    }
});


var message = {
    'send': function (sender, recipient, message, sent_date) {
        db.run("INSERT INTO message (sender, recipient, message, sent_date) VALUES ('" + sender + "', '" + recipient + "','" + message + "','" + sent_date + "')");
    },
    'get': function (recipient) {
        db.all("select * from message where recipient = '" + recipient + "'", function (err, rows) {
            for (i = 0; i < rows.length; i++) {
                var row = rows[i];
                db.run("update message set seen = 1 where id = " + row.id);
            }

            console.log(row);
        });
    }
};


io.on('connection', function (socket) {

    socket.emit('assignSocketIdToClient', socket.id);

    /**
     * get message
     */
    socket.on('getMessage', function (data) {

        var user = data.sender;

        db.all("select * from message where recipient = '" + user + "'", function (err, rows) {

            for (i = 0; i < rows.length; i++) {
                var row = rows[i];
                db.run("update message set seen = 1 where id = " + row.id);
            }


            socket.emit('newMessages', rows);
        });
    });


    /**
     * send message
     */
    socket.on('sendMessage', function (data) {

        var sender = data.sender;
        var recipient = data.recipient;
        var message = data.message;
        var sent_date = Math.round(new Date().getTime() / 1000);


        db.run("INSERT INTO message (sender, recipient, message, sent_date) VALUES ('" + sender + "', '" + recipient + "','" + message + "','" + sent_date + "')");

    });




});



db.close();