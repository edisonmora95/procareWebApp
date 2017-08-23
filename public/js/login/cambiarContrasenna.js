/*
@Descripcion: 
@Autor: Jose Viteri
@FechaCreacion: 06/08/2017
@UltimaEdicion: --

*/



'use strict';

import Navbar from './../../components/navbar.vue';
Vue.component('navbar', Navbar); 
Vue.use(VeeValidate);
/*
	Validaciones. Cambio de mensajes de error
*/
const dictionary = {
	en: {
		messages: {
			email : function(){
				return 'Ingrese un correo válido.';
			},
			required: function(){
				return 'Este campo es obligatorio.';
			},
			regex: function(field, val){
				return 'Su contraseña debe contener al menos un cáracter en minúscula, otro en mayúscula y un número';
			}
		}
	}
};
VeeValidate.Validator.updateDictionary(dictionary);

var appCambio = new Vue({
	el: '#app-cambioContrasenna',
	mounted(){
		$('#modal1').modal();
		$('#modalError').modal();
	},
	data: {
		correo: '',
		viejaContrasenna: '',
		nuevaContrasenna: '',
		nuevaContrasenna2: '',
		fallaCambio: false,
		msg: '',
		errorObj: {}
	},
	methods: {
		cambio(){
			let self = this;
			var url = "/api/login/";
			let obj = {
				correo : $('#correo').val(),
				viejaContrasenna : $('#viejaContrasenna').val(),
				nuevaContrasenna : $('#nuevaContrasenna').val(),
				nuevaContrasenna2 : $('#nuevaContrasenna2').val()
			};
			if ( obj.nuevaContrasenna != obj.nuevaContrasenna2){
				self.fallaCambio = true;
				self.msg = "Contraseñas no coinciden";
				//console.log('este es el fallaCambio: ' +  self.fallaCambio);
				//console.log('este es el msg: ' +  self.msg);
			}else{
				$.ajax({
					type : 'POST',
					data : obj,
					url: url,
					success: function(res){
						console.log(res);
						if(res.status){
							$('#modal1').modal('open');
							setTimeout(function(){
								 window.location.href = '/';
							}, 2000);
							
						}
						else{

							self.fallaCambio = true;
							self.msg = res.message;
							//console.log("este es el textContent:" + this.$el);
							//console.log('este es el msg: ' +  self.msg + " " + res.message);
							//console.log(res);
						}
						
					},
					error : function(res){
						self.fallaCambio = true;
						self.msg = res.message;
						//console.log("este es el textContent:" + self.$el.textContent);
						//console.log('este es el msg: ' +  self.msg);
						//console.log(res);
						//console.log(self.fallaLogin);
					}
				});


			}

			
		},
		cancelar(){
			window.location.href = '/home';
		},
		validarAntesDeSubir(){
			let self = this;

			this.$validator.validateAll().then(respuesta => {
				//console.log('esta es respuesta');
			  self.cambio();       
	    }).catch(() => {
	      self.errorObj.campo = self.errors.errors[0].field;
	      self.errorObj.msj = self.errors.errors[0].msg;
	      $('#modalError').modal('open');
	    });
			
		}
	}

});

$(document).keypress(function(e) {
  if(e.which === 13) {
    appLogin.login();
  }
});