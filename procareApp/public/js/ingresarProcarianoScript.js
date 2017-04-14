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
	},
	data: {
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
		}
	},
	methods: {
		prueba: function(){
			var $input = $('#fecha-nacimiento').pickadate();
			var picker = $input.pickadate('picker')
			var fecha = picker.get('view', 'yyyy/mm/dd')
			console.log(fecha)
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
	var $input = $('#fecha-nacimiento').pickadate();
	var picker = $input.pickadate('picker')
	var fecha = picker.get('view', 'yyyy/mm/dd')
	main.$data.procariano.fechaNacimiento = fecha;
})