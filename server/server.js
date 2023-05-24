const express = require('express');
require("dotenv").config();
const { dbConnection } = require('../database/config'); 
const cors = require('cors');
const { socketController } = require('../sockets/controllers');

class Server {
    constructor() {
        this.headers = {
            cors: {
                origin: 'http://127.0.0.1:5173',
                methods: ["GET", "POST"]
            }
        }

        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server, this.headers);

        this.path = {
            pedidos: '/api/pedidos'
        }

        this.connectToDB();
        this.addMiddlewares();
        this.setRoutes();

        this.sockets();
    }

    async connectToDB() {
        await dbConnection();
    }

    addMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    setRoutes() {
        this.app.use(this.path.pedidos, require('../routes/client'));
    }

    sockets() {
        this.io.on('Connection', socket => socketController(socket, this.io));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en puerto: ' + process.env.PORT);
        })
    }
}

module.exports = Server
