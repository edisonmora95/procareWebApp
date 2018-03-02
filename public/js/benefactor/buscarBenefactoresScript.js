/*
  @Descripción: Controlador de la vista de Benefactores.ejs
  @Autor: @joseAlcivar
  @FechaCreación: 30/07/2017
*/
'use strict';

import VueTheMask from 'vue-the-mask';
import VMoney from 'v-money';

Vue.use(VueTheMask);
Vue.use(VMoney);

Vue.filter('numeral', function(value) {
  return numeral(value).format('0,0');
});

let main = new Vue({
    el: '#main',
    beforeMount: function() {
      this.buscarBenefactores(this);
    },
    mounted: function() {
      this.inicializarMaterialize(this);
    },
    data: {
      benefactores : [],
      errorAjax    : {
        titulo     : '',
        descripcion: ''
      },
      money        : {
        decimal  : '.',
        thousands: ',',
        prefix   : '$ ',
        precision: 2,
        masked   : false /* doesn't work with directive */
      },
    },
    methods: {
      inicializarMaterialize(self) {
        $(".button-collapse").sideNav();
         $('.modal').modal();
      },
      /*
         @Descripcion : carga el Benefactor en la tabla
      */
      buscarBenefactores: function(self) {
        $.ajax({
          type   : 'GET',
          url    : '/api/benefactores/',
          success: function(res) {
            console.log(res)
            self.benefactores = res.datos;
          },
          error  : function(res) {
            self.mostrarMensajeDeErrorAjax(self, 'Error AJAX', res.mensaje);
            console.log(res)
          }
        });
      },
      mostrarMensajeDeErrorAjax(self, titulo, descripcion) {
        self.errorAjax.titulo = titulo;
        self.errorAjax.descripcion = descripcion;
        $('#modalErrorAjax').modal('open');
      },
        PreguntaparaEliminar(persona) {
            this.nombre_eliminado = persona.razonsocial;
            this.id_benefactor_eliminar = persona.personaId;
            $('#modalBenfactorEliminar').modal('open');
        },
        //INGRESA UN NUEVO BENEFACTOR 
        EliminarBenefactor() {

            var urlApi = '/api/benefactor/' + this.id_benefactor_eliminar;
            //alert(urlApi);

            console.log(urlApi);
            $.ajax({
                type: 'DELETE',
                url: urlApi,
                success: function(res) {
                        console.log(res.status);
                        console.log(res.mensaje);
                        if (res.status) {
                            $('#modalBenfactorEliminado').modal('open');
                        } else {
                            self.mostrarMensajeDeErrorAjax(self, 'Error de base de datos', 'Error al tratar de eliminar el registro seleccionado. Intente nuevamente.');
                        }

                    } //,
                    //error(err) {
                    //  console.log(err);
                    // self.mostrarMensajeDeErrorAjax(self, 'Error de conexión', 'No se pudo conectar con el servidor. Intente nuevamente.');
                    //}
            });
        },
    }
});