Vue.use(VueMaterial);

var app = new Vue({
	el: '#app',
	data: {
		grupos: ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D', 'Grupo E'],
		grupoSel: '',
		fechaSel:''
	},
	mounted: function(){

	},
	methods: {
		toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    revisarDia: function(){
    	console.log(this.value)
    	var dia = new Date(this.value)
    	console.log(dia)
    	console.log(dia.getDay())
    	if(dia.getDay()!=5){
    		this.openDialog('dialog1');
    	}
    }
    
	}
});