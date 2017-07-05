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
			var url = "/login/";
			let obj = {
				correo : $('#UserName').val(),
				password : $('#Password').val()
			}
			$.ajax({
				type : 'POST',
				data : obj,
				success(res){
<<<<<<< HEAD

					console.log(res);
					if(res.status){
						window.location.href = '/';
					}
					else{
						self.fallaLogin = true;
						console.log(self.fallaLogin);

					//console.log(res);
=======
					console.log(res);
>>>>>>> 2bc1d58b9be44010fd39109b3dbe1fb6faa16149
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

					console.log(self.fallaLogin);

					//console.log(self.fallaLogin);

				}
			});
			
			}
		}
	});