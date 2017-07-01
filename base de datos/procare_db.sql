CREATE DATABASE IF NOT EXISTS procare_db;
USE procare_db;

CREATE TABLE IF NOT EXISTS benefactor (
	id_benefactor INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    valor_contribucion DECIMAL(10,2),
    dia_cobro INT(2), 
    peridicidad VARCHAR(30),
    tarjeta_credito VARCHAR(20),
    tipo_donacion VARCHAR(30),
    estado TINYINT(1),
    meses_mora INT(2),
    nombre_gestor VARCHAR(50),
    relacion VARCHAR(100),
    observacion VARCHAR(300),
    PRIMARY KEY (id_benefactor)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS donacion(
	id_donacion INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_benefactor INT(10) NOT NULL,
    cantidad_donada DECIMAL(10,2) NOT NULL,
    fecha_donacion DATE NOT NULL,
    observacion VARCHAR(300),
    PRIMARY KEY (id_donacion),
    CONSTRAINT FOREIGN KEY (id_benefactor) REFERENCES benefactor(id_benefactor)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS persona(
	id_persona INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    cedula VARCHAR(10) NOT NULL UNIQUE,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    direccion VARCHAR(200),
    fecha_nacimiento DATE,
    genero VARCHAR(10) NOT NULL,
    email VARCHAR(50) UNIQUE,  
    contrasena VARCHAR(100),
    convencional VARCHAR(15),
    celular VARCHAR(15),
    trabajo VARCHAR(30),
    PRIMARY KEY (id_persona)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS benefactor_persona(
	id_bp INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_persona INT(10) NOT NULL,
    id_benefactor INT(10) NOT NULL,
    PRIMARY KEY (id_bp),
    CONSTRAINT FOREIGN KEY (id_persona) REFERENCES persona(id_persona),
    CONSTRAINT FOREIGN KEY (id_benefactor) REFERENCES benefactor(id_benefactor)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS cargo_fundacion(
	id_cargo_fundacion INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    nombre VARCHAR(30) NOT NULL UNIQUE,
    sueldo DECIMAL(10,2) NOT NULL,
    descripcion VARCHAR(300),
    PRIMARY KEY (id_cargo_fundacion)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS persona_cargo_fundacion(
	id_persona_cargo INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_cargo_fundacion INT(10) NOT NULL,
    id_persona INT(10) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    PRIMARY KEY (id_persona_cargo),
    CONSTRAINT FOREIGN KEY (id_cargo_fundacion) REFERENCES cargo_fundacion(id_cargo_fundacion),
    CONSTRAINT FOREIGN KEY (id_persona) REFERENCES persona(id_persona)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS evento(
	id_evento INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_organizador INT(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    fecha DATE,
    descripcion VARCHAR(300),
    lugar VARCHAR(200),
    gastos DECIMAL(10,2),
    ingresos DECIMAL(10,2),
    PRIMARY KEY (id_evento),
    CONSTRAINT FOREIGN KEY (id_organizador) REFERENCES persona(id_persona)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS tarea(
	id_tarea INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_responsable INT(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    fecha_publicacion DATE,
    fecha_limite DATE,
    prioridad TINYINT(1) NOT NULL,
    estado TINYINT(1) NOT NULL,
    descripcion VARCHAR(300),
    categoria TINYINT(1) NOT NULL,
    PRIMARY KEY (id_tarea),
    CONSTRAINT FOREIGN KEY (id_responsable) REFERENCES persona(id_persona)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS rol(
	id_rol INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    nombre VARCHAR(30) NOT NULL,
    descripcion VARCHAR(300),    
    PRIMARY KEY (id_rol)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS persona_rol(
	id_persona_rol INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_rol INT(10) NOT NULL,
    id_persona INT(10) NOT NULL,
    PRIMARY KEY (id_persona_rol),
    CONSTRAINT FOREIGN KEY (id_rol) REFERENCES rol(id_rol),
    CONSTRAINT FOREIGN KEY (id_persona) REFERENCES persona(id_persona)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS procariano(
	id_procariano INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_persona INT(10) NOT NULL,
    colegio VARCHAR(30),
    universidad VARCHAR(30),
    parroquia VARCHAR(30),
    fecha_ordenacion DATE,
    estado TINYINT(1) NOT NULL,
    hace_participacion_estudiantil TINYINT(1),
    PRIMARY KEY (id_procariano),
    CONSTRAINT FOREIGN KEY (id_persona) REFERENCES persona(id_persona)    
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS cargo_formacion(
	id_cargo_formacion INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    nombre VARCHAR(30) NOT NULL,
    descripcion VARCHAR(300),
    PRIMARY KEY (id_cargo_formacion)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS procariano_cargo_formacion(
	id_procariano_cargo INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_cargo_formacion INT(10) NOT NULL,
    id_procariano INT(10) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    PRIMARY KEY (id_procariano_cargo),
    CONSTRAINT FOREIGN KEY (id_cargo_formacion) REFERENCES cargo_formacion(id_cargo_formacion),
    CONSTRAINT FOREIGN KEY (id_procariano) REFERENCES procariano(id_procariano)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS grupo(
	id_grupo INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    tipo TINYINT(1) NOT NULL,
    cantidad_chicos INT,
    numero_reuniones INT,
    genero VARCHAR(10) NOT NULL,
    PRIMARY KEY (id_grupo)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS procariano_grupo(
	id_pg INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_grupo INT(10) NOT NULL,
    id_procariano INT(10) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    PRIMARY KEY (id_pg),
    CONSTRAINT FOREIGN KEY (id_grupo) REFERENCES grupo(id_grupo),
    CONSTRAINT FOREIGN KEY (id_procariano) REFERENCES procariano(id_procariano)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS animador(
	id_animador INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_grupo INT(10) NOT NULL,
    id_procariano INT(10) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    PRIMARY KEY (id_animador),
    CONSTRAINT FOREIGN KEY (id_grupo) REFERENCES grupo(id_grupo),
    CONSTRAINT FOREIGN KEY (id_procariano) REFERENCES procariano(id_procariano)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS etapa(
	id_etapa INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    programa VARCHAR(100),
    PRIMARY KEY (id_etapa)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS grupo_etapa(
	id_grupo_etapa INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_grupo INT(10) NOT NULL,
    id_etapa INT(10) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    PRIMARY KEY (id_grupo_etapa),
    CONSTRAINT FOREIGN KEY (id_grupo) REFERENCES grupo(id_grupo),
    CONSTRAINT FOREIGN KEY (id_etapa) REFERENCES etapa(id_etapa)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS reunion(
	id_reunion INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_grupo INT(10) NOT NULL,
    fecha_reunion DATE,
    hora_inicio TIME,
    hora_salida TIME,
    descripcion VARCHAR(300) ,
    PRIMARY KEY (id_reunion),
    CONSTRAINT FOREIGN KEY (id_grupo) REFERENCES grupo(id_grupo)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS asistencia_chico(
	id_asistencia_chico INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_reunion INT(10) NOT NULL,
    id_procariano INT(10) NOT NULL,
    es_justificada TINYINT(1) NOT NULL,
    descripcion VARCHAR(300),
    PRIMARY KEY (id_asistencia_chico),
    CONSTRAINT FOREIGN KEY (id_reunion) REFERENCES reunion(id_reunion),
    CONSTRAINT FOREIGN KEY (id_procariano) REFERENCES procariano(id_procariano)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS tipo(
	id_tipo INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_tipo)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS procariano_tipo(
	id_procariano_tipo INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_procariano INT(10) NOT NULL,
    id_tipo INT(10) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    PRIMARY KEY (id_procariano_tipo),
    CONSTRAINT FOREIGN KEY (id_procariano) REFERENCES procariano(id_procariano),
    CONSTRAINT FOREIGN KEY (id_tipo) REFERENCES tipo(id_tipo)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS ticket_club_por_ti(
	id_ticket INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_procariano INT(10) NOT NULL,
    fecha_compra DATE NOT NULL,
    valor DECIMAL(2,2) NOT NULL,
	es_ganador TINYINT(1),
    PRIMARY KEY (id_ticket),
    CONSTRAINT FOREIGN KEY (id_procariano) REFERENCES procariano(id_procariano)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS nino_accion(
	id_nino_accion INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_persona INT(10) NOT NULL,
    nombre_rep VARCHAR(50),
    apellido_rep VARCHAR(50),
    cedula_rep VARCHAR(10),
    telefono_rep VARCHAR(15),
    escuela VARCHAR(30),
    es_bautizado TINYINT(1),
    estado TINYINT(1) NOT NULL,
    PRIMARY KEY (id_nino_accion),
    CONSTRAINT FOREIGN KEY (id_persona) REFERENCES persona(id_persona)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS paralelo(
	id_paralelo INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    cantidad_ninos INT,
    PRIMARY KEY (id_paralelo)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS clase(
	id_clase INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_paralelo INT(10) NOT NULL,
    fecha_clase DATE,
    hora_inicio TIME,
    hora_fin TIME,
    descripcion VARCHAR(300),
    PRIMARY KEY (id_clase),
    CONSTRAINT FOREIGN KEY (id_paralelo) REFERENCES paralelo(id_paralelo)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS asistencia_nino(
	id_asistencia_nino INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_clase INT(10) NOT NULL,
    id_nino INT(10) NOT NULL,
    es_justificada TINYINT(1) NOT NULL,
    descripcion VARCHAR(300),
    PRIMARY KEY (id_asistencia_nino),
    CONSTRAINT FOREIGN KEY (id_clase) REFERENCES clase(id_clase),
    CONSTRAINT FOREIGN KEY (id_nino) REFERENCES nino_accion(id_nino_accion)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS catequista(
	id_catequista INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_paralelo INT(10) NOT NULL,
    id_procariano INT(10) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    PRIMARY KEY (id_catequista),
    CONSTRAINT FOREIGN KEY (id_paralelo) REFERENCES paralelo(id_paralelo),
    CONSTRAINT FOREIGN KEY (id_procariano) REFERENCES procariano(id_procariano)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS asistencia_catequista(
	id_asistencia_catequista INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_clase INT(10) NOT NULL,
    id_catequista INT(10) NOT NULL,
    es_justificada TINYINT(1) NOT NULL,
    descripcion VARCHAR(300),
    PRIMARY KEY (id_asistencia_catequista),
    CONSTRAINT FOREIGN KEY (id_clase) REFERENCES clase(id_clase),
    CONSTRAINT FOREIGN KEY (id_catequista) REFERENCES catequista(id_catequista)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS nino_paralelo(
	id_nino_paralelo INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_paralelo INT(10) NOT NULL,
    id_nino INT(10) NOT NULL,
    PRIMARY KEY (id_nino_paralelo),
    CONSTRAINT FOREIGN KEY (id_paralelo) REFERENCES paralelo(id_paralelo),
    CONSTRAINT FOREIGN KEY (id_nino) REFERENCES nino_accion(id_nino_accion)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS centro(
	id_centro INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    nombre_centro VARCHAR(50) NOT NULL,
    direccion VARCHAR(200),
    estado TINYINT(1),
    director_centro VARCHAR(50),
    director_telefono VARCHAR(15),
    convenio TINYINT(1),
    observacion VARCHAR(300),
    PRIMARY KEY (id_centro)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS nivel(
	id_nivel INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_centro INT(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    programa VARCHAR(100),
    PRIMARY KEY (id_nivel),
    CONSTRAINT FOREIGN KEY (id_centro) REFERENCES centro(id_centro)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS paralelo_nivel(
	id_paralelo_nivel INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_nivel INT(10) NOT NULL,
    id_paralelo INT(10) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    PRIMARY KEY (id_paralelo_nivel),
    CONSTRAINT FOREIGN KEY (id_nivel) REFERENCES nivel(id_nivel),
    CONSTRAINT FOREIGN KEY (id_paralelo) REFERENCES paralelo(id_paralelo)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS asesor(
	id_asesor INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_paralelo INT(10) NOT NULL,
    id_procariano INT(10) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    PRIMARY KEY (id_asesor),
    CONSTRAINT FOREIGN KEY (id_paralelo) REFERENCES paralelo(id_paralelo),
    CONSTRAINT FOREIGN KEY (id_procariano) REFERENCES procariano(id_procariano)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS director(
	id_director INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_centro INT(10) NOT NULL,
    id_procariano INT(10) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE,
    PRIMARY KEY (id_director),
    CONSTRAINT FOREIGN KEY (id_centro) REFERENCES centro(id_centro),
    CONSTRAINT FOREIGN KEY (id_procariano) REFERENCES procariano(id_procariano)
)ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS empresa(
	id_empresa INT(10) AUTO_INCREMENT NOT NULL UNIQUE,
    id_benefactor INT(10) NOT NULL,
    ruc INT(15) NOT NULL,
    nombre_empresa VARCHAR(50) NOT NULL,
    telefono_empresa VARCHAR(15),
    direccion_empresa VARCHAR(100),
    email_empresa VARCHAR(50),
    nombre_rep VARCHAR(50),
    telefono_rep VARCHAR(15),
    email_rep VARCHAR(50),
    PRIMARY KEY (id_empresa),
    CONSTRAINT FOREIGN KEY (id_benefactor) REFERENCES benefactor(id_benefactor)
)ENGINE = InnoDB;
/*
CREATE TABLE IF NOT EXISTS persona_tarea(

)ENGINE = InnoDB;
*/

