var quizModel = require('../models/quizModel')

function salvar(req, res) {
    var futebolPontuacao = req.body.futebolServer
    var basquetePontuacao = req.body.basqueteServer
    var corridaPontuacao = req.body.corridaServer
    var natacaoPontuacao = req.body.natacaoServer

    quizModel.inserir(futebolPontuacao, basquetePontuacao, corridaPontuacao, natacaoPontuacao)

    .then(function(){
        res.status(201).send("Pontuação mandada")
    })

    .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
}

module.exports ={
    salvar
}