/*
	@Descripción: Este archivo llama a los componentes para crear grupo y escoger chicos del grupo
	@Autor: @edisonmora95
	@FechaCreación: 26-05-2017
*/
'use strict';
Vue.use(VeeValidate);

const dictionary = {
	en: {
		messages: {
			required(){
				return 'Este campo es obligatorio.';
			},
			regex(field, val){
				return 'No ingrese caracteres especiales.';
			}
		}
	}
};
VeeValidate.Validator.localize(dictionary);

let vm = new Vue({
	el: '#app',
	created(){
		this.obtenerEtapas(this);
		this.obtenerPosiblesAnimadores(this);
	},
	mounted() {
		this.inicializarMaterialize(this);
		this.obtenerChicosFormacion(this);
	},
	data: {
		estado 			: 'info',
		grupo				: {
			id 							: '',
			nombre					: '',
			animador				: '',
			genero					: '',
			etapa						: '',
			tipo						: 'Formación',
			cantidadChicos	: 0,
			numeroReuniones	: 0
		},
		etapasGrupo	: [],
		animadores 	: [],
		mensaje			: '',
		error 			: '',
		sinGrupo    : [],
		conGrupo		: [],
		integrantes	: [],
		mensajeError: '',
		errorAjax   : {
			header : '',
			content: '',
		},
	},
	methods: {
		/*
			@Descripción: 
				Inicializa los elementos de Materialize que se van a usar en el formulario.
    */
    inicializarMaterialize(self){
    	$('.modal').modal();
			$('select').material_select();
			$('#selectGenero').change( () => {
				self.grupo.genero = $('#selectGenero').val();
			});
			$('#selectEtapa').change( () => {
				self.grupo.etapa = $('#selectEtapa').val();
			});
			$('#selectAnimador').change( () => {
				self.grupo.animador = $('#selectAnimador').val();
			});
    },
    //////////////////////////////////
		//OBTENER DATOS DE LA BASE
		//////////////////////////////////
		/*
			@Descripción: Obtiene todas las etapas de la base de datos y las añade al aray para mostrarlas en el <select>
			@UltimaModificacion:
				25/12/2017	@edisonmora95	Añadido token al header
		*/
		obtenerEtapas(self){
			$.ajax({
				type   : 'GET',
				url    : '/api/etapas/',
				headers: {
	        "x-access-token" : localStorage.getItem('token')
		    },
				success(res){
					self.etapasGrupo = res.datos;
					self.armarSelect(self, self.etapasGrupo, '#selectEtapa');
				},
				error(err){
					if( err.status === 403 ){
						vm.error404(err.responseJSON.mensaje);
					}else{
						Materialize.toast('No se pudieron obtener las etapas', 4000, 'rounded error');	
					}
					console.log(err)
				}
			});
		},
		/*
			@Descripción:
				Obtiene a todos los procarianos que pueden ser animadores de la base de datos.
				A partir de eso, se arma el array para mostrar a los animadores en el select
			@UltimaModificacion:
				25/12/2017	@edisonmora95	Añadido token al header
		*/
		obtenerPosiblesAnimadores(self){
			$.ajax({
				type   : 'GET',
				url    : '/api/animadores/posibles',
				headers: {
	        "x-access-token" : localStorage.getItem('token')
		    },
				success(res){
					self.armarArrayAnimadores(self, res.datos);
				},
				error(err){
					if( err.status === 403 ){
						vm.error404(err.responseJSON.mensaje);
					}else{
						Materialize.toast('No se pudieron obtener los posibles animadores', 4000, 'rounded error');	
					}
					console.log(err)
				}
			});
		},
		crearRegistroGrupo(self, grupo){
			$.ajax({
				type: 'POST',
				url : '/api/grupos/',
				headers: {
	        "x-access-token" : localStorage.getItem('token')
		    },
				data: grupo,
				success(res){
					if( res.estado ){
						self.grupo.id = res.datos;
						self.estado 	= 'seleccion';
					}
				},
				error(jqXHR, textStatus, error){
					console.log(jqXHR)
					console.log(textStatus)
					$('#modalErrorAjax').modal('open');
				}
			});
		},
		/*
			@UltimaModificacion:
				25/12/2017	@edisonmora95	Añadido token al header
		*/
		obtenerChicosFormacion(self){
			$.ajax({
				type   : 'GET',
				url    : '/api/procarianos/formacion/sinGrupo',
				headers: {
	        "x-access-token" : localStorage.getItem('token')
		    },
				success(res){
					console.log(res)
					self.armarArraySinGrupo(self, res.datos);
				},
				error(err){
					console.log(err)
				}
			});
		},
		agregarAGrupo(self){
			const data = { integrantes: JSON.stringify(self.integrantes) };
			$.ajax({
				type: 'POST',
				url : '/api/grupos/' + this.grupo.id + '/anadir/bulk',
				headers: {
	        "x-access-token" : localStorage.getItem('token')
		    },
				data: data,
				success(res){
					$('#modalGrupoCreado').modal('open');
				},
				error(err){
					self.mensajeError = 'No se pudo conectar con el servidor';
					$('#mensajeError').modal('open');
					console.log(err);
				}
			});
		},
		//////////////////////////////////
		//FUNCIONES PARA ARMAR EL DOM
		//////////////////////////////////
		/*
			@Descripción:
				Arma un select con los datos de un array
			@Params:
				array -> datos obtenidos de la base de datos
				idselect -> id del elemento con #
    */
    armarSelect(self, array, idSelect){
    	$(idSelect).empty();
    	$(idSelect).append('<option value=""  disabled selected></option>');
    	$.each(array, (index, elemento) => {
    		$(idSelect).append('<option value=' + elemento.id + '>' + elemento.nombre + '</option>');
    	});
    	$(idSelect).material_select();
    },
    armarArrayAnimadores(self, animadores){
			$.each(animadores, function(index, animador){
				let animadorObj = {
					id 		: animador.procarianoId,
					nombre: animador.Persona.nombres + ' ' +animador.Persona.apellidos
				};
				self.animadores.push(animadorObj);
			});
			self.armarSelect(self, self.animadores, '#selectAnimador');
		},
		armarArraySinGrupo(self, procarianos){
			$.each(procarianos, function(index, procariano){
				let obj = {
					id 		: procariano.procarianoId,
					nombre: procariano.Persona.nombres + ' ' + procariano.Persona.apellidos
				};
				self.sinGrupo.push(obj);
			});
		},
		crearMensajeError(self, res){
			let valueError = res.sequelizeStatus.errors[0].value;
			let idProcarianoError = valueError.split('-')[1];
			let nombreProcariano = self.buscarProcariano(self, idProcarianoError);
			self.mensajeError = 'No se puede ingresar a los procarianos porque ' + nombreProcariano + ' pertenece a otro grupo';
		},
		/*
			@Descripcion: Activa el modal de error Ajax
		*/
		error404(mensaje){
    	vm.errorAjax.header = 'Usuario no autorizado';
			vm.errorAjax.content=  mensaje;	
			$('#modalAjax').modal('open');
    },
		//////////////////////////////////
		//EVENTOS
		//////////////////////////////////
		continuar(){
			if( this.validarForm(this) ){
				this.crearRegistroGrupo(this,  this.grupo);
			}
			//this.estado = 'seleccion'
		},
		validarForm(self){
			if( $('#nombre').val() === '' ){
				return false;
			}
			else if( $('#selectGenero').val() === null ){
				self.mensaje = 'Debe ingresar si el grupo es de Procare o Procare Mujeres';
				self.error   = 'genero';
				return false;	
			}
			else if( $('#selectEtapa').val() === null ){
				self.mensaje = 'Debe seleccionar la etapa a la que pertenece el grupo';
				self.error   = 'etapa';
				return false;	
			}
			else if( $('#selectAnimador').val() === null ){
				self.mensaje = 'Debe ingresar el nombre del animador del grupo';
				self.error   = 'animador';
				return false;	
			}
			else{
				return true;	
			}
		},
		cancelar(){
			//Regresar al menú principal
			window.location.href = '/grupos';
		},
		/*
			Añade al chico seleccionado al grupo
			Quita al chico seleccionado del array de sinGrupo
		*/
		anadir(chico){
			this.conGrupo.push(chico);
			this.sinGrupo.splice(this.sinGrupo.indexOf(chico), 1);
		},
		/*
			Quita al chico seleccionado del grupo
			Añade al chico seleccionado al array de sinGrupo
		*/
		quitar(chico){
			this.sinGrupo.push(chico);
			this.conGrupo.splice(this.conGrupo.indexOf(chico), 1);
		},
		aceptar(){
			this.armarArray(this);
			this.agregarAGrupo(this);
		},	
		/*
			@Descripción:
				Armo el array para enviar a la api para añadir a los chicos al grupo
		*/
		armarArray(self){
			self.integrantes = [];
			$.each(self.conGrupo, function(index, chico){
				let integrante = {
					fechaInicio	: new Date(),
					fechaFin 		: null,
					GrupoId 		: parseInt(self.grupo.id),
					ProcarianoId: parseInt(chico.id)
				};
				self.integrantes.push(integrante);
			});
		}
	}
});
