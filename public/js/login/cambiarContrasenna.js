'use strict';

import Navbar from './../../components/navbar.vue';
Vue.component('navbar', Navbar); 

var appCambio = new Vue({
	el: '#app-cambioContrasenna',
	mounted(){
		$('#modal1').modal();
	},
	data: {
		correo: '',
		viejaContrasenna: '',
		nuevaContrasenna: '',
		nuevaContrasenna2: '',
		fallaCambio: false,
		msg: ''
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
				self.msg = "Contraseñas no coinciden"
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
							console.log("este es el textContent:" + this.$el);
							console.log('este es el msg: ' +  self.msg + " " + res.message);
							console.log(res);
						}
						
					},
					error : function(res){
						self.fallaCambio = true;
						self.msg = res.message;
						console.log("este es el textContent:" + self.$el.textContent);
						console.log('este es el msg: ' +  self.msg);
						console.log(res);
						//console.log(self.fallaLogin);
					}
				});


			}

			
		},
		cancelar(){
			window.location.href = '/';
		}
	}

});

$(document).keypress(function(e) {
  if(e.which === 13) {
    appLogin.login();
  }
});