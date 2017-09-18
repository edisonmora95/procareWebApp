'use strict';
import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';

Vue.component('navbar', Navbar); 

let main = new Vue({
	el: '#main',
	created(){
	},
	mounted(){
		$('.modal').modal();
		$('select').material_select();
		//$('#datatable').DataTable();
		this.obtenerAsistencias();

	},
	updated(){

	},
	data: {
		asistencias: [],
		/*usuarioSeleccionado: {},
		rolEscogido: {
			nombre: '',
			id: ''
		},
		valorBotonFormacion : "  Agregar director formación",*/
		msg : '',
		fallaCargar: false
	},
	computed: {
		listaAsistencias(){
			function compare(u1, u2){
				return ( (u1.descripcion < u2.descripcion) ? -1 : ( (u1.descripcion > u2.descripcion) ? 1 : 0) );
			}

			return this.asistencias.sort(compare);
		}
	},
	methods: {
		moment(date) {
      return moment(date);
    },
    date(date) {
      var es = moment().locale('es');
      if (date === undefined || date === '') {
        return '----';
      }
      return moment(date).format('DD MMMM YYYY');
    },
		
		obtenerAsistencias: function(){
			let self = this;
			self.asistencias = [];
			$.ajax({
				type : 'GET',
				url: '/api/reuniones/',
				success: function(res){
					console.log(res);
					if(res.estado){
						$.each(res.datos, function(index, usuarioEncontrado){
							//console.log(personalEncontrado)
								self.asistencias.push(usuarioEncontrado);
							});
						console.log(res)
					}
					else{
							self.fallaCargar = true;
							self.msg = res.mensaje;
							console.log(res)
					}						
				},
				error : function(res){
					self.fallaCargar = true;
					self.msg = res.mensaje;
					console.log(res)
				}
			});
		}
		
	}
});
