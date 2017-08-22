'use strict';

import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';

Vue.component('navbar', Navbar); 

let main = new Vue({
	el: '#main',
	created(){
	},
	mounted(){
		$('.modal').modal();
		$('select').material_select();
		//$('#datatable').DataTable();
		this.obtenerCandidatosDirector();

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
		existeError: false
		

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
							console.log('este es usuario ' + usuarioEncontrado.Persona)
							if (usuarioEncontrado.Persona.genero == "masculino"){
								self.candidatosH.push(usuarioEncontrado);
							}else if(usuarioEncontrado.Persona.genero == "femenino")
							//console.log(personalEncontrado)
								self.candidatosM.push(usuarioEncontrado);
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
		}
		
	}
});
