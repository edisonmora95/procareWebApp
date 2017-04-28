
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
		gruposCaminantes: [],
		gruposFormacion: [],
		gruposPescadores: [],
		gruposMayores: []
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
		}
	}
});

$('#select-tipo-procariano').change(function(){
	//console.log('Val: ' + $('#select-tipo-procariano').val())
	//console.log('Text: ' + $('#select-tipo-procariano').text())
	var tipoProcariano = $('#select-tipo-procariano option:selected').text()
	main.$data.procariano.tipo = tipoProcariano;
	console.log(tipoProcariano)
	console.log(main.$data.procariano)
	if(tipoProcariano=='Chico de Formación'){
		$('#select-grupo-formacion').material_select();
	}
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