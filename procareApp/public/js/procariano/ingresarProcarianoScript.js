
var main = new Vue({
	el: '#main',
	mounted: function(){
		
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 100 // Creates a dropdown of 15 years to control year
		});
		$('#select-tipo-procariano').material_select();
		$('#select-genero').material_select();
		$('#select-grupo-formacion').material_select();
		$('#select-grupo-caminante').material_select();
		$(".button-collapse").sideNav();
		//this.crearSelectGrupoFormacion();
		this.crearSelectGrupo('select-grupo-formacion', this.grupoFormacionEscogido, 'div-select-grupo-formacion', this.gruposFormacion);
		this.crearSelectGrupo('select-grupo-caminantes', this.grupoCaminantesEscogido, 'div-select-grupo-caminantes', this.gruposCaminantes);
		this.crearSelectGrupo('select-grupo-pescadores', this.grupoPescadoresEscogido, 'div-select-grupo-pescadores', this.gruposPescadores);
		$('.modal').modal();
	},
	data: {
		usuario: '',
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
			estado: '',	//activo/inactivo... Activo por default
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
			var picker = $input.pickadate('picker')
			var fecha = picker.get('view', 'yyyy/mm/dd')
			console.log(fecha)
		},
		formarNavbar: function(){
			if(usuario=='personal'){
				
			}
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
			var self = this;
			var optionDisabled = $('<option>').val("").text("");
			select.append(optionDisabled);
			$.each(grupos, function(index, grupo){
				var option = $('<option>').val(grupo.id).text(grupo.nombre);
				select.append(option);
			});
			divSelect.append(select)
		},
		crearProcariano: function(){
			$('#modalProcarianoCreado').modal('open');
		}
	}
});

$('#select-tipo-procariano').change(function(){
	var tipoProcariano = $('#select-tipo-procariano option:selected').text()
	main.$data.procariano.tipo = tipoProcariano;
	console.log(tipoProcariano)
	console.log(main.$data.procariano)
});

$('#select-genero').change(function(){
	var generoProcariano = $('#select-genero option:selected').text();
	main.$data.procariano.genero = generoProcariano;
});

$('#fecha-nacimiento').change(function(){
	var year = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'yyyy');
	var day = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'dd');
	var month = $('#fecha-nacimiento').pickadate('picker').get('highlight', 'mm');
	console.log(year)
	console.log(month)
	console.log(day)
	var fecha = year + '/' + month + '/' + day
	main.$data.procariano.fechaNacimiento = fecha;
})

$('#fecha-ordenacion').change(function(){
	var year = $('#fecha-ordenacion').pickadate('picker').get('highlight', 'yyyy');
	var day = $('#fecha-ordenacion').pickadate('picker').get('highlight', 'dd');
	var month = $('#fecha-ordenacion').pickadate('picker').get('highlight', 'mm');
	console.log(year)
	console.log(month)
	console.log(day)
	var fecha = year + '/' + month + '/' + day
	main.$data.procariano.fechaOrdenacion = fecha;
})