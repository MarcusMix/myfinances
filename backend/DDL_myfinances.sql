DROP DATABASE IF EXISTS myfinances;
CREATE DATABASE myfinances;
USE myfinances;

create table usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY,
	email varchar(255) unique not null,
	nome varchar(255) not null,
	senha varchar(255) not null,
	dt_nascimento date not null
);

CREATE TABLE despesas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    icone VARCHAR(255) NOT NULL,
    mes INT NOT NULL,
    ano INT NOT NULL,
    usuario_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE limites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10, 2) NOT NULL,
    mes INT NOT NULL,
    ano INT NOT NULL,
    usuario_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);