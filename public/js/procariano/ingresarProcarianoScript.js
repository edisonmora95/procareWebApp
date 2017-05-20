Vue.use(VeeValidate);
//Validaciones. Cambio de mensajes de error
const dictionary = {
	en: {
		messages: {
			email : function(){
				return 'Ingrese un correo válido.';
			},
			required: function(){
				return 'Este campo es obligatorio.';
			},
			alpha_spaces: function(){
				return 'Este campo sólo puede contener letras y espacios.';
			},
			digits: function(field, length){
				return 'Este campo sólo puede contener ' + length + ' números.';
			},
			numeric: function(){
				return 'Este campo sólo puede contener números.';
			},
			alpha_num: function(){
				return 'Este campo sólo puede contener letras y números.';
			},
			regex: function(field, val){
				return 'No ingrese caracteres especiales.';
			}
		}
	}
};
VeeValidate.Validator.updateDictionary(dictionary);

var main = new Vue({
	el: '#main',
	mounted: function(){
		//Inicializadores de Materializecss
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 100 // Creates a dropdown of 15 years to control year
		});
		$('#select-tipo-procariano').material_select();
		$('#select-genero').material_select();
		$('#select-grupo-formacion').material_select();
		$('#select-grupo-caminante').material_select();
		$(".button-collapse").sideNav();
		$('.modal').modal();
		//Creación dinámica de los selects
		this.crearSelectGrupo('select-grupo-formacion', this.grupoFormacionEscogido, 'div-select-grupo-formacion', this.gruposFormacion);
		this.crearSelectGrupo('select-grupo-caminantes', this.grupoCaminantesEscogido, 'div-select-grupo-caminantes', this.gruposCaminantes);
		this.crearSelectGrupo('select-grupo-pescadores', this.grupoPescadoresEscogido, 'div-select-grupo-pescadores', this.gruposPescadores);
		this.formarNavbar();
	},
	data: {
		usuario: '',		//tipo de usuario conectado
		procariano: {
			nombre: '',
			apellido: '',
			fechaNacimiento: '',
			cedula: '',
			direccion: '',
			email: '',
			celular: '',
			convencional: '',
			genero: '',
			tipo: '',	//chico de formación/caminante/pescador/pescador consagrado/sacerdote
			estado: 'activo',	//activo/inactivo... Activo por default
			colegio: '',
			universidad: '',
			grupo: '',
			trabajo: '',
			parroquia: '',
			fechaOrdenacion: ''
		},
		src: '',
		gruposCaminantes: [
			{
				nombre: 'Grupo del Chino',
				id: '1'
			},
			{
				nombre: 'Grupo de Caminantes Viejos',
				id: '2'
			}
		],
		grupoCaminantesEscogido: {
			nombre: '',
			id: ''
		},
		gruposFormacion: [
			{
				nombre: 'Grupo de Luis',
				id: '1'
			},
			{
				nombre: 'Grupo de Mario',
				id: '2'
			},
			{
				nombre: 'Grupo de Fernando',
				id: '3'
			}
		],
		grupoFormacionEscogido: {
			nombre: '',
			id: ''
		},
		gruposPescadores: [
			{
				nombre: 'Grupo de Pescadores 1',
				id: '1'
			},
			{
				nombre: 'Grupo de Pescadores 2',
				id: '2'
			},
			{
				nombre: 'Grupo de Pescadores 3',
				id: '3'
			}
		],
		grupoPescadoresEscogido: {
			nombre: '',
			id: ''
		},
		gruposMayores: [],
		grupoMayoresEscogido: {
			nombre: '',
			id: ''
		}
	},
	methods: {
		prueba: function(){
			var $input = $('#fecha-nacimiento').pickadate();
			var picker = $input.pickadate('picker');
			var fecha = picker.get('view', 'yyyy/mm/dd');
			console.log(fecha);
		},
		formarNavbar: function(){
			/*
				Esta función crea el navbar dependiendo tel tipo de usuario que está loggeado.
			*/
			var usuario = 'personal';
			if(usuario === 'personal'){
				this.crearDropdownPA();
				this.crearDropdownPF();
			}
		},
		crearDropdownPA: function(){
			//Esta función crea las pestañas del dropdown de Procare Acción del navbar.
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
			//Esta función crea las pestañas del dropdown de Procare Formación del navbar.
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
		crearSelectGrupo: function(idSelect, grupoEscogido, idDivSelect, grupos){
			/*
				Parámetros:
					idSelect -> id del elemento select que se va a crear en esta función para contener a los grupos deseados. Ejemplo: select-grupo-formacion
					grupoEscogido ->  Elemento de data con el cual se hará el 2 way data binding. Almacenará el grupo escogido del select
					idDivSelect -> id del div que contendrá al elemento select que se va a crear
					grupos -> Los grupos que se van a mostrar en el select
			*/
			//Todos los parametros de id vienen sin el #
			var self = this;
			var select = $('<select>').attr({"id":idSelect});
			var optionSelectedAux = '#' + idSelect + ' option:selected';
			select.change(function(){
				grupoEscogido.id = $(optionSelectedAux).val();
				grupoEscogido.nombre = $(optionSelectedAux).text();
				self.procariano.grupo = $(optionSelectedAux).text();
			});
			var idDivSelectAux = '#' + idDivSelect;
			var divSelect = $(idDivSelectAux);
			self.crearSelectOptions(select, grupos, divSelect);
			divSelect.append(select);
			select.material_select();
		},	
		crearSelectOptions: function(select, grupos, divSelect){
			/*
				Parámetros:
					select -> elemento select creado en la función crearSelectGrupo que mostrará a los grupos deseados
					grupos -> los grupos que se mostrarán como opciones dentro del select
					divSelect -> elemento div que contendrá al select
			*/
			var optionDisabled = $('<option>').val("").text("");
			select.append(optionDisabled);
			$.each(grupos, function(index, grupo){
				var option = $('<option>').val(grupo.id).text(grupo.nombre);
				select.append(option);
			});
			divSelect.append(select);
		},
		validateBeforeSubmit: function() {
      this.$validator.validateAll().then(() => {
          // eslint-disable-next-line
          $('#modalProcarianoCreado').modal('open');
      }).catch(() => {
          // eslint-disable-next-line
          alert('Correct them errors!');
      });
    }
	}
});
// 2 way data binding de los selects
$('#select-tipo-procariano').change(function(){
	var tipoProcariano = $('#select-tipo-procariano option:selected').text();
	main.$data.procariano.tipo = tipoProcariano;
});
$('#select-genero').change(function(){
	var generoProcariano = $('#select-genero option:selected').text();
	main.$data.procariano.genero = generoProcariano;
});
//2 way data binding de los date pickers
$('#fecha-nacimiento').change(function(){
	var year = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'yyyy');
	var day = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'dd');
	var month = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'mm');
	var fecha = year + '/' + month + '/' + day;
	main.$data.procariano.fechaNacimiento = fecha;
});
$('#fecha-ordenacion').change(function(){
	var year = $('#fecha-ordenacion').pickadate('picker').get('highlight', 'yyyy');
	var day = $('#fecha-ordenacion').pickadate('picker').get('highlight', 'dd');
	var month = $('#fecha-ordenacion').pickadate('picker').get('highlight', 'mm');
	var fecha = year + '/' + month + '/' + day;
	main.$data.procariano.fechaOrdenacion = fecha;
});