const io = require('socket.io')(8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const users = {};

io.on('connection', (socket) => {
    socket.on('new-user-joined', (username) => {
        users[socket.id] = username;
        socket.broadcast.emit('user-joined', username);
    })

    socket.on('send', (message) => {
        socket.broadcast.emit('receive', {message: message, username: users[socket.id]});
    })

    socket.on('disconnect', (message) => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})