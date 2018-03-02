/*
@Descripcion: 
@Autor: Jose Viteri
@FechaCreacion: 06/08/2017
@UltimaEdicion: --

*/



'use strict';

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
			var url = "/api/login/cambiar";
			let obj = {
				correo 					 : self.correo,
				viejaContrasenna : self.viejaContrasenna,
				nuevaContrasenna : self.nuevaContrasenna,
			};
			$.ajax({
				type : 'POST',
				data : obj,
				url  : url,
				headers: {
	        "x-access-token" : localStorage.getItem('token')
		    },
				success: function(res){
					console.log(res);
					$('#modal1').modal('open');
				},
				error : function(res){
					console.log(res)
					self.fallaCambio = true;
					self.msg = res.message;
				}
			});
		},
		cancelar(){
			window.location.href = '/home';
		},
		validarAntesDeSubir(){
			let self = this;
			this.$validator.validateAll()
			.then(resultado => {
				if ( resultado ) {
					console.log('resultado:', resultado)
					console.log('nuevaContrasenna:', self.nuevaContrasenna)
					console.log('nuevaContrasenna2:', self.nuevaContrasenna2)
					if( self.nuevaContrasenna === self.nuevaContrasenna2 ){
						self.fallaCambio = false;
						self.cambio();
					}else {
						self.fallaCambio = true;
						self.msg = "Contraseñas no coinciden";
						return;
					}
				}
				console.log('esta es respuesta:', resultado);
	    }).catch(() => {
	      self.errorObj.campo = self.errors.errors[0].field;
	      self.errorObj.msj   = self.errors.errors[0].msg;
	      $('#modalError').modal('open');
	    });
			
		},

	}

});

$(document).keypress(function(e) {
  if(e.which === 13) {
    appLogin.login();
  }
});