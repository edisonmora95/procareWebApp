/*
	@Descripción: Controlador de la vista de ingresarProcariano.ejs
	@Autor: @edisonmora95
	@FechaCreación: 31/04/2017
*/
/*globals Vue:false */
/*globals $:false */
/*globals VeeValidate:false */
'use strict';

import Navbar from './../../components/navbar.vue';
Vue.component('navbar', Navbar); 

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
	},
	data: {
		errorObj: {
			campo: '',
			msj: ''
		},
		usuario: '',		//tipo de usuario conectado
		procariano: {
			nombres: '',
			apellidos: '',
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
			var self = this;
      this.$validator.validateAll().then(() => {
        // eslint-disable-next-line
        console.log('Se va a enviar: ');
        console.log(self.procariano);
        var urlApi = '/api/procarianos/';
        $.ajax({
        	type:'POST',
        	url: urlApi,
        	data: self.procariano,
        	success: function(res){
        		console.log(res);
        		if(res.mensaje === 'Se pudo crear correctamente'){
        			$('#modalProcarianoCreado').modal('open');
        		}else{
        			alert('Error al ingresar en la base de datos');
        		}
        	}
        });
        
      }).catch(() => {
          // eslint-disable-next-line
          self.errorObj.campo = self.errors.errors[0].field;
          self.errorObj.msj = self.errors.errors[0].msg;
          $('#modalError').modal('open');
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
	var generoProcariano = $('#select-genero option:selected').val();
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