USE DevelDB;


create table Usuario(
	idUsuario INT IDENTITY(1,1) PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
);

create table Tipo(
	idTipo INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL
);

create table Encuesta(
	idEncuesta INT IDENTITY(1,1) PRIMARY KEY,
	nombre VARCHAR(150) NOT NULL,
	descripcion TEXT NOT NULL,
	idUsuario INT NOT NULL,
	CONSTRAINT FK_Encuesta_Usuario FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

create table Campo(
	idCampo INT IDENTITY (1,1) PRIMARY KEY,
	nombre VARCHAR(150) NOT NULL,
	titulo VARCHAR(150) NOT NULL,
	isRequerido BIT NOT NULL,
	idTipo INT NOT NULL,
	idEncuesta INT NOT NULL,
	CONSTRAINT FK_Tipo_Campo FOREIGN KEY (idTipo) REFERENCES Tipo (idTipo),
	CONSTRAINT FK_Encuesta_Campo FOREIGN KEY (idEncuesta) REFERENCES Encuesta(idEncuesta) ON DELETE CASCADE
);

create table Respuesta(
	idRespuesta INT IDENTITY(1,1) PRIMARY KEY,
	valor VARCHAR(200) NOT NULL,
	idCampo INT NOT NULL,
	CONSTRAINT FK_idCampo_Respuesta FOREIGN KEY (idCampo) REFERENCES Campo (idCampo)

);




insert into Usuario (username,password) values('devel', 'devel');
insert into Tipo(nombre) values('fecha');
insert into Tipo(nombre) values('texto');
insert into Tipo(nombre) values('numero');
select * from Tipo;
select * from Usuario;
