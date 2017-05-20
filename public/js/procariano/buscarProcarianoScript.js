var main = new Vue({
	el: '#main',
	mounted: function(){
		$('.modal').modal();
		$(".button-collapse").sideNav();
		this.formarNavbar();
	},
	data: {
		checkboxesAux: [
			{
				value: 'Nombre',
				id: 'check-nombre'
			},
			{
				value: 'Apellido',
				id: 'check-apellido'
			},
			{
				value: 'Cédula',
				id: 'check-cedula'
			},
			{
				value: 'Dirección',
				id: 'check-direccion'
			},
			{
				value: 'Fecha de nacimiento',
				id: 'check-fecha-nacimiento'
			},
			{
				value: 'Género',
				id: 'check-genero'
			},
			{
				value: 'Email',
				id: 'check-email'
			},
			{
				value: 'Convencional',
				id: 'check-convencional'
			},
			{
				value: 'Celular',
				id: 'check-celular'
			},
			{
				value: 'Trabajo',
				id: 'check-trabajo'
			},
			{
				value: 'Colegio',
				id: 'check-colegio'
			},
			{
				value: 'Universidad',
				id: 'check-universidad'
			},
			{
				value: 'Tipo',
				id: 'check-tipo'
			},
			{
				value: 'Año',
				id: 'check-anio'
			},
			{
				value: 'Fecha de ordenación',
				id: 'check-fecha-ordenacion'
			},
			{
				value: 'Estado',
				id: 'estado'
			},
			{
				value: 'Grupo',
				id: 'grupo'
			}
		],
		checkboxes: ['Nombre'],
		procarianos: [
			{
				nombre: 'Edison',
				apellido: 'Mora',
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
			},
			{
				nombre: 'Felipe',
				apellido: 'Clavijo',
				cedula: '0954786589',
				direccion: 'direccion falsa',
				fechaNacimiento: '26/06/1995',
				genero: 'Masculino',
				email: 'felipe@hotmail.com',
				convencional: '042568748',
				celular: '0992568748',
				trabajo: '',
				colegio: '',
				universidad: '',
				tipo: 'Caminante',
				anio: '',
				fechaOrdenacion: '',
				estado: 'Activo',
				grupo: ''
			}
		],
		procariano: {
			nombre: '',
			apellido: '',
			cedula: '',
			direccion: '',
			fechaNacimiento: '',
			genero: '',
			email: '',
			convencional: '',
			celular: '',
			trabajo: '',
			colegio: '',
			universidad: '',
			tipo: '',
			anio: '',
			fechaOrdenacion: '',
			estado: '',
			grupo: ''
		},
		resultados: [],
		usuario: 'personal'
	},
	methods: {
		checkArray: function(nombre){
			/*
				@Descripción: Fuck if I know...
				@Autor: @edisonmora95
				@FechaCreacion: 20-05-2017
			*/
			var self = this;
			var flag = false;
			$.each(self.checkboxes, function(index, element){
				//console.log(element)
				if(element==nombre){
					//console.log('lo encontro')
					flag = true;
				}
			});
			return flag;
		},
		buscar: function(){
			console.log(self.procariano)
			
		},
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
		}
	}
});