const mongoose = require('mongoose');

const Produto = mongoose.model('Produto', {
    id: Number,
    nome: String,
    descricao: String,
    cor: String,
    peso: Number,
    tipo: String,
    preco: Number,
    data_cadastro: Date
})

module.exports = Produto