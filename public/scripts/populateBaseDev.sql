USE procare_db_dev;
/* ETAPAS */
INSERT INTO Etapas(nombre, createdAt, updatedAt) VALUES ('Primera etapa', now(), now());
INSERT INTO Etapas(nombre, createdAt, updatedAt) VALUES ('Segunda etapa', now(), now());
INSERT INTO Etapas(nombre, createdAt, updatedAt) VALUES ('Tercera etapa', now(), now());
INSERT INTO Etapas(nombre, createdAt, updatedAt) VALUES ('Cuarta etapa', now(), now());
INSERT INTO Etapas(nombre, createdAt, updatedAt) VALUES ('Quinta etapa', now(), now());
INSERT INTO Etapas(nombre, createdAt, updatedAt) VALUES ('Iniciación', now(), now());
/* NIVELES */
INSERT INTO Nivels(nombre, createdAt, updatedAt) VALUES ('Nivel 1', now(), now());
INSERT INTO Nivels(nombre, createdAt, updatedAt) VALUES ('Nivel 2', now(), now());
INSERT INTO Nivels(nombre, createdAt, updatedAt) VALUES ('Nivel 3', now(), now());
INSERT INTO Nivels(nombre, createdAt, updatedAt) VALUES ('Nivel 4', now(), now());
INSERT INTO Nivels(nombre, createdAt, updatedAt) VALUES ('Nivel 5', now(), now());
/* ROLES */
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Procare Formacion', 'este es un director de formacion', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Centro', 'este es un director de centro', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Personal', 'este es parte del personal', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Ejecutivo', 'este es parte del director ejecutivo', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Animador', 'este es parte del animador', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Asesor', 'este es parte del asesor', now(), now());
/* TIPOS */
INSERT INTO Tipos(nombre, createdAt, updatedAt) VALUES ('Chico Formación', now(), now());
INSERT INTO Tipos(nombre, createdAt, updatedAt) VALUES ('Caminante', now(), now());
INSERT INTO Tipos(nombre, createdAt, updatedAt) VALUES ('Pescador', now(), now());
INSERT INTO Tipos(nombre, createdAt, updatedAt) VALUES ('Pescador Consagrado', now(), now());
INSERT INTO Tipos(nombre, createdAt, updatedAt) VALUES ('Sacerdote', now(), now());
INSERT INTO Tipos(nombre, createdAt, updatedAt) VALUES ('Mayor', now(), now());


/* PERSONAS */
/* DIRECTOR EJECUTIVO */
INSERT INTO Personas (cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) VALUES('0123456789', 'FUNDACION', 'PROCARE', 'Urdesa', '1995-06-01', 'masculino', 'procarewebapp@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO PersonaRol VALUES (now(), null, now(), now(), 1, 'Director Ejecutivo');
/* PERSONAL */
INSERT INTO  Personas (cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) VALUES('0987654321', 'Personal', 'Personal', 'Urdesa', '2000-07-01', 'masculino', 'personal@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO PersonaRol VALUES (now(), null, now(), now(), 2, 'Personal');
/* BENEFACTOR */
INSERT INTO `procare_db_dev`.`personas` (`cedula`, `nombres`, `apellidos`, `razonSocial`, `direccion`, `fechaNacimiento`, `genero`, `email`, `createdAt`, `updatedAt`) VALUES ('0927102858', 'Benefactor', 'Benefactor', 'razonsocial', 'sur', '1995-12-16 08:38:18', 'masculino', 'benefactor@gmail.com', '2017-12-16 08:38:40', '2017-12-16 08:38:41');
INSERT INTO `procare_db_dev`.`benefactors` (`valorContribucion`, `diaCobro`, `tarjetaCredito`, `tipoDonacion`, `estado`, `nombreGestor`, `relacion`, `createdAt`, `updatedAt`, `PersonaId`) VALUES ('150', '15', '4027493056892012', 'mensual', 'activo', 'Edison Mora', 'Amigo', '2017-12-16 08:40:05', '2017-12-16 08:40:06', '3');
/* ANIMADOR */
INSERT INTO Personas (cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
							VALUES('0123456784', 'ANIMADOR', 'ANIMADOR', 'Urdesa', '1995-06-01', 'masculino', 'animador@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO PersonaRol VALUES (now(), null, now(), now(), 4, 'Animador');
/* DIRECTOR FORMACIÓN */
INSERT INTO Personas (cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
							VALUES('0123454484', 'DIRECTOR', 'FORMACIÓN', 'Urdesa', '1995-06-01', 'masculino', 'director.formacion@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO PersonaRol VALUES (now(), null, now(), now(), 5, 'Director Procare Formacion');
/* DIRECTOR CENTRO */
INSERT INTO Personas (cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
							VALUES('0123454184', 'DIRECTOR', 'CENTRO', 'Urdesa', '1995-06-01', 'masculino', 'director.centro@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO PersonaRol VALUES (now(), null, now(), now(), 6, 'Director Centro');
/* ASESOR */
INSERT INTO Personas (cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
							VALUES('0123254484', 'ASESOR', 'NIVEL', 'Urdesa', '1995-06-01', 'masculino', 'asesor@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO PersonaRol VALUES (now(), null, now(), now(), 7, 'Asesor');