'use strict';

var appLogin = new Vue({
	el: '#appLogin',
	mounted(){
		
	},
	data: {
		correo: '',
		contrasenna: '',
		fallaLogin: false
	},
	methods: {
		login(){
			let self = this;
			var url = "/";
			let obj = {
				correo : $('#UserName').val(),
				password : $('#Password').val()
			};
			$.ajax({
				type : 'POST',
				data : obj,
				url: url,
				success(res){
					console.log(res);
					if(res.status){
						window.location.href = '/home';
					}
					else{
						self.fallaLogin = true;
						//console.log(self.fallaLogin);
					}
					
				},
				error(res){
					self.fallaLogin = true;
					//console.log(self.fallaLogin);
				}
			});
			
			}
		}
});

$(document).keypress(function(e) {
  if(e.which === 13) {
    appLogin.login();
  }
});