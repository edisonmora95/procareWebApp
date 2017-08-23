'use strict';

import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';

Vue.component('navbar', Navbar); 
Vue.use(Materials);
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
			alpha_spaces: function(){
				return 'Este campo sólo puede contener letras y espacios.';
			},
			digits: function(field, length){
				return 'Este campo sólo puede contener ' + length + ' números.';
			},
			numeric: function(){
				return 'Este campo sólo puede contener números.';
			},
			alpha_num: function(){
				return 'Este campo sólo puede contener letras y números.';
			},
			regex: function(field, val){
				return 'No ingrese caracteres especiales.';
			}
		}
	}
};
VeeValidate.Validator.updateDictionary(dictionary);

let ingresarNinoApp = new Vue({
	el: '#ingresarNinoApp',
	created(){

	},
	mounted(){

	},
	data: {

	},
	mounted(){

	}
});