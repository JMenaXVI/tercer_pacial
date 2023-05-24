const numeroRandom = (value) => {
    return Math.floor(Math.random() * value)
}

const generarCoordenadas = (valorMaximo) => {
    let x = 0;
    let y = 0;

    x = numeroRandom(valorMaximo);
    y = numeroRandom(valorMaximo);

    return {x,y}
}

module.exports = { generarCoordenadas }