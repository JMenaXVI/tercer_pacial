const {Schema, model} = require('mongoose');

const CoordScheme = Schema({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    pedido_id : {
        type: Number,
        ref: 'Pedido'
    }
},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

module.exports = model("Coordenadas", CoordScheme);