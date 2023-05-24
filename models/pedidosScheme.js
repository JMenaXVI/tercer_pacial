const {Schema, model} = require('mongoose');

const PedidoScheme = Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    fecha: {
        type: Date,
        required: true
    }
},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

module.exports = model("Pedido", PedidoScheme);