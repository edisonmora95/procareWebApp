USE procare_db_dev;

INSERT INTO Etapas(nombre, createdAt, updatedAt) VALUES ('Primera etapa', now(), now());
INSERT INTO Etapas(nombre, createdAt, updatedAt) VALUES ('Segunda etapa', now(), now());
INSERT INTO Etapas(nombre, createdAt, updatedAt) VALUES ('Tercera etapa', now(), now());
INSERT INTO Etapas(nombre, createdAt, updatedAt) VALUES ('Cuarta etapa', now(), now());
INSERT INTO Etapas(nombre, createdAt, updatedAt) VALUES ('Quinta etapa', now(), now());
INSERT INTO Etapas(nombre, createdAt, updatedAt) VALUES ('Iniciación', now(), now());

INSERT INTO Nivels(nombre, createdAt, updatedAt) VALUES ('Nivel 1', now(), now());
INSERT INTO Nivels(nombre, createdAt, updatedAt) VALUES ('Nivel 2', now(), now());
INSERT INTO Nivels(nombre, createdAt, updatedAt) VALUES ('Nivel 3', now(), now());
INSERT INTO Nivels(nombre, createdAt, updatedAt) VALUES ('Nivel 4', now(), now());
INSERT INTO Nivels(nombre, createdAt, updatedAt) VALUES ('Nivel 5', now(), now());

INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Procare Formacion', 'este es un director de formacion', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Centro', 'este es un director de centro', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Personal', 'este es parte del personal', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Ejecutivo', 'este es parte del director ejecutivo', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Animador', 'este es parte del animador', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Asesor', 'este es parte del asesor', now(), now());

INSERT INTO Tipos(nombre, createdAt, updatedAt) VALUES ('Chico Formación', now(), now());
INSERT INTO Tipos(nombre, createdAt, updatedAt) VALUES ('Caminante', now(), now());
INSERT INTO Tipos(nombre, createdAt, updatedAt) VALUES ('Pescador', now(), now());
INSERT INTO Tipos(nombre, createdAt, updatedAt) VALUES ('Pescador Consagrado', now(), now());
INSERT INTO Tipos(nombre, createdAt, updatedAt) VALUES ('Sacerdote', now(), now());
INSERT INTO Tipos(nombre, createdAt, updatedAt) VALUES ('Mayor', now(), now());

INSERT INTO Personas (cedula, nombres, apellidos, genero, email, contrasenna, createdAt, updatedAt) VALUES('0123456789', 'Director', 'Ejecutivo', 'masculino', 'procarewebapp@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());

INSERT INTO Procarianos (estado, createdAt, updatedAt, PersonaId) VALUES ('activo', now(), now(), 1);

INSERT INTO procarianotipo (fechaInicio, createdAt, updatedAt, ProcarianoId, TipoId) Values(now(), now(), now(), 1, 4);

INSERT INTO PersonaRol VALUES (now(), null, now(), now(), 1, 'Director Ejecutivo');

INSERT INTO Personas (cedula, nombres, genero, email, contrasenna, createdAt, updatedAt) VALUES('0987654321', 'Personal', 'masculino', 'personal@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO PersonaRol VALUES (now(), null, now(), now(), 2, 'Personal');