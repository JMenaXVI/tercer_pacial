const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { crearPedido, imprimirCoordenadas} = require("../controllers/client");
const { validarRequest } = require('../middlewares/validar-request');

router.post(
    '/', 
    [
        check("id", "La ID es obligatoria").not().isEmpty(),
        check("fecha", "La fecha es obligatoria").isDate(),
        validarRequest
    ], 
    crearPedido)

router.get(
    '/getCoords',
    [
        check("id", "La ID es obligatoria").not().isEmpty(),
        validarRequest
    ],
    imprimirCoordenadas)

module.exports = router;