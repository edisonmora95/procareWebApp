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
			var urlRuta = '/grupos/';
			if( this.correo === 'personal@hotmail.com' && this.contrasenna === ''){
				console.log('dasfsda');
				/*$.ajax({
					type: 'GET',
					url: urlRuta,
					success: function(){

					}
				});*/
				window.location.href = '/grupos/';
			}
		}
	}
});