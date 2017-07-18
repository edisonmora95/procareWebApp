'use strict';

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
					success(res){
						console.log(res);
						if(res.status){
							$('#modal1').modal('open');
							setTimeout(function(){
								 window.location.href = '/';
							}, 2000);
							
						}
						else{
							self.fallaLogin = true;
							self.msg = res.message;

							console.log('error');
						}
						
					},
					error(res){
						self.fallaLogin = true;
						self.msg = res.message;
						console.log('error');
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