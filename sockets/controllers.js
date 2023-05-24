const socketControllers = (socket, io) => {

    console.log('Cliente Conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente Desconectado', socket.id);
    })

    socket.on('mensaje-de-cliente', (payload, callback) => {
        callback('Tu mensaje fue recibido!');

        payload.from = 'desde-el-server';
        socket.broadcast.emit('mensaje-del-server',payload);
    })
}

module.exports = { socketControllers }