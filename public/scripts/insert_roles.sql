USE procare_db_dev;
INSERT INTO rols(nombre, descripcion) VALUES ('Director Procare Formacion', 'este es un director de formacion');
INSERT INTO rols(nombre, descripcion) VALUES ('Director Centro', 'este es un director de centro');
INSERT INTO rols(nombre, descripcion) VALUES ('Personal', 'este es parte del personal');
INSERT INTO rols(nombre, descripcion) VALUES ('Director Ejecutivo', 'este es parte del director ejecutivo');
INSERT INTO rols(nombre, descripcion) VALUES ('Animador', 'este es parte del animador');
INSERT INTO rols(nombre, descripcion) VALUES ('Asesor', 'este es parte del asesor');

INSERT INTO personarol(PersonaId, RolNombre) VALUES (14, 'Personal');