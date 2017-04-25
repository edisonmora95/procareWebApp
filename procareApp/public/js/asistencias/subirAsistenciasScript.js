
Vue.use(VueMaterial);

var app = new Vue({
	el: '#app',
	data: {
		prueba: 'hola',
		grupos: ['Grupo Aadsfasdfasfafadaadfas', 'Grupo B', 'GRupo C', 'Grupo D', 'Grupo E'],
		grupoSel: '',
		fechaSel:''
	},
	mounted: function(){

	},
	methods: {
		toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    }
    
	}
});