/*
	@Descripción: Controlador de la vista de editarGrupo.ejs
	@Autor: @edisonmora95
	@FechaCreación: 3/06/2017
*/

let App = new Vue({
	el: '#editarGrupoApp',
	created(){
		let pathname = window.location.pathname;
		this.idGrupo = pathname.split('/')[2];
		this.obtenerUsuarioContectado();
		this.obtenerGrupo(this, this.idGrupo);
		this.obtenerChicosFormacion(this);
	},
	mounted(){
		this.inicializarMaterialize();
	},
	data: {
		usuario : {},	//Usuario conectado
		idGrupo : 0,	//Id del grupo sacado de la dirección de la página
		grupo   : {},	//Grupo a editar
		animador: {},	//Animador del grupo
		etapa   : {},
		error : '',
		mensaje : '',
		etapas  : [],		//Array que contendrá todas las etapas,
		animadores : [],		//Array de todos los animadores
		sinGrupo 	 : []
	},
	methods: {
		/*
			@Descripción: 
				Inicializa los elementos de Materialize que se van a usar en el formulario.
    */
    inicializarMaterialize(){
    	$('.modal').modal();
			$('select').material_select();
			$('#selectGenero').change( () => {
				App.grupo.genero = $('#selectGenero').val();
			});
			$('#selectEtapa').change( () => {
				App.grupo.etapaNueva = $('#selectEtapa').val();
			});
			$('#selectAnimador').change( () => {
				App.grupo.animadorNuevo = $('#selectAnimador').val();
			});
    },
		//////////////////////////////////////////////////
		//Llamadas a la base de datos
		//////////////////////////////////////////////////
		obtenerUsuarioContectado(){
			$.ajax({
				type: 'GET',
				url: '/api/login/usuarios',
				success(res){
					App.usuario = res;
				}
			});
		},
		/*
			@Descripción:
				Obtiene toda la información del grupo
				Asigna los valores
				Crea los selects
		*/
		obtenerGrupo(self, idGrupo){
			$.ajax({
				type: 'GET',
				url : '/api/grupos/' + idGrupo,
				success(res){
					self.grupo 								 = res.datos.grupo;
					self.grupo.animadorAntiguo = res.datos.procarianoAnimador.procarianoId;
					self.grupo.animadorNuevo 	 = null;
					self.grupo.etapaAntigua 	 = self.obtenerEtapaActualDeGrupo(self.grupo.Etapas).id;
					self.grupo.etapaNueva 		 = null;
					self.integrantes 					 = self.armarArrayIntegrantes(res.datos.procarianos);
					$('#selectGenero').val(self.grupo.genero);
					$('#selectGenero').material_select();
					self.obtenerEtapas(self);
					self.obtenerAnimadores(self);
				}
			});
		},
		/*
			@Descripción: 
				Obtiene todas las etapas de la base de datos
				Las añade al aray para mostrarlas en el <select>
				Se selecciona la etapa actual del grupo
		*/
		obtenerEtapas(self){
			$.ajax({
				type: 'GET',
				url : '/api/etapa/',
				success(res){
					self.etapas							= res.datos;
					self.armarSelect(self.etapas, '#selectEtapa', self.grupo.etapaAntigua);
				}
			});
		},
		/*
			@Descripción: 
				Obtiene todas los posibles animadores de la base de datos
				Las añade al aray para mostrarlas en el <select>
				Se selecciona la etapa actual del grupo
		*/
		obtenerAnimadores(self){
			$.ajax({
				type: 'GET',
				url: '/api/animadores/',
				success(res){
					self.animadores = self.armarArrayAnimadores(res.datos);
					self.armarSelect(self.animadores, '#selectAnimador', self.grupo.animadorAntiguo);
				}
			});
		},
		/*
			@Descripción:
				Obtiene a todos los chicos de Procare Formación que no tienen grupo
				Los almacena en el array sinGrupo
		*/
		obtenerChicosFormacion(self){
			$.ajax({
				type: 'GET',
				url: '/api/procarianos/formacion',
				success(res){
					self.sinGrupo = self.armarArraySinGrupo(res.datos);	
				}
			});
		},
		anadirChicoAGrupo(chico, data){
			$.ajax({
				type: 'POST',
				url : '/api/pg/anadir',
				data: data,
				success(res){
					Materialize.toast('Procariano añadido a grupo', 2000, 'rounded');
				},
				error(err){
					console.log(err)
					Materialize.toast('No se pudo añadir al grupo', 4000, 'rounded error');
					App.sinGrupo.push(chico);
					App.integrantes.splice(App.integrantes.indexOf(chico), 1);
				}
			});
		},
		quitarChicoDeGrupo(chico){
			const urlApi = '/api/pg/quitar/' + chico.idProcariano;
			$.ajax({
				type: 'PUT',
				url : urlApi,
				data: {
					idGrupo: App.grupo.id
				},
				success(res){
					Materialize.toast('Procariano quitado del grupo', 2000, 'rounded');
				}, 
				error(err){
					Materialize.toast('No se pudo conectar con el servidor', 4000, 'rounded error');
					App.integrantes.push(chico);
					App.sinGrupo.splice(App.sinGrupo.indexOf(chico), 1);
				}
			})
		},
		enviarEdicion(grupo){
			let urlApi = '/api/grupos/' + App.grupo.id;
			$.ajax({
				type: 'PUT',
				url : urlApi,
				data: grupo,
				success(res){
					Materialize.toast(res.mensaje, 4000);
					window.location.href = '/grupos/' + App.idGrupo;
				},
				error(err){
					console.log(err)
					Materialize.toast(err.mensaje, 4000);
				}
			});
		},
		//////////////////////////////////////////////////
		//Helpers
		//////////////////////////////////////////////////
		armarArrayIntegrantes(procarianos){
			let integrantes = [];
			$.each(procarianos, function(index, procariano){
				if(App.validarProcarianoEnGrupo(procariano)){
					let integranteObj = {
						idProcariano: procariano.idProcariano,
						nombre 			: procariano.Persona.nombres + ' ' + procariano.Persona.apellidos,
					};
					integrantes.push(integranteObj);
				}
			});
			return integrantes;
		},
		armarArraySinGrupo(procarianos){
			let array = [];
			$.each(procarianos, (index, procariano) => {
				let obj = {
					idProcariano : procariano.procarianoId,
					nombre 			 : procariano.Persona.nombres + ' ' + procariano.Persona.apellidos
				};
				array.push(obj);
			});
			return array;
		},
		obtenerEtapaActualDeGrupo(etapas){
			let etapaActual = {};
			$.each(etapas, function(index, etapa){
				let fechaFin = etapa.GrupoEtapa.fechaFin;
				if(fechaFin === null){
					etapaActual = etapa;
					return false;
				}
			});		
			return etapaActual;
		},
		armarArrayAnimadores(animadores){
			let array = [];
			$.each(animadores, (i, animador) => {
				let animadorObj = {
					id    : animador.procarianoId,
					nombre: animador.Persona.nombres + ' ' +animador.Persona.apellidos
				};
				array.push(animadorObj);
			});
			return array;
		},
		/*
			@Return: true si el procariano se encuentra actualmente en el grupo
		*/
		validarProcarianoEnGrupo(procariano){
			let flag = true;
			for (var i = 0; i < procariano.Grupos.length; i++) {
				let actual = procariano.Grupos[i];
				const noEstaEnGrupo = ( actual.ProcarianoGrupo.fechaFin != null );
				if( noEstaEnGrupo ){
					flag = false;
					return false;
				}
			}
			return flag;
		},
		formCompleto(){
			if( $('#nombre').val() === '' ){
				App.mensaje = 'El campo nombre no puede quedar vacío';
				return false;
			}
			else if( $('#genero').val() === '' ){
				App.mensaje = 'El campo género no puede quedar vacío';
				return false;
			}
			else if( $('#etapa').val() === '' ){
				App.mensaje = 'El campo etapa no puede quedar vacío';
				return false;
			}
			else if( $('#animador').val() === '' ){
				App.mensaje = 'El campo animador no puede quedar vacío';
				return false;
			}
			else{
				return true;
			}
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
    armarSelect(array, idSelect, actual){
    	$(idSelect).empty();
    	$(idSelect).append('<option value=""  disabled selected></option>');
    	$.each(array, (i, elemento) => {
    		$(idSelect).append('<option value=' + elemento.id + '>' + elemento.nombre + '</option>');
    	});
    	$(idSelect).val(actual);
    	$(idSelect).material_select();
    },
    //////////////////////////////////
		//EVENTOS
		//////////////////////////////////
		anadir(chico){
			App.integrantes.push(chico);
			App.sinGrupo.splice(App.sinGrupo.indexOf(chico), 1);
			const data = {
				idGrupo 		 : App.grupo.id,
				idProcariano : chico.idProcariano
			};
			App.anadirChicoAGrupo(chico, data);
		},
		quitar(chico){
			App.sinGrupo.push(chico);
			App.integrantes.splice(App.integrantes.indexOf(chico), 1);
			App.quitarChicoDeGrupo(chico);
		},
		aceptar(){
			if(!App.formCompleto()){
				$('#modalCamposIncompletos').modal('open');
			}else{
				App.enviarEdicion(App.grupo);
			}
		},
	}
});