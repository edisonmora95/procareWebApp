USE procare_db_dev;
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Procare Formacion', 'este es un director de formacion', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Centro', 'este es un director de centro', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Personal', 'este es parte del personal', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Ejecutivo', 'este es parte del director ejecutivo', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Animador', 'este es parte del animador', now(), now());
INSERT INTO Rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Asesor', 'este es parte del asesor', now(), now());

UPDATE Personas
SET contrasenna = '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2'
WHERE id = 1;

INSERT INTO Personas (cedula, nombres, genero, email, contrasenna, createdAt, updatedAt) VALUES('0123456789', 'FUNDACION PROCARE', 'Masculino', 'procarewebapp@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO PersonaRol VALUES (now(), null, now(), now(), 1, 'Director Ejecutivo');



INSERT INTO Personas (cedula, nombres, genero, email, contrasenna, createdAt, updatedAt) VALUES('0987654321', 'Personal', 'Masculino', 'personal@gmail.com', '$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2', now(), now());
INSERT INTO PersonaRol VALUES (now(), null, now(), now(), 2, 'Personal');
#posi "$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2"