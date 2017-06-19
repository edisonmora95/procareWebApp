'use strict';

var appLogin = new Vue({
	el: '#appLogin',
	mounted(){

	},
	data: {
		correo: '',
		contrasenna: ''
	},
	methods: {
		login(){
			var url = "/";
			let obj = {
				correo : $('#UserName').val(),
				password : $('#Password').val()
			}
			$.ajax({
				type : 'POST',
				data : obj,
				success(res){
					console.log(res);
				}
			});
			
			}
		}
	});