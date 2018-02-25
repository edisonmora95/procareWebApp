USE procare_db_test;
/* ETAPAS */
INSERT INTO `etapas`(nombre, createdAt, updatedAt) VALUES ('Primera etapa', now(), now());
INSERT INTO `etapas`(nombre, createdAt, updatedAt) VALUES ('Segunda etapa', now(), now());
INSERT INTO `etapas`(nombre, createdAt, updatedAt) VALUES ('Tercera etapa', now(), now());
INSERT INTO `etapas`(nombre, createdAt, updatedAt) VALUES ('Cuarta etapa', now(), now());
INSERT INTO `etapas`(nombre, createdAt, updatedAt) VALUES ('Quinta etapa', now(), now());
INSERT INTO `etapas`(nombre, createdAt, updatedAt) VALUES ('Iniciacion', now(), now());
/* NIVELES */
INSERT INTO `nivels`(nombre, createdAt, updatedAt) VALUES ('Nivel 1', now(), now());
INSERT INTO `nivels`(nombre, createdAt, updatedAt) VALUES ('Nivel 2', now(), now());
INSERT INTO `nivels`(nombre, createdAt, updatedAt) VALUES ('Nivel 3', now(), now());
INSERT INTO `nivels`(nombre, createdAt, updatedAt) VALUES ('Nivel 4', now(), now());
INSERT INTO `nivels`(nombre, createdAt, updatedAt) VALUES ('Nivel 5', now(), now());
/* ROLES */
INSERT INTO `rols`(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Procare Formacion', 'este es un director de formacion', now(), now());
INSERT INTO `rols`(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Centro', 'este es un director de centro', now(), now());
INSERT INTO `rols`(nombre, descripcion, createdAt, updatedAt) VALUES ('Personal', 'este es parte del personal', now(), now());
INSERT INTO `rols`(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Ejecutivo', 'este es parte del director ejecutivo', now(), now());
INSERT INTO `rols`(nombre, descripcion, createdAt, updatedAt) VALUES ('Animador', 'este es parte del animador', now(), now());
INSERT INTO `rols`(nombre, descripcion, createdAt, updatedAt) VALUES ('Asesor', 'este es parte del asesor', now(), now());
/* TIPOS */
INSERT INTO `tipos`(nombre, createdAt, updatedAt) VALUES ('Chico Formacion', now(), now());
INSERT INTO `tipos`(nombre, createdAt, updatedAt) VALUES ('Caminante', now(), now());
INSERT INTO `tipos`(nombre, createdAt, updatedAt) VALUES ('Pescador', now(), now());
INSERT INTO `tipos`(nombre, createdAt, updatedAt) VALUES ('Pescador Consagrado', now(), now());
INSERT INTO `tipos`(nombre, createdAt, updatedAt) VALUES ('Sacerdote', now(), now());
INSERT INTO `tipos`(nombre, createdAt, updatedAt) VALUES ('Mayor', now(), now());


/* PERSONAS */
/* DIRECTOR EJECUTIVO */
INSERT INTO `personas` (cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
              VALUES('0123456789', 'FUNDACION', 'PROCARE', 'Urdesa', '1995-06-01', 'masculino', 'procarewebapp@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO `personarol` 
              VALUES (now(), null, now(), now(), 1, 'Director Ejecutivo');
/* PERSONAL */
INSERT INTO  `personas` (cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
              VALUES('0987654321', 'Personal', 'Personal', 'Urdesa', '2000-07-01', 'masculino', 'personal@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO `personarol` 
              VALUES (now(), null, now(), now(), 2, 'Personal');
/* BENEFACTOR */
INSERT INTO `personas` (`cedula`, `nombres`, `apellidos`, `razonSocial`, `direccion`, `fechaNacimiento`, `genero`, `email`, `createdAt`, `updatedAt`) 
              VALUES ('0927102858', 'Benefactor', 'Benefactor', 'razonsocial', 'sur', '1995-12-16 08:38:18', 'masculino', 'benefactor@gmail.com', '2017-12-16 08:38:40', '2017-12-16 08:38:41');
INSERT INTO `benefactors` (`valorContribucion`, `diaCobro`, `tarjetaCredito`, `tipoDonacion`, `estado`, `nombreGestor`, `relacion`, `createdAt`, `updatedAt`, `PersonaId`) 
              VALUES ('150', '15', '4027493056892012', 'mensual', 'activo', 'Edison Mora', 'Amigo', '2017-12-16 08:40:05', '2017-12-16 08:40:06', '3');
/* ANIMADOR */
INSERT INTO `personas` (cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
              VALUES('0123456784', 'ANIMADOR', 'ANIMADOR', 'Urdesa', '1995-06-01', 'masculino', 'animador@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO `personarol` 
              VALUES (now(), null, now(), now(), 4, 'Animador');
INSERT INTO `procarianos` (colegio, universidad, estado, createdAt ,updatedAt, PersonaId)
              VALUES  ('COLEGIO', 'UNIVERSIDAD', 'activo', now(), now(), 4);
/* DIRECTOR FORMACIÓN */
INSERT INTO `personas` (cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
              VALUES('0123454484', 'DIRECTOR', 'FORMACIÓN', 'Urdesa', '1995-06-01', 'masculino', 'director.formacion@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO `personarol` 
              VALUES (now(), null, now(), now(), 5, 'Director Procare Formacion');
/* DIRECTOR CENTRO */
INSERT INTO `personas` (cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
              VALUES('0123454184', 'DIRECTOR', 'CENTRO', 'Urdesa', '1995-06-01', 'masculino', 'director.centro@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO `personarol` 
              VALUES (now(), null, now(), now(), 6, 'Director Centro');
/* ASESOR */
INSERT INTO `personas` (cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
              VALUES('0123254484', 'ASESOR', 'NIVEL', 'Urdesa', '1995-06-01', 'masculino', 'asesor@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO `personarol` 
              VALUES (now(), null, now(), now(), 7, 'Asesor');


/* TESTS */

/* Grupo a utilizarse para tests de grupo, grupoetapa y animador */
INSERT INTO `grupos` (id, nombre, tipo, cantidadChicos, numeroReuniones, genero, createdAt, updatedAt)
              VALUES(1, 'Grupo test', 'Formación', 0, 0, 'Procare', now(), now());
INSERT INTO `grupoetapa` (fechaInicio, fechaFin, createdAt, updatedAt, EtapaId, GrupoId)
              VALUES (now(), null, now(), now(), 1, 1);
/* Se le añade como animador al animador con idProcariano = 1 */              
INSERT INTO `animadores` (id, fechaInicio, fechaFin, createdAt, updatedAt, ProcarianoId, GrupoId)
              VALUES (1, now(), null, now(), now(), 1, 1);
/* Se crea un integrante del grupo */             
INSERT INTO `personas` (id, cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
              VALUES(8, '0023254484', 'Chico', 'Formacion', 'Urdesa', '2004-06-01', 'masculino', 'chico_formacion@gmail.com', null, now(), now());
INSERT INTO `procarianos` (id, colegio, universidad, estado, createdAt ,updatedAt, PersonaId)
              VALUES  (2, 'COLEGIO', null, 'activo', now(), now(), 8);
INSERT INTO `procarianogrupo` (fechaInicio, fechaFin, createdAt, updatedAt, GrupoId, ProcarianoId)
              VALUES(now(), null, now(), now(), 1, 2);
INSERT INTO `procarianotipo` (fechaInicio, fechaFin, createdAt, updatedAt, ProcarianoId, TipoId)              
              VALUES (now(), null, now(), now(), 2, 1);


/* Creación del grupo sin etapa y sin animador para test de añadir grupo a etapa y de añadir animador a grupo */
INSERT INTO `grupos` (id, nombre, tipo, cantidadChicos, numeroReuniones, genero, createdAt, updatedAt)
              VALUES(2, 'Grupo sin etapa', 'Formacion', 0, 0, 'Procare', now(), now());
/* Se crea un animador sin rol y sin grupo para test de añadir rol y de añadir animador a grupo */
INSERT INTO `personas` (id, cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
              VALUES(9, '0123456780', 'ANIMADOR', 'SIN ROL', 'Urdesa', '1995-06-01', 'masculino', 'animador_sin_rol@gmail.com', null, now(), now());
INSERT INTO `procarianos` (id, colegio, universidad, estado, createdAt ,updatedAt, PersonaId)
              VALUES  (3, 'COLEGIO', 'UNIVERSIDAD', 'activo', now(), now(), 9);

/* Creación de chico de Formación sin grupo */
INSERT INTO `personas` (id, cedula, nombres, apellidos, direccion, fechaNacimiento, genero, email, contrasenna, createdAt, updatedAt) 
							VALUES (10, '0125478548', 'Chico Formacion', 'Sin grupo', 'Sur', '2003-02-01', 'masculino', 'chico_sin_grupo@hotmail.com', null, now(), now());
INSERT INTO  `procarianos` (id, colegio, universidad, estado, createdAt ,updatedAt, PersonaId)
							VALUES (4, 'Nueva Semilla', null, 'activo', now(), now(), 10);
INSERT INTO `procarianotipo` (fechaInicio, fechaFin, createdAt, updatedAt, ProcarianoId, TipoId)              
              VALUES (now(), null, now(), now(), 4, 1);


/* Creación de tareas */
INSERT INTO `tareas` (id, nombre, descripcion, fechaPublicacion, fechaInicio, fechaFin, prioridad, estado, categoria, tipo, createdAt, updatedAt, idResponsable)
              VALUES (1, 'Tarea del animador', 'Esta es la tarea del animador', now(), now(), now(), 1, 1, 1, 'tarea', now(), now(), 4);