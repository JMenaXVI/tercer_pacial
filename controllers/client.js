const express = require('express');
const pedidoScheme = require('../models/pedidosScheme');
const coordsScheme = require('../models/coordsScheme');
const { generarCoordenadas } = require('../helpers/generarCoordenadas');

const crearPedido = async (req, res = express.response) => {
    const { id, fecha } = req.body
    try {
        let pedido = await pedidoScheme.findOne({ id })
        if (pedido) {
            return res.status(400).json({
                ok: false,
                msg: 'El pedido ya ha sido creado antes.'
            })
        }

        pedido = new pedidoScheme( req.body );
        await pedido.save();
        let coordsGeneradas = generarCoordenadas(90);
        let coordenadas = new coordsScheme({x:coordsGeneradas.x, y:coordsGeneradas.y, pedido_id: req.body.id});
        await coordenadas.save();

        res.status(200).json({
            ok: "Pedido creado!",
            id,
            fecha
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: error
        })
    }
}

const imprimirCoordenadas = async(req, res = express.response) => {
    const { id } = req.body;
    try {
        let pedido = await coordsScheme.findOne({ pedido_id: id })
        if (pedido) {
            return res.status(200).json({
                ok: true,
                msg: 'Las coordenadas son:' + "x: " + pedido.x + " y y: " + pedido.y
            })
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'La ID de este pedido no existe...'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: error
        })
    }
}

module.exports = { crearPedido, imprimirCoordenadas };