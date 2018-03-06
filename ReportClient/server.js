'use strict'
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = process.env.PORT || 1337;

var clientInfo = {};

// Path to app directive
app.use(express.static(__dirname+'/ngapp'));

// Path to Node modules
app.use('/node_modules',express.static(__dirname+'/node_modules'));

io.on('connection',function(socket){
   console.log('User is connected to socket.io');

   socket.on('disconnect', function(){
       var userData = clientInfo[socket.id];
       if(typeof userData !== 'undefined'){
          socket.leave(userData.room);
          delete clientInfo[socket.id];
       }
   });

   socket.on('joinRoom', function(req){
      console.log(req.name+" has joined");
      clientInfo[socket.id] = req;
      socket.join(req.room);
   });

   socket.on('message', function(message){
      //io.to(message.user[0].text).emit('message', message);
      io.sockets.in(message.user[0].text).emit('message',message);
   });

});

// Connect to Server
http.listen(PORT,function(err){
    if(err)
        console.log(err);
    else
        console.log('Server running on: '+PORT);
});
