var app = new Vue({
	el: '#app',
	mounted: function(){
		$(".button-collapse").sideNav();
		$('.tooltipped').tooltip({delay: 50});
		this.formarNavbar();
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
		formarNavbar: function(){
			/*
				@Descripción: Esta función crea el navbar dependiendo tel tipo de usuario que está loggeado.
				@Autor: @edisonmora95
				@FechaCreacion: 20-05-2017
			*/
			var usuario = 'personal';
			if(usuario === 'personal'){
				this.crearDropdownPA();
				this.crearDropdownPF();
			}
		},
		crearDropdownPA: function(){
			/*
				@Descripción: Esta función crea las pestañas del dropdown de Procare Acción del navbar.
				@Autor: @edisonmora95
				@FechaCreacion: 20-05-2017
			*/
			var liAsistencias = $('<li>');
			var aAsistencias = $('<a>').html('Asistencias');
			liAsistencias.append(aAsistencias);
			$('#ulProcareAccion').append(liAsistencias);
			var liParalelos = $('<li>')
			var aParalelos = $('<a>').html('Paralelos');
			liParalelos.append(aParalelos);
			$('#ulProcareAccion').append(liParalelos);
			var liNinos = $('<li>');
			var aNinos = $('<a>').html('Niños');
			liNinos.append(aNinos);
			$('#ulProcareAccion').append(liNinos);
		},
		crearDropdownPF: function(){
			/*
				@Descripción: Esta función crea las pestañas del dropdown de Procare Formación del navbar.
				@Autor: @edisonmora95
				@FechaCreacion: 20-05-2017
			*/
			var liAsistencias = $('<li>');
			var aAsistencias = $('<a>').html('Asistencias');
			liAsistencias.append(aAsistencias);
			$('#ulProcareFormacion').append(liAsistencias);
			var liGrupos = $('<li>')
			var aGrupos = $('<a>').html('Grupos');
			liGrupos.append(aGrupos);
			$('#ulProcareFormacion').append(liGrupos);
			var liProcarianos = $('<li>');
			var aProcarianos = $('<a>').html('Procarianos');
			liProcarianos.append(aProcarianos);
			$('#ulProcareFormacion').append(liProcarianos);
		},
		eliminar: function(){
			/*
				@Autor: @edisonmora95
				@FechaCreación: 20-05-2017
			*/
			//Llamada a la api para eliminar al procariano
			this.procariano.estado = 'inactivo';
			Materialize.toast('Procariano cambiado a estado inactivo', 2000, 'rounded')
		}
	}
});