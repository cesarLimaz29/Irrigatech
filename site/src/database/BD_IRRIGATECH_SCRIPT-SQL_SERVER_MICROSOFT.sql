CREATE DATABASE irrigatech;

USE irrigatech;

CREATE TABLE Usuario(
id_usuario INT PRIMARY KEY IDENTITY,
cpf CHAR(11),
nome_cli VARCHAR(100),
email VARCHAR(45),
senha VARCHAR(45),
tel_cel VARCHAR(15),
fkempresa INT,
FOREIGN KEY (fkempresa) REFERENCES empresa(id_empresa);
);

CREATE TABLE Empresa(
id_empresa INT PRIMARY KEY IDENTITY,
cnpj CHAR(14),
nome_emp VARCHAR(100),
segmento VARCHAR(60),
tel_com VARCHAR(15),
fkempresa_filiais INT,
FOREIGN KEY (fkempresa_filiais) REFERENCES empresa(id_empresa),
);

CREATE TABLE Sensor(
id_sensor INT PRIMARY KEY IDENTITY,
tipo_sensor VARCHAR(45),
fkempresa INT,
FOREIGN KEY (fkempresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE Dados_sensor(
id_dados INT IDENTITY(1,1),
fksensor INT,
FOREIGN KEY (fksensor) REFERENCES Sensor(id_sensor), 
PRIMARY KEY (id_dados,fksensor),
umidade VARCHAR(10),
temperatura VARCHAR(10),
hora_sensor DATETIME DEFAULT CURRENT_TIMESTAMP
);
