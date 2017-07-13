USE procare_db2;
INSERT INTO rols(nombre, descripcion) VALUES ('director formación', 'este es un director de formación');
INSERT INTO rols(nombre, descripcion) VALUES ('director centro', 'este es un director de centro');
INSERT INTO rols(nombre, descripcion) VALUES ('personal', 'este es parte del personal');

INSERT INTO personarol(PersonaId, RolNombre) VALUES (6, 'director formación');
INSERT INTO personarol(PersonaId, RolNombre) VALUES (6, 'director centro');
INSERT INTO personarol(PersonaId, RolNombre) VALUES (6, 'personal');