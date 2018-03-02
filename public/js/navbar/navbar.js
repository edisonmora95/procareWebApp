let navbarApp = new Vue({
    el: '#navbarApp',
    created() {
        this.obtenerUsuarioLogeado(this);
    },
    mounted() {
        $(".button-collapse").sideNav();
        $(".dropdown-button").dropdown();
    },
    data: {
        usuario: {},
        grupoId: 0,
        logoImagen: '/images/logoProcareHombres2.png',
        candidatosFormacion: [],
        elegidoFormacionHombre: '',
        elegidoFormacionMujer: ''
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
            self.formarNavbar();
            self.generoUsuarioImagen();
          },
          error(err){
            console.log(err)
          }
        });
      },
      /*
        @Descripcion: Obtiene la información del procariano como:
          Grupo actual
          Tipo actual
          Información completa de Persona
          Información completa de Procariano
      */
      obtenerInformacionDeProcariano(self, idPersona) {
        const urlApi = '/api/procarianos/ ' + idPersona;
        $.ajax({
          type   : 'GET',
          url    : urlApi,
          headers: {
            "x-access-token" : localStorage.getItem('token')
          },
          success(res) {
            self.procariano = res.datos.procariano;
            self.obtenerGrupoDeAnimador(self, self.procariano.id);
          },
          error(err) {
              console.log(err);
          }
        })
      },
      /*
        @Descripción:
          Obtiene el grupo del animador logeado y almacena su id en self.grupoId
      */
      obtenerGrupoDeAnimador(self, idAnimador) {
        const urlApi = '/api/animadores/' + idAnimador;
        $.ajax({
          type   : 'GET',
          url    : urlApi,
          headers: {
          "x-access-token" : localStorage.getItem('token')
        },
          success(res) {
              self.grupoId = res.datos.GrupoId;
          },
          error(err) {
              console.log(err);
          }
        });
      },
      ////////////////////////////////////////////
      //MODIFICACIONES AL DOM
      ////////////////////////////////////////////
      formarNavbar() {
        if ($.inArray('Director Ejecutivo', this.usuario.roles) >= 0) {
          this.crearDropdownPAd(this); // agrega la parte de procare adminsitracion que es basicamnete cargo, benefactor/donacion, y personal (exclusivo para procare administracion)
        }
        this.crearDropdownPA();
        this.crearDropdownPF(this);
      },
      crearDropdownPF(self) {
        //Esta función crea las pestañas del dropdown de Procare Formación del navbar.
        let menuPF = $('#ulProcareFormacion');
        self.crearLi('Asistencias', '/asistencias/formacion', menuPF);

        let usuarioEsPersonal = self.verificarRolDeUsuario(self, 'Personal');
        let usuarioEsAnimador = self.verificarRolDeUsuario(self, 'Animador');
        let usuarioEsDirectorFormacion = self.verificarRolDeUsuario(self, 'Director Procare Formacion');
        let usuarioEsDirectorEjecutivo = self.verificarRolDeUsuario(self, 'Director Ejecutivo');

        if ( usuarioEsPersonal || usuarioEsDirectorEjecutivo ) {
            self.crearDropdown(self, 'Grupos', 'dropGrupos', '/grupos/nuevo', '/grupos/', menuPF, 'Crear', 'Buscar');
            self.crearDropdown(self, 'Procarianos', 'dropProcarianos', '/procarianos/nuevo/', '/procarianos/', menuPF, 'Crear', 'Buscar');
        }
        if ( usuarioEsDirectorFormacion ) {
          self.crearLi('Grupos', '/grupos/', menuPF);
          self.crearLi('Procarianos', '/procarianos/', menuPF);
        }
        if ( usuarioEsAnimador ) {
          $.when($.ajax(self.obtenerInformacionDeProcariano(self, self.usuario.id))).then(function() {
            let urlGrupo = '/grupos/' + self.grupoId;
            self.crearLi('Grupo', urlGrupo, menuPF);
          });
        }
      },
      crearDropdown(self, htmlAnchorExterior, idDropdown, rutaCrear, rutaBuscar, ulContenedor, opcion1Navbar, opcion2Navbar) {
        //Creo el li exterior
        let liExterior = $('<li>');
        let aExterior = $('<a>').html(htmlAnchorExterior)
            .attr({
              'class'         : 'dropdown-button',
              'href'          : '#',
              'data-activates': idDropdown,
              'data-hover'    : 'hover'
            });
        liExterior.append(aExterior);
        //Creo el ul del dropdown
        let ulDropdown = $('<ul>').attr({
          'id'   : idDropdown,
          'class': 'dropdown-content'
        });
        //Creo los li del dropdown. Crear y Buscar
        self.crearLi(opcion1Navbar, rutaCrear, ulDropdown);
        self.crearLi(opcion2Navbar, rutaBuscar, ulDropdown);

        $('#navbarApp').append(ulDropdown);
        ulContenedor.append(liExterior);
      },
      crearLi(htmlAnchor, hrefAnchor, ulContenedor) {
          let li = $('<li>');
          let a = $('<a>').html(htmlAnchor).attr({
              href: hrefAnchor
          });
          li.append(a);
          ulContenedor.append(li);
      },
      crearDropdownPAd(self) {
        //donacion , benefactores , personal , director formacion
        /*
        //personal
        let liPersonal = $('<li>');
        let aPersonal = $('<a>').html('Personal');
        liPersonal.append(aPersonal);
        $('#ulProcareAdministracion').append(liPersonal);

        //director formacion
        let liDirectorPF = $('<li>');
        let aDirectorPF = $('<a>').html('Director procare formación');
        liDirectorPF.append(aDirectorPF);
        $('#ulProcareAdministracion').append(liDirectorPF);
        //benefactores
        let liBenefactores = $('<li>');
        let aBenefactores = $('<a>').html('Benefactores');
        liBenefactores.append(aBenefactores);
        $('#ulProcareAdministracion').append(liBenefactores);

        // donaciones
        let liDonaciones = $('<li>');
        let aDonaciones = $('<a>').html('Donaciones');
        liDonaciones.append(aDonaciones);
        $('#ulProcareAdministracion').append(liDonaciones);
        */
        let menuPad = $('#ulProcareAdministracion');
        //self.crearLi('Personal','/personal/', menuPad);
        //crearDropdown(self, htmlAnchorExterior, idDropdown, rutaCrear, rutaBuscar, ulContenedor, opcion1Navbar, opcion2Navbar)
        self.crearDropdown(self, 'Personal', 'dropPersonal', '/personal/nuevo', '/personal/', menuPad, 'Crear', 'Buscar');
        self.crearDropdown(self, 'Usuarios', 'dropUsuarios', '/usuarios/editarUsuarios', '/usuarios', menuPad, 'Editar', 'Ver');
        self.crearDropdown(self, 'Benefactor', 'dropBenefactor', '/benefactores/nuevo', '/benefactores/', menuPad, 'Crear', 'Ver')
            //self.crearLi('Cargos', '/usuarios', menuPad);
            //self.crearLi('Director de procare formacion', '#modalFormacion', menuPad);
      },
      crearDropdownPA() {
        //Esta función crea las pestañas del dropdown de Procare Acción del navbar.
        let liAsistencias = $('<li>');
        let aAsistencias = $('<a>').html('Asistencias');
        liAsistencias.append(aAsistencias);
        $('#ulProcareAccion').append(liAsistencias);
        let liParalelos = $('<li>');
        let aParalelos = $('<a>').html('Paralelos');
        liParalelos.append(aParalelos);
        $('#ulProcareAccion').append(liParalelos);
        let liNinos = $('<li>');
        let aNinos = $('<a>').html('Niños');
        liNinos.append(aNinos);
        $('#ulProcareAccion').append(liNinos);
      },
      /*
      	@Descripción:
      		Verifica si el usuario logeado tiene el rol indicado
      	@Params:
      		rolIndicado -> String -> Rol que se quiere averiguar.
      */
      verificarRolDeUsuario(self, rolIndicado) {
          let roles = self.usuario.roles;
          let flag = false;
          $.each(roles, function(index, rol) {
              if (rol === rolIndicado) {
                  flag = true;
                  return false;
              }
          });
          return flag;
      },
      /*
      	creador : JV
      	fecha : 11/08/2017
      	@Descripción: Pone la imagen del logo en la navbar dependiendo si eres mujer u hombre
      */
      generoUsuarioImagen: function() {
        let self = this;
        if (self.usuario.genero == 'femenino') {
            self.logoImagen = '/images/logoProcareMujeres2.png';
        } else {
            self.logoImagen = '/images/logoProcareHombres2.png';
        }
      },
    }
});