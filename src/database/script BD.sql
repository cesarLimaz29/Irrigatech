CREATE DATABASE IRRIGATECH;

USE IRRIGATECH;

CREATE TABLE Usuario(
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
cpf CHAR(11) NOT NULL,
nome_cli VARCHAR(100) NOT NULL,
email VARCHAR(45) NOT NULL,
senha VARCHAR(45) NOT NULL,
tel_cel VARCHAR(15),
fk_empresa INT NOT NULL,
fk_administrador INT,
foreign key (fk_administrador) references usuario(id_usuario)
);

CREATE TABLE Empresa(
id_empresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(14) NOT NULL,
nome_emp VARCHAR(100) NOT NULL,
tel_com VARCHAR(15),
fkempresa_filiais INT,
FOREIGN KEY (fkempresa_filiais) REFERENCES empresa(Id_empresa)
);

alter table usuario add foreign key (fk_empresa) references empresa(id_empresa);

CREATE TABLE Setor(
id_setor INT PRIMARY KEY AUTO_INCREMENT,
setor VARCHAR(45) NOT NULL,
fkempresa INT,
FOREIGN KEY (fkempresa) REFERENCES empresa(Id_empresa)
);

CREATE TABLE acesso(
id_acesso INT auto_increment,
fk_usuario INT,
foreign key (fk_usuario) references usuario(id_usuario),
fk_setor INT,
foreign key (fk_setor) references setor(id_setor),
primary key (id_acesso, fk_usuario, fk_setor)
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