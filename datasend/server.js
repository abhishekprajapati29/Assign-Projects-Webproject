

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser,getName, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  console.log('User '+ socket.id )
  socket.on('join', ({ name, room }, callback) => {
    socket.join(room);
    const { user } = addUser({ id: socket.id, name, room });
    console.log(user.room, user.name, getUsersInRoom(user.room))

    callback();
  });

  socket.on('notificationSent', ({name, room,message}) => {
    var user = getUser(socket.id);
    io.to(room).emit('message', { user: name, message: message });
    socket.broadcast.to(room).emit('notificationSent', {name,room,message})
  });

  socket.on('invoiceSent', ({name, room,sendTo,message}) => {
    var send = getName(sendTo)[0];
    io.to(send.id).emit('message', { user: name, message: message });
    socket.broadcast.to(send.id).emit('invoiceSent', {name, room,sendTo,message})
  });

  socket.on('messageSent', ({name, room,sendTo,message}) => {
    var send = getName(sendTo)[0];
    io.to(send.id).emit('message', { user: name, message: message });
    socket.broadcast.to(send.id).emit('messageSent', {name, room,sendTo,message})
  });

  socket.on('addUser', ({name, room,sendTo,message}) => {
    const send = getName(sendTo)[0];
    if(getName(sendTo).length>0){
      console.log(send.id)
    console.log(getName(sendTo), room, message, name, sendTo)
    io.to(send.id).emit('message', { user: name, message: message });
    socket.broadcast.to(send.id).emit('addUser', {name, room,sendTo,message})
    }
    
    
  });

  // socket.on('addUser', ({name, room,sendTo,message}) => {
  //   const send = getName(sendTo)[0];
  //   if(getName(sendTo).length>0){
  //     console.log(send.id)
  //   console.log(getName(sendTo), room, message, name, sendTo)
  //   io.to(send.id).emit('message', { user: name, message: message });
  //   socket.broadcast.to(send.id).emit('addUser', {name, room,sendTo,message})
  //   }
    
    
    
  // });

  socket.on('sendUserImage', ({name,message}) => {
    console.log('asdf')
    var send = getName(name)[0];
    if(getName(name).length>0){
    io.to(send.id).emit('message', { user: name, message: message });
    socket.broadcast.emit('sendUserImage', {name,message})
    console.log('asdf1')
    }
    
  });

  socket.on('acceptUserAgain', ({name, room,message}) => {
    
    io.to(room).emit('message', { user: name, message: message });
    socket.broadcast.to(room).emit('acceptUserAgain', {name,room,message})
    
  });

  socket.on('acceptOther', ({name, room,message}) => {
    
    io.to(room).emit('message', { user: name, message: message });
    socket.broadcast.to(room).emit('acceptOther', {name,room,message})
    
  });
  socket.on('acceptUsertoback', ({name, room,sendTo,message}) => {
    const send = getName(sendTo)[0];
    if(getName(sendTo).length>0){
      
    socket.broadcast.to(send.id).emit('acceptUsertoback', {name, room,sendTo,message})
    io.to(send.id).emit('message', { user: name, message: message });
    }
    
    
  });


  socket.on('userLeave', ({name, room,message}) => {
    io.to(room).emit('message', { user: name, message: message });
    socket.broadcast.to(room).emit('userLeave', {name,room,message})
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
    
  })
});

server.listen(process.env.PORT || 3001, () => console.log(`Server has started.`));
