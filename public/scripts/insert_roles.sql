USE procare_db_dev;
INSERT INTO rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Procare Formacion', 'este es un director de formacion', now(), now());
INSERT INTO rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Centro', 'este es un director de centro', now(), now());
INSERT INTO rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Personal', 'este es parte del personal', now(), now());
INSERT INTO rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Director Ejecutivo', 'este es parte del director ejecutivo', now(), now());
INSERT INTO rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Animador', 'este es parte del animador', now(), now());
INSERT INTO rols(nombre, descripcion, createdAt, updatedAt) VALUES ('Asesor', 'este es parte del asesor', now(), now());

INSERT INTO personarol VALUES (now(), null, now(), now(), 1, 'Director Ejecutivo');
#posi "$2a$10$bBByZWydss11nRa5c3p03OggdPT5IX6gDQj2pxMNU7dk3NdY/ywu2"