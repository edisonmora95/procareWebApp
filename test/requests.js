'use strict';

// Benefactor sin Persona creada previamente
module.exports.benefactorPersonaNueva = {
	nombres         : 'Benefactor A',
	apellidos       : 'Benefactor A',
	cedula          : '0921054566',
	razonSocial     : 'Razón Social',
	direccion       : 'Centro de la ciudad',
	fechaNacimiento : '1995-06-27',
	genero          : 'masculino',
	email           : 'benefactor_1@gmail.com',
	valorContribucion : 500.50,
  diaCobro          : 15,
  tarjetaCredito    : '4027-4930-1234-2012',
  tipoDonacion      : 'mensual',
  estado            : 'activo',
  nombreGestor      : 'Fernando Icaza',
  relacion          : 'Amigo',
  observacion       : '',
  tipo 							: 'persona'
};

// Benefactor sin Persona creada previamente
module.exports.benefactorPersonaExistente = {
	cedula          : '0123454184',
	razonSocial     : 'Persona ya existente',
	valorContribucion : 500.50,
  diaCobro          : 15,
  tarjetaCredito    : '4027-4930-4321-2012',
  tipoDonacion      : 'mensual',
  estado            : 'activo',
  nombreGestor      : 'Fernando Icaza',
  relacion          : 'Amigo',
  observacion       : '',
  tipo 							: 'persona'
};

// Benefactor de Empresa
module.exports.benefactorEmpresa = {
	ruc             : '09210545001',
	razonSocial     : 'Empresa Procare',
	direccion       : 'Centro de la ciudad',
	email           : 'benefactor_empresa@gmail.com',
	valorContribucion : 500.50,
  diaCobro          : 15,
  tarjetaCredito    : '4027-4930-5678-2012',
  tipoDonacion      : 'mensual',
  estado            : 'activo',
  nombreGestor      : 'Fernando Icaza',
  relacion          : 'Amigo',
  observacion       : '',
  tipo 							: 'empresa'
};

