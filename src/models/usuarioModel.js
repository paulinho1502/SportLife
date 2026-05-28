var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function favoritar(idUsuario, atletaFavorito) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function favoritar():", idUsuario, atletaFavorito);
    var instrucaoSql = `
        UPDATE usuario SET atleta_favorito = '${atletaFavorito}' WHERE id = ${idUsuario}
    `;

    return database.executar(instrucaoSql);
}

function buscarDashboard(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarDashboar():");
    var instrucaoSql = `
        SELECT 
        u.nome, 
        u.atleta_favorito, 
        r.futebol, 
        r.basquete, 
        r.corrida, 
        r.natacao,

        (SELECT COUNT(*) FROM usuario) AS totalUsuarios,

        (
            SELECT
                CASE
                    WHEN SUM(futebol) >= SUM(basquete)
                    AND SUM(futebol) >= SUM(corrida)
                    AND SUM(futebol) >= SUM(natacao)
                    THEN 'Futebol'

                    WHEN SUM(basquete) >= SUM(futebol)
                    AND SUM(basquete) >= SUM(corrida)
                    AND SUM(basquete) >= SUM(natacao)
                    THEN 'Basquete'

                    WHEN SUM(corrida) >= SUM(futebol)
                    AND SUM(corrida) >= SUM(basquete)
                    AND SUM(corrida) >= SUM(natacao)
                    THEN 'Corrida'

                    ELSE 'Natação'
                END
            FROM resultado_quiz
        ) AS esporteMaisIndicado,

        (SELECT COUNT(*) 
         FROM usuario 
         WHERE atleta_favorito = 'Neymar Jr') AS neymar,

        (SELECT COUNT(*) 
         FROM usuario 
         WHERE atleta_favorito = 'Kobe Bryant') AS kobe,

        (SELECT COUNT(*) 
         FROM usuario 
         WHERE atleta_favorito = 'Michael Phelps') AS phelps,

        (SELECT COUNT(*) 
         FROM usuario 
         WHERE atleta_favorito = 'Usain Bolt') AS bolt

    FROM usuario u
    JOIN resultado_quiz r
        ON u.id = r.fkUsuario

    WHERE u.id = ${idUsuario}

    ORDER BY r.dataQuiz DESC
    LIMIT 1
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql)
}


module.exports = {
    autenticar,
    cadastrar,
    favoritar,
    buscarDashboard
};