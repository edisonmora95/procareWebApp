'use strict';

var app = new Vue({
	el: '#asistenciasApp',
	data: {
    generoSel: '',
		grupos   : [],
    gruposAux: [],
		grupoSel: {},
		fechaSel:'',
    chicos: [],
    asistencias: [],
    faltas: [],
    justificadas: [],
    usuario : {},
	},
  created(){
    this.obtenerUsuarioLogeado(this);
  },
	mounted(){
    this.inicializarDOM(this);
	},
	methods: {
    ////////////////////////////////////////////
    //LLAMADAS A LA API
    ////////////////////////////////////////////
    /*
      @Descripción: 
        Obtiene la información del usuario logeado. Para armar la navbar de acuerdo con su rol.
    */
    obtenerUsuarioLogeado(self) {
      $.ajax({
        type   : 'GET',
        url    : '/api/login/usuarios',
        headers: {
          "x-access-token" : localStorage.getItem('token')
        },
        success(res) {
          self.usuario = res.datos;
          const esAnimador = verificarRolDeUsuario(self.usuario.roles, 'Animador');
          if ( esAnimador ) {
            //Obtener solo el grupo del animador
          } else {
            self.obtenerGrupos(self);
          }
        },
        error(err){
          console.log(err)
        }
      });
    },
    /*
      @Descripción: Obtiene todos los grupos de la base de datos
    */
    obtenerGrupos(self){
      $.ajax({
        type   : 'GET',
        url    : '/api/grupos/',
        headers: {
          "x-access-token" : localStorage.getItem('token')
        },
        success(res){
          self.grupos    = res.datos;
          self.gruposAux = res.datos;
        },
        error(err){
          console.log(err)
        }
      });
    },
    /*
      @Descripción: Una vez seleccionado un grupo, obtiene tods su información de la base
    */
    obtenerGrupoSeleccionado(self, idGrupo){
      let urlApi = '/api/grupos/' + idGrupo;
      $.ajax({
        type   : 'GET',
        url    : urlApi,
        headers: {
          "x-access-token" : localStorage.getItem('token')
        },
        success(res){
          console.log(res)
          self.grupoSel = self.armarObjGrupoSel(res.datos);
          self.armarArrayChicos(self, res.datos);
        }
      });
    },
    ////////////////////////////////////////////
    //MODIFICACIONES AL DOM
    ////////////////////////////////////////////
    inicializarDOM(self){
      $('.datepicker').pickadate({
        monthsFull   : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort  : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdaysFull : ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        today: 'Hoy',
        clear: 'Limpiar',
        close: 'Cerrar',
        selectMonths : true, // Creates a dropdown to control month
        selectYears  : 100, // Creates a dropdown of 15 years to control year,
        closeOnSelect: true // Close upon selecting a date,
      });
      $(".button-collapse").sideNav();
      $('.modal').modal();
      $('select').material_select();

      ////////////////////////////////////////////
      //FUNCIONES ON CHANGE
      ////////////////////////////////////////////
      $('#genero').change(function(){
        const genero = $('#genero').val()
        self.grupos  = $.grep(self.gruposAux, function(grupo, index){
          return grupo.genero === genero;
        });
        $('#grupos').prop('disabled', false);
        //Esto se hace porque Materialize y Vue no se llevan...
        //Si hago el material_select() enseguida, no se actualiza el select.
        //Supongo que es porque estos eventos no se hacen uno después de otro
        window.setTimeout(function(){
          $('select').material_select();  
        }, 5);
      });

      //Obtiene de la base de datos toda la información del grupo seleccionado
      //Habilita la fecha de asistencia
      $('#grupos').change(function(){
        let idGrupo = $('#grupos').val();
        self.obtenerGrupoSeleccionado(self, idGrupo);
        $('#fechaAsistencia').prop('disabled', false);
      });

      //Valida que la fecha ingresada sea correcta de acuerdo al grupo.
      //Desbloquea la siguiente section
      $('#fechaAsistencia').change(function(){
        const genero      = $('#genero').val();
        const fechaValida = validarFechaAsistencia(genero, '#fechaAsistencia');

        if( fechaValida ){
          self.fechaSel = obtenerDate('#fechaAsistencia');
          $('#sectionResultados').css('display', 'block');
          self.inicializarRadioButtons(self);
        }else{
          $('#modalDia').modal('open');
          $('#fechaAsistencia').val("");
          self.fechaSel = '';
          $('#sectionResultados').css('display', 'none');
        }

      });
    },
    /*
      @Descripción: Marca todos los radio buttons de asistencias como:  Asistió
    */
    inicializarRadioButtons(self){
      let idRadioAsistencia = '';
      $.each(self.chicos, function(index, chico){
        idRadioAsistencia = '#asist-' + chico.id;
        $(idRadioAsistencia).attr('checked', 'checked');
      });
    },
    armarObjGrupoSel(res){
      return {
        nombre: res.grupo.nombre,
        id    : res.grupo.id,
        tipo  : res.grupo.tipo,
        cantidadChicos: res.procarianos.length
      }
    },
    armarArrayChicos(self, res){
      self.chicos = [];
      $.each(res.procarianos, function(index, procariano){
        let chicoObj = {
          nombre: procariano.Persona.nombres + ' ' + procariano.Persona.apellidos,
          id    : procariano.idProcariano
        };
        self.chicos.push(chicoObj);
      });
    },
    subirAsistencias(){
      var self = this;
      let flag = true;
      let idRadioAsistencia = "";
      let idRadioFalta      = "";
      let idRadioFJ         = "";
			
      $.each(self.chicos, function(index, chico){
        //console.log('Revisando al chico: ' + chico.nombre + ' con id: ' + chico.id);
        idRadioAsistencia = '#asist-' + chico.id;
        idRadioFalta      = '#falta-' + chico.id;
        idRadioFJ         = '#fj-'    + chico.id;
        //revisar asistencia
        if ($(idRadioAsistencia).is(':checked')) {
          self.asistencias.push(chico);
        }else if($(idRadioFalta).is(':checked')){
          self.faltas.push(chico);
        }else if($(idRadioFJ).is(':checked')){
          self.justificadas.push(chico);
        }else{
					//Si existe por lo menos un chico al cual no le he marcado su asistencia,
					self.asistencias  = [];
					self.faltas       = [];
					self.justificadas = [];
					$('#modalError').modal('open');
					flag = false;
					return false
				}
      });
      //CODIGO PARA ENVIAR LOS DATOS A LA BASE DE DATOS
			//Abre el modal de confirmación en caso de éxito
			if(flag){
				$('#modalConfirmacion').modal('open');
			}
			//Luego de subir las asistencias, se debe actualizar la parte del grupo
    }

	},
	computed: {
		totalChicos(){
			var self = this;
			return self.chicos.length;
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


////////////////////////////////////////////
//VALIDACIONES
////////////////////////////////////////////
/*
  @Descripción: Valida que la fecha ingresada sea correcta dependiendo del grupo seleccionado.
*/
function validarFechaAsistencia(genero, pickerId){
  const fechaSeleccionada = obtenerDate(pickerId);
  const diaSeleccionado   = fechaSeleccionada.getDay();
  const jueves = 4;
  const martes = 2;
  
  const fechaP  = ( diaSeleccionado === jueves ) && ( genero === 'Procare' );
  const fechaPM = ( diaSeleccionado === martes ) && ( genero === 'Procare Mujeres' );
  return ( fechaP || fechaPM );
}
/*
  @Descripción:
    Verifica si el usuario logeado tiene el rol indicado
  @Params:
    rolIndicado -> String -> Rol que se quiere averiguar.
*/
function verificarRolDeUsuario(roles, rolIndicado) {
  let flag = false;
  for (let i = 0; i < roles.length; i++) {
    if ( roles[i] === rolIndicado ) {
      flag = true;
      break;
    }
  }
  return flag;
}

////////////////////////////////////////////
//HELPERS
////////////////////////////////////////////
function obtenerDate(pickerId){
  const year  = $(pickerId).pickadate('picker').get('highlight', 'yyyy');
  const month = $(pickerId).pickadate('picker').get('highlight', 'mm');
  const day   = $(pickerId).pickadate('picker').get('highlight', 'dd');
  const fecha = year + '/' + month + '/' + day;
  return new Date(fecha);
}