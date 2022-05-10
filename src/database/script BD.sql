CREATE DATABASE IRRIGATECH;

USE IRRIGATECH;

CREATE TABLE Usuario(
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
cpf CHAR(11),
nome_cli VARCHAR(100),
email VARCHAR(45),
senha VARCHAR(45),
tel_cel VARCHAR(15)
);

CREATE TABLE Empresa(
id_empresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(14),
nome_emp VARCHAR(100),
segmento VARCHAR(60),
tel_com VARCHAR(15),
fkempresa_filiais INT,
FOREIGN KEY (fkempresa_filiais) REFERENCES empresa(Id_empresa)
);

CREATE TABLE login (
fk_usuario INT,
fk_empresa INT,
email_funcionario VARCHAR(45),
senha_funcionario VARCHAR(45),
nome_funcionario VARCHAR(45),
foreign key (fk_usuario) references usuario(id_usuario),
foreign key (fk_empresa) references empresa(id_empresa),
primary key (fk_usuario, fk_empresa)
);

CREATE TABLE Setor(
id_setor INT PRIMARY KEY AUTO_INCREMENT,
setor VARCHAR(45),
fkempresa INT,
FOREIGN KEY (fkempresa) REFERENCES empresa(Id_empresa)

);

CREATE TABLE Sensor(
id_sensor INT PRIMARY KEY AUTO_INCREMENT,
tipo_sensor VARCHAR(45),
fksetor INT,
FOREIGN KEY (fksetor) REFERENCES setor(Id_setor)
);

CREATE TABLE Dados_sensor(
id_dados INT,
hora_sensor DATETIME,
umidade VARCHAR(10),
temperatura VARCHAR(10),
fksensor INT,
FOREIGN KEY (fksensor) REFERENCES Sensor(id_sensor), 
PRIMARY KEY (id_dados,fksensor)
);