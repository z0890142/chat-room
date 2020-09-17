const socket = require("socket.io");
const server=require('http').createServer();
const io = require('socket.io')(server);
var logger = require('../config/logconfig.js').logger('default', 'info');
const users ={}
const USER_STATUS = ['ONLINE', 'OFFLINE'];

ScoketStart()

function ScoketStart(){
    server.listen(8084)
    logger.info("socket server start")
}

io.on('connection', socket => {
  socket.on('online', function(username){
    socket.username = username;
    users[username] = {
      username:username,
      socketId: socket.id,
      status: USER_STATUS[0]
    };

    var userList=[];
    var keys=Object.keys(users)
    keys.forEach(element => {
      if (users[element]['status']==USER_STATUS[0]){
        userList.push(element)
      }
    });
    socket.broadcast.emit('getmember',userList)
  })

  socket.on('private_chat', (params, fn) => {
    const receiver = users[params.receiver];
    if (receiver && receiver.status === USER_STATUS[0]) {
      socket.to(users[params.receiver].socketId).emit('reply_private_chat', params);
    } else {
      console.log(`${params.receiver} offline`);
    }
  });
      
  socket.on('disconnect', reason => {
    if (users[socket.username]) users[socket.username].status = USER_STATUS[1];
  });
});

exports.ChatWithFriend= function(req, res) {
    var user = new Model("User", req.body);	
    user.save(function(error,result) {
        if (error)
            res.send({result:"ERROR", message: error});
        else {
            res.send({result:"OK", message: 'User registered'});
        }
    })
}


exports.UserList= function(req, res) {
  var userList=[];
  var keys=Object.keys(users)
  keys.forEach(element => {
    if (users[element]['status']==USER_STATUS[0]){
      userList.push(element)
    }
  });
  res.send({result:"OK", data: userList});
      
  
}