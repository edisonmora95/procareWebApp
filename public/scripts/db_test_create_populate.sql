-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.13-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for procare_db_test
DROP DATABASE IF EXISTS `procare_db_test`;
CREATE DATABASE IF NOT EXISTS `procare_db_test` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `procare_db_test`;

-- Dumping structure for table procare_db_test.animadores
DROP TABLE IF EXISTS `animadores`;
CREATE TABLE IF NOT EXISTS `animadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProcarianoId` int(11) DEFAULT NULL,
  `GrupoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ProcarianoId` (`ProcarianoId`),
  KEY `GrupoId` (`GrupoId`),
  CONSTRAINT `animadores_ibfk_1` FOREIGN KEY (`ProcarianoId`) REFERENCES `procarianos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `animadores_ibfk_2` FOREIGN KEY (`GrupoId`) REFERENCES `grupos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.asesor
DROP TABLE IF EXISTS `asesor`;
CREATE TABLE IF NOT EXISTS `asesor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.asistenciacatequista
DROP TABLE IF EXISTS `asistenciacatequista`;
CREATE TABLE IF NOT EXISTS `asistenciacatequista` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.asistenciachicos
DROP TABLE IF EXISTS `asistenciachicos`;
CREATE TABLE IF NOT EXISTS `asistenciachicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `justificacion` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProcarianoId` int(11) DEFAULT NULL,
  `ReunionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AsistenciaChicos_ReunionId_ProcarianoId_unique` (`ProcarianoId`,`ReunionId`),
  KEY `ReunionId` (`ReunionId`),
  CONSTRAINT `asistenciachicos_ibfk_1` FOREIGN KEY (`ProcarianoId`) REFERENCES `procarianos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `asistenciachicos_ibfk_2` FOREIGN KEY (`ReunionId`) REFERENCES `reuniones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.asistencianino
DROP TABLE IF EXISTS `asistencianino`;
CREATE TABLE IF NOT EXISTS `asistencianino` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.benefactors
DROP TABLE IF EXISTS `benefactors`;
CREATE TABLE IF NOT EXISTS `benefactors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valorContribucion` decimal(10,2) NOT NULL,
  `diaCobro` int(2) NOT NULL,
  `tarjetaCredito` varchar(255) DEFAULT NULL,
  `tipoDonacion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) NOT NULL,
  `nombreGestor` varchar(255) DEFAULT NULL,
  `relacion` varchar(255) DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PersonaId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PersonaId` (`PersonaId`),
  CONSTRAINT `benefactors_ibfk_1` FOREIGN KEY (`PersonaId`) REFERENCES `personas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.catequista
DROP TABLE IF EXISTS `catequista`;
CREATE TABLE IF NOT EXISTS `catequista` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.centronivel
DROP TABLE IF EXISTS `centronivel`;
CREATE TABLE IF NOT EXISTS `centronivel` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CentroId` int(11) NOT NULL,
  `NivelId` int(11) NOT NULL,
  PRIMARY KEY (`CentroId`,`NivelId`),
  KEY `NivelId` (`NivelId`),
  CONSTRAINT `centronivel_ibfk_1` FOREIGN KEY (`CentroId`) REFERENCES `centros` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `centronivel_ibfk_2` FOREIGN KEY (`NivelId`) REFERENCES `nivels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.centros
DROP TABLE IF EXISTS `centros`;
CREATE TABLE IF NOT EXISTS `centros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCentro` varchar(255) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `estado` varchar(255) NOT NULL,
  `directorCentro` varchar(255) NOT NULL,
  `directorTelefono` varchar(255) DEFAULT NULL,
  `convenio` int(11) DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombreCentro` (`nombreCentro`),
  UNIQUE KEY `Centros_nombreCentro_unique` (`nombreCentro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.clases
DROP TABLE IF EXISTS `clases`;
CREATE TABLE IF NOT EXISTS `clases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `horaInicio` datetime DEFAULT NULL,
  `horaSalida` datetime DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.director
DROP TABLE IF EXISTS `director`;
CREATE TABLE IF NOT EXISTS `director` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.donacions
DROP TABLE IF EXISTS `donacions`;
CREATE TABLE IF NOT EXISTS `donacions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_benefactor` int(11) NOT NULL,
  `cantidad_donada` decimal(10,2) NOT NULL,
  `fecha_donacion` date NOT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.etapas
DROP TABLE IF EXISTS `etapas`;
CREATE TABLE IF NOT EXISTS `etapas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `programa` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  UNIQUE KEY `Etapas_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.eventos
DROP TABLE IF EXISTS `eventos`;
CREATE TABLE IF NOT EXISTS `eventos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fechaInicio` datetime NOT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `descripcion` text NOT NULL,
  `lugar` text NOT NULL,
  `gastos` decimal(10,2) DEFAULT NULL,
  `ingresos` decimal(10,2) DEFAULT NULL,
  `estado` int(11) NOT NULL,
  `tipo` varchar(255) DEFAULT 'evento',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idOrganizador` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idOrganizador` (`idOrganizador`),
  CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`idOrganizador`) REFERENCES `personas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.grupoetapa
DROP TABLE IF EXISTS `grupoetapa`;
CREATE TABLE IF NOT EXISTS `grupoetapa` (
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `EtapaId` int(11) NOT NULL,
  `GrupoId` int(11) NOT NULL,
  PRIMARY KEY (`EtapaId`,`GrupoId`),
  KEY `GrupoId` (`GrupoId`),
  CONSTRAINT `grupoetapa_ibfk_1` FOREIGN KEY (`EtapaId`) REFERENCES `etapas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `grupoetapa_ibfk_2` FOREIGN KEY (`GrupoId`) REFERENCES `grupos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.grupos
DROP TABLE IF EXISTS `grupos`;
CREATE TABLE IF NOT EXISTS `grupos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `cantidadChicos` int(11) NOT NULL DEFAULT '0',
  `numeroReuniones` int(11) NOT NULL DEFAULT '0',
  `genero` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.ninoaccions
DROP TABLE IF EXISTS `ninoaccions`;
CREATE TABLE IF NOT EXISTS `ninoaccions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreRep` varchar(255) DEFAULT NULL,
  `apellidoRep` varchar(255) DEFAULT NULL,
  `telefonoRep` int(11) DEFAULT NULL,
  `escuela` varchar(255) DEFAULT NULL,
  `bautizado` tinyint(1) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PersonaId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PersonaId` (`PersonaId`),
  CONSTRAINT `ninoaccions_ibfk_1` FOREIGN KEY (`PersonaId`) REFERENCES `personas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.ninoparalelo
DROP TABLE IF EXISTS `ninoparalelo`;
CREATE TABLE IF NOT EXISTS `ninoparalelo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.nivels
DROP TABLE IF EXISTS `nivels`;
CREATE TABLE IF NOT EXISTS `nivels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `programa` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  UNIQUE KEY `Nivels_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.paralelonivels
DROP TABLE IF EXISTS `paralelonivels`;
CREATE TABLE IF NOT EXISTS `paralelonivels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.paralelos
DROP TABLE IF EXISTS `paralelos`;
CREATE TABLE IF NOT EXISTS `paralelos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `cantidadNinios` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  UNIQUE KEY `Paralelos_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.personarol
DROP TABLE IF EXISTS `personarol`;
CREATE TABLE IF NOT EXISTS `personarol` (
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PersonaId` int(11) NOT NULL,
  `RolNombre` varchar(255) NOT NULL,
  PRIMARY KEY (`PersonaId`,`RolNombre`),
  KEY `RolNombre` (`RolNombre`),
  CONSTRAINT `personarol_ibfk_1` FOREIGN KEY (`PersonaId`) REFERENCES `personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `personarol_ibfk_2` FOREIGN KEY (`RolNombre`) REFERENCES `rols` (`nombre`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.personas
DROP TABLE IF EXISTS `personas`;
CREATE TABLE IF NOT EXISTS `personas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cedula` varchar(255) NOT NULL,
  `nombres` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `razonSocial` varchar(255) DEFAULT NULL,
  `direccion` text NOT NULL,
  `fechaNacimiento` datetime NOT NULL,
  `contrasenna` varchar(255) DEFAULT NULL,
  `genero` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `convencional` varchar(255) DEFAULT NULL,
  `celular` varchar(255) DEFAULT NULL,
  `trabajo` text,
  `tipo` varchar(255) DEFAULT NULL,
  `imagenUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cedula` (`cedula`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `Personas_cedula_unique` (`cedula`),
  UNIQUE KEY `Personas_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.procarianogrupo
DROP TABLE IF EXISTS `procarianogrupo`;
CREATE TABLE IF NOT EXISTS `procarianogrupo` (
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `GrupoId` int(11) NOT NULL,
  `ProcarianoId` int(11) NOT NULL,
  PRIMARY KEY (`GrupoId`,`ProcarianoId`),
  KEY `ProcarianoId` (`ProcarianoId`),
  CONSTRAINT `procarianogrupo_ibfk_1` FOREIGN KEY (`GrupoId`) REFERENCES `grupos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `procarianogrupo_ibfk_2` FOREIGN KEY (`ProcarianoId`) REFERENCES `procarianos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.procarianos
DROP TABLE IF EXISTS `procarianos`;
CREATE TABLE IF NOT EXISTS `procarianos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `colegio` varchar(255) DEFAULT NULL,
  `universidad` varchar(255) DEFAULT NULL,
  `parroquia` varchar(255) DEFAULT NULL,
  `fechaOrdenacion` datetime DEFAULT NULL,
  `estado` varchar(255) NOT NULL,
  `haceParticipacionEstudiantil` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PersonaId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PersonaId` (`PersonaId`),
  CONSTRAINT `procarianos_ibfk_1` FOREIGN KEY (`PersonaId`) REFERENCES `personas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.procarianotipo
DROP TABLE IF EXISTS `procarianotipo`;
CREATE TABLE IF NOT EXISTS `procarianotipo` (
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProcarianoId` int(11) NOT NULL,
  `TipoId` int(11) NOT NULL,
  PRIMARY KEY (`ProcarianoId`,`TipoId`),
  KEY `TipoId` (`TipoId`),
  CONSTRAINT `procarianotipo_ibfk_1` FOREIGN KEY (`ProcarianoId`) REFERENCES `procarianos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `procarianotipo_ibfk_2` FOREIGN KEY (`TipoId`) REFERENCES `tipos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.reuniones
DROP TABLE IF EXISTS `reuniones`;
CREATE TABLE IF NOT EXISTS `reuniones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `GrupoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `GrupoId` (`GrupoId`),
  CONSTRAINT `reuniones_ibfk_1` FOREIGN KEY (`GrupoId`) REFERENCES `grupos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.rols
DROP TABLE IF EXISTS `rols`;
CREATE TABLE IF NOT EXISTS `rols` (
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.tareas
DROP TABLE IF EXISTS `tareas`;
CREATE TABLE IF NOT EXISTS `tareas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fechaPublicacion` datetime NOT NULL,
  `fechaInicio` datetime NOT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `prioridad` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `categoria` int(11) NOT NULL,
  `tipo` varchar(255) DEFAULT 'tarea',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idResponsable` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idResponsable` (`idResponsable`),
  CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`idResponsable`) REFERENCES `personas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.tickets
DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaCompra` datetime NOT NULL,
  `valor` double NOT NULL,
  `esGanador` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProcarianoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ProcarianoId` (`ProcarianoId`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`ProcarianoId`) REFERENCES `procarianos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table procare_db_test.tipos
DROP TABLE IF EXISTS `tipos`;
CREATE TABLE IF NOT EXISTS `tipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  UNIQUE KEY `Tipos_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;


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
INSERT INTO `personarol` 
              VALUES (now(), null, now(), now(), 1, 'Animador');              
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
INSERT INTO `personas` (id, cedula, nombres, apellidos, direccion, fechaNacimiento, genero, email, contrasenna, createdAt, updatedAt) 
              VALUES (10, '0125478548', 'Chico Formacion', 'Sin grupo', 'Sur', '2003-02-01', 'masculino', 'chico_sin_grupo@hotmail.com', null, now(), now());
INSERT INTO  `procarianos` (id, colegio, universidad, estado, createdAt ,updatedAt, PersonaId)
              VALUES (4, 'Nueva Semilla', null, 'activo', now(), now(), 10);
INSERT INTO `procarianotipo` (fechaInicio, fechaFin, createdAt, updatedAt, ProcarianoId, TipoId)              
              VALUES (now(), null, now(), now(), 4, 1);

/* Creación de tareas */
INSERT INTO `tareas` (id, nombre, descripcion, fechaPublicacion, fechaInicio, fechaFin, prioridad, estado, categoria, tipo, createdAt, updatedAt, idResponsable)
              VALUES (1, 'Tarea del animador', 'Esta es la tarea del animador', now(), now(), now(), 1, 1, 1, 'tarea', now(), now(), 4);

              /* Creación de tareas */
INSERT INTO `eventos` (id, nombre, descripcion, fechaInicio, fechaFin, lugar, estado, tipo, createdAt, updatedAt, idOrganizador)
              VALUES (1, 'Chocolate de Reyes', 'Este es el evento del chocolate de reyes', now(), now(), 'Casa Procare', 1, 'tarea', now(), now(), 4);

/* Para test de creación de grupo. CP1. Procariano ya con rol de animador */

INSERT INTO `personas` (id, cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
              VALUES(11, '0123456799', 'ANIMADOR', 'CON ROL', 'Urdesa', '1995-06-01', 'masculino', 'animador_con_rol@gmail.com', null, now(), now());
INSERT INTO `procarianos` (id, colegio, universidad, estado, createdAt ,updatedAt, PersonaId)
              VALUES  (5, 'COLEGIO', 'UNIVERSIDAD', 'activo', now(), now(), 11);
INSERT INTO `personarol` 
              VALUES (now(), null, now(), now(), 11, 'Animador');
INSERT INTO `procarianotipo` 
              VALUES (now(), null, now(), now(), 5, 2);

/* Para test de edición de grupo. CP3. Procariano sin rol de animador */              
INSERT INTO `personas` (id, cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
              VALUES(12, '0123456709', 'ANIMADOR EDITAR GRUPO', 'SIN ROL', 'Urdesa', '1995-06-01', 'masculino', 'animador_editar_grupo_sin_rol@gmail.com', null, now(), now());
INSERT INTO `procarianos` (id, colegio, universidad, estado, createdAt ,updatedAt, PersonaId)
              VALUES  (6, 'COLEGIO', 'UNIVERSIDAD', 'activo', now(), now(), 12);

/* Para test de edición de grupo. CP4. Procariano con rol de animador */              
INSERT INTO `personas` (id, cedula, nombres, apellidos, direccion, fechaNacimiento,genero, email, contrasenna, createdAt, updatedAt) 
              VALUES(13, '0123456700', 'ANIMADOR EDITAR GRUPO', 'CON ROL', 'Urdesa', '1995-06-01', 'masculino', 'animador_editar_grupo_con_rol@gmail.com', null, now(), now());
INSERT INTO `procarianos` (id, colegio, universidad, estado, createdAt ,updatedAt, PersonaId)
              VALUES  (7, 'COLEGIO', 'UNIVERSIDAD', 'activo', now(), now(), 13);    
INSERT INTO `personarol` 
              VALUES (now(), null, now(), now(), 13, 'Animador');                        