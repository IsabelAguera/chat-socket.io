const path = require('path'); //
const express = require('express'); // configurar express e inicializarlo
const app = express(); // se guarda en la constante app




//settings

app.set('port', 3000); //configuramos el puerto (si hay algun configurado decimos process.env.PORT)



//static files (porque por lo general no cambian)

app.use(express.static(path.join(__dirname, 'public'))); //se usa modulo de express static pero hay que decir donde estan situados y utilizamos un modulo de node.js llamado path para poder unir directorios.

//__dirname es una constante de nodejs que guarda la ruta, y gracias a path.join va a enviar public al navegardor  

//start the server
const server = app.listen(3000, () => {
    console.log('server on port', app.get('port'));
});




//Websockets

const SocketIo = require('socket.io');
const io = SocketIo(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data)
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
});


