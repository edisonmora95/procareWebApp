'use strict';

import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';

Vue.component('navbar', Navbar); 
Vue.use(Materials);

let main = new Vue({
	el: '#main',
	created(){
		this.obtenerCandidatosDirector();
	},
	mounted(){
		$('.modal').modal();
		$('select').material_select();
		//this.crearSelectOptions( $('.selectH'), this.candidatosM, $('.divH') );
		//$('#datatable').DataTable();
		

	},
	updated(){

	},
	data: {
		candidatosH: [],
		candidatosM: [],
		actualDirectorFormacionH: {},
		actualDirectorFormacionM: {},
		nombre: '',
		id: '',
		errorObj : {},
		msg : '',
		existeError: false,
		valor : 'este es valor'
		

	},
	computed: {
		listaUsuarios(){
			function compare(u1, u2){
				return ( (u1.nombres < u2.nombres) ? -1 : ( (u1.nombres > u2.nombres) ? 1 : 0) );
			}

			return this.usuarios.sort(compare);
		},
		esYaDirectorFormacion(){

		}
	},
	methods: {
		seleccionarUsuario(usuario){
			console.log(usuario)
			let self = this;
			self.usuarioSeleccionado = usuario;
			//self.crearSelectRoles('select-rol', self.rolEscogido, 'modal-content', self.roles);
		},
		obtenerCandidatosDirector: function(){
			let self = this;
			self.usuarios = [];
			$.ajax({
				type : 'GET',
				url: '/api/cargo/candidatoDirector',
				success: function(res){
					console.log(res);
					if(res.estado){
						$.each(res.datos, function(index, usuarioEncontrado){
							console.log('este es usuario genero ' + usuarioEncontrado.Persona.genero)
							if (usuarioEncontrado.Persona.genero == "masculino"){
								var userH = { 
									text: usuarioEncontrado.Persona.nombres + " " + usuarioEncontrado.Persona.apellidos,
									id : usuarioEncontrado.Persona.id
								}
								console.log(userH)
								self.candidatosH.push(userH);
								//console.log(usuarioEncontrado.Persona[nombres])
							}else if(usuarioEncontrado.Persona.genero == "femenino")
							//console.log(personalEncontrado)
									var userM = { 
										text: usuarioEncontrado.Persona.nombres + usuarioEncontrado.Persona.apellidos,
										id : usuarioEncontrado.Persona.id
									}
								self.candidatosM.push(userM);
							});
						console.log(res)
					}
					else{
							self.existeError = true;
							self.errorObj.msg = res.mensaje;
							console.log(res)
					}						
				},
				error : function(res){
						self.existeError = true;
						self.errorObj.msg = res.mensaje;
						console.log(res)
				}
			});
		},
		crearSelectOptions: function(select, roles, divSelect){
			/*
				Parámetros:
					select -> elemento select creado en la función crearSelectRoles que mostrará a los grupos deseados
					roles -> los roles que se mostrarán como opciones dentro del select
					divSelect -> elemento div que contendrá al select
			*/
			var optionDisabled = $('<option>').val("").text("");
			select.append(optionDisabled);
			$.each(roles, function(index, rol){
				var option = $('<option>').val(rol.id).text(rol.nombres);
				select.append(option);
			});
			divSelect.append(select);
		},
		subirDirectores: function(){
			let valorDirectorHombre = $('#selectH').val();
			let valorDirectorMujer = $('#selectM').val();

			if (valorDirectorMujer != null && valorDirectorHombre != null){
				this.hacerSolicitudGenero('masculino', valorDirectorHombre);
				this.hacerSolicitudGenero('femenino', valorDirectorMujer);


			}else if( valorDirectorMujer != null){
				this.hacerSolicitudGenero('femenino', valorDirectorMujer);
			}else if (valorDirectorHombre != null){
				this.hacerSolicitudGenero('masculino', valorDirectorHombre);
			}else{
				this.existeError = true;
				this.errorObj.msg = 'No se seteo ningun valor'
				$('#modalError').modal('modal');

			}
		},
		hacerSolicitudGenero : function(genero, id){
			let self = this;
    	console.log(self.personal);
    	var data = {
    		genero : genero,
    		id : id
    	}
    	//let urlApi = '/api/procarianos/';
    	$.ajax({
      	type:'POST',
      	url: '/api/cargo/directorF',
      	data: data,
      	success: function(res){
      		console.log('este es res: ' + res);
      		if(res.estado){
      			$('#modalSuccess').modal('open');
      		}else{
      			self.errorObj.msj = res.mensaje;
      			self.errorObj.statusApi = false;
      			$('#modalError').modal('open');
      		}
      	},
      	error : function(err){
      		console.log(err);
      	}
      });
		}
		
	}
});
