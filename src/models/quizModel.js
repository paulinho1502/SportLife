var database = require("../database/config")

function inserir(idUsuario, futebolPontuacao, basquetePontuacao, corridaPontuacao, natacaoPontuacao) {
    console.log("estou aqui")
    console.log("Executando instrução mySQL")

    var sql = `INSERT INTO resultado_quiz (fkUsuario, futebol, basquete, corrida, natacao) VALUES 
    ('${idUsuario}', '${futebolPontuacao}', '${basquetePontuacao}', '${corridaPontuacao}', '${natacaoPontuacao}'); `

     console.log("Executando a instrução SQL: \n" + sql);

     return database.executar(sql)
}

module.exports = {
    inserir
}