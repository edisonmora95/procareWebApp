
var app = new Vue({
	el: '#app',
	data: {
		paralelos: [
      {
        nombre: 'Paralelo A',
        id: '1'
      },
      {
        nombre: 'Paralelo B',
        id: '2'
      },
      {
        nombre: 'Paralelo C',
        id: '3'
      }

    ],
		paraleloSel: {
      nombre: '',
      id: ''
    },
		fechaSel:'',
    ninos: [
      {
        nombre: 'Edison',
        id: '1'
      },
      {
        nombre: 'Xavier',
        id: '2'
      },
      {
        nombre: 'Joel',
        id: '3'
      },
      {
        nombre: 'Julio',
        id: '4'
      },
      {
        nombre: 'Jose',
        id: '5'
      },
    ],
    asistencias: [],
    faltas: [],
    justificadas: []
	},
	mounted: function(){
		//Materialize
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 100 // Creates a dropdown of 50 years to control year
    });
    $(".button-collapse").sideNav();
    $('.modal').modal();
		//Aplicacion
    this.crearSelectParalelos('select-paralelos', this.paraleloSel, 'div-select-paralelos', this.paralelos)
	},
	methods: {
    crearNavbar: function(){
      //TODO
    },
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    crearSelectParalelos: function(idSelect, paraleloEscogido, idDivSelect, paralelos){
      /*
        Parámetros:
          idSelect -> id del elemento select que se va a crear en esta función para contener a los paralelos deseados. Ejemplo: select-paralelos
          paraleloEscogido ->  Elemento con el cual se hará el 2 way data binding. Almacenará el paralelo escogido del select
          idDivSelect -> id del div que contendrá al elemento select que se va a crear
          paralelos -> Los paralelos que se van a mostrar en el select
      */
      var self = this;
      var select = $('<select>').attr({"id":idSelect});
      var optionSelectedAux = '#' + idSelect + ' option:selected';
      select.change(function(){
        paraleloEscogido.id = $(optionSelectedAux).val();
        paraleloEscogido.nombre = $(optionSelectedAux).text();
        //Una vez seleccionado el grupo, se hace la búsqueda en la base de datos sobre los chicos que pertenecen al grupo
        self.obtenerChicos();
      });
      var idDivSelectAux = '#' + idDivSelect;
      var divSelect = $(idDivSelectAux);
      self.crearSelectOptions(select, paralelos, divSelect);
      divSelect.append(select);
      select.material_select();
    },
    crearSelectOptions: function(select, paralelos, divSelect){
      /*
        Parámetros:
          select -> elemento select creado en la función crearSelectParalelos que mostrará a los paralelos deseados
          paralelos -> los paralelos que se mostrarán como opciones dentro del select
          divSelect -> elemento div que contendrá al select
      */
      var self = this;
      var optionDisabled = $('<option>').val("").text("");
      select.append(optionDisabled);
      $.each(paralelos, function(index, paralelo){
        var option = $('<option>').val(paralelo.id).text(paralelo.nombre);
        select.append(option);
      });
      divSelect.append(select)
    },
    obtenerChicos: function(){
      //Buscar en la base de datos al grupo en self.grupoSel, y devolver a los integrantes
    },
    subirAsistencias: function(){
      var self = this;
      var idRadioAsistencia = "";
      var idRadioFalta = "";
      var idRadioFJ = "";
			var flag = true;
      $.each(self.ninos, function(index, nino){
        //console.log('Revisando al chico: ' + chico.nombre + ' con id: ' + chico.id);
        idRadioAsistencia = '#asist-' + nino.id;
        idRadioFalta = '#falta-' + nino.id;
        idRadioFJ = '#fj-' + nino.id;
        //revisar asistencia
        if ($(idRadioAsistencia).is(':checked')) {
          self.asistencias.push(nino);
        }else if($(idRadioFalta).is(':checked')){
          self.faltas.push(nino);
        }else if($(idRadioFJ).is(':checked')){
          self.justificadas.push(nino);
        }else{
					//Si existe por lo menos un chico al cual no le he marcado su asistencia,
					self.asistencias = [];
					self.faltas = [];
					self.justificadas = [];
					$('#modalError').modal('open');
					flag = false;
					return false
				}
      });
			if(flag){
				//CODIGO PARA ENVIAR LOS DATOS A LA BASE DE DATOS
				//Abre el modal de confirmación en caso de éxito
				$('#modalConfirmacion').modal('open');
			}
    }

	},
	computed: {
		totalNinos(){
			var self = this;
			return self.ninos.length;
		},
		totalAsistieron(){
			var self = this;
			return self.asistencias.length;
		},
		totalFaltas(){
			var self = this;
			return self.faltas.length;
		},
		totalJustificados(){
			return this.justificadas.length;
		}
	}
});
//2 way data binding de la fecha-asistencia
$('#fecha-asistencia').change(function(){
  //Los hombres se reúnen los jueves y las mujeres los martes
  var dia = new Date($('#fecha-asistencia').val());
  if(dia.getDay()==6){
    app.$data.fechaSel = $('#fecha-asistencia').val();
  }else{
    $('#modalDia').modal('open');
    $('#fecha-asistencia').val("");
    app.$data.fechaSel = "";
  }
});
