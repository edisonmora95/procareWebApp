/*
	@Descripcion: 
	@Autor: Jose Viteri
	@FechaCreacion: 01/08/2017
	@UltimaEdicion: 
		22/12/2017 @edisonmora95 Cambio de ruta, añade token a LS
*/
'use strict';

let vm = new Vue({
	el: '#appLogin',
	mounted() {
		
	},
	data: {
		correo     : '',
		contrasenna: '',
		fallaLogin : false
	},
	methods: {
		login() {
			let self = this;
			var url = "/";
			let obj = {
				correo   : $('#UserName').val(),
				password : $('#Password').val()
			};
			$.ajax({
				type : 'POST',
				data : obj,
				url  : '/api/login/',
				success(res){
					localStorage.setItem('token', res.token);
					window.location.href = '/home';
				},
				error(res){
					self.fallaLogin = true;
				}
			});
		}
	}
});

$(document).keypress(function(e) {
  if(e.which === 13) {
    vm.login();
  }
});
