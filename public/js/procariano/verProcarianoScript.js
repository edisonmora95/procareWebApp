var app = new Vue({
	el: '#app',
	mounted: function(){
		$(".button-collapse").sideNav();
	},
	data: {
		procariano:{
			nombres: 'Edison',
			apellidos: 'Mora',
			cedula: '0927102848',
			direccion: 'Cdla. Coviem',
			fechaNacimiento: '27/06/1995',
			genero: 'Masculino',
			email: 'edanmora@espol.edu.ec',
			convencional: '042438648',
			celular: '0992556793',
			trabajo: '',
			colegio: 'Liceo Panamericano',
			universidad: 'Espol',
			tipo: 'Caminante',
			anio: '',
			fechaOrdenacion: '',
			estado: 'Activo',
			grupo: ''
		}
	},
	methods: {

	}
});