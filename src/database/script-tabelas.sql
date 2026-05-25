-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE SportLife;
USE SportLife;

CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR (45),
senha VARCHAR(45),
atleta_favorito VARCHAR (45));

CREATE TABLE resultado_quiz (
idResulado INT PRIMARY KEY AUTO_INCREMENT,
futebol DECIMAL(5,2),
basquete DECIMAL(5,2),
corrida DECIMAL(5,2),
natacao DECIMAL(5,2),
dataQuiz DATETIME DEFAULT CURRENT_TIMESTAMP,
fkUsuario INT,
CONSTRAINT fkUsuarioResultado
FOREIGN KEY (fkUuario) REFERENCES usuario (id));


SELECT usuario.* FROM usuario
JOIN resultado_quiz ON usuario.id = resultado_quiz.fkUsuario;


SELECT * FROM usuario;
SELECT * FROM resultado_quiz;