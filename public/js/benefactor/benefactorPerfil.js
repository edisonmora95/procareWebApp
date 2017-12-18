
let vm = new Vue({
	el : '#main',
	created(){
		const path = window.location.pathname;
		const idPersona = path.split('/')[3];
		console.log(idPersona)
		this.obtenerBenefactor(idPersona);
	},
	mounted(){

	},
	data    : {
		benefactor   : {},
		mask_format  : {
      credit_card       : "####-####-####-####",
      telef_convencional: "(0#)###-####",
      telf_celular      : "0##-###-####",
      diaCobroMask      : "##",
      Ruc_Mask          : "#############"
    },
    money        : {
      decimal  : '.',
      thousands: ',',
      prefix   : '$ ',
      precision: 2,
      masked   : false /* doesn't work with directive */
    },
    payment_icons: {
      visa       : "ccs ccs-visa",
      mastercard : "ccs ccs-mastercard",
      american   : "ccs ccs-amex",
      discover   : "ccs ccs-discover",
      dinnersclub: "ccs ccs-dinersclub"
    },
    errorObj     : {
    	campo : '',
    	msj   : ''
    },
    errorAjax    : {
    	titulo : '',
    	descripcion : ''
    }
	},
	methods : {
		obtenerBenefactor(idPersona){
			const urlApi = '/api/benefactores/' + idPersona;
			$.ajax({
				type 	 : 'GET',
				url 	 : urlApi,
				success: function(res){
					console.log(res)
          vm.benefactor = res.datos[0]
          console.log(vm.benefactor)
				},
        error: function(err){
          console.log('eror')
          console.log(err)
        }
			});
		},
		validarIconoTarjeta: function(tarjetaCredito) {
			console.log(tarjetaCredito)
      let value = tarjetaCredito.substring(0, 2);
      if (value[0] == 4 || value == 13 || value == 16) {
        return this.payment_icons.visa;
      } else if ((value > 51 && value < 56) || value == 16) {
        return this.payment_icons.mastercard;
      } else if (value == 34 || value == 37 || value == 15) {
        return this.payment_icons.american;
      } else if (value == 30 || value == 36 || value == 38 || value == 14) {
        return this.payment_icons.dinnersclub;
      }
    },
    //Funciones para editar la forma en la que se muestra la fecha
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
	}
})