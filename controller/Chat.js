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
          socketId: socket.id,
          status: USER_STATUS[0]
        };
    })

    socket.on('private_chat', (params, fn) => {
        const receiver = users[params.receiver];
        params.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const senderData = _.findWhere(userData, { username: params.sender });
        params.senderPhoto = (senderData || {}).photo;
      
        if (!params.senderPhoto) {
          const senderLen = params.sender.length;
          params.senderPhotoNickname = params.sender.substr(senderLen - 2)
        }

        // fn(params);

        if (receiver && receiver.status === USER_STATUS[0]) {
          socket.to(users[params.receiver].socketId).emit('reply_private_chat', params);
        } else {
          console.log(`${params.receiver} 不在线`);
          // 可以在做些离线消息推送处理
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