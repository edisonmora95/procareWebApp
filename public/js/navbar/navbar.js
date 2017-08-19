let navbarApp = new Vue({
	el: '#navbarApp',
	created(){
		this.obtenerUsuarioLogeado(this);
	},
	mounted(){
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
		/*
			@Descripción: 
				Obtiene la información del usuario logeado. Para armar la navbar de acuerdo con su rol.
		*/
		obtenerUsuarioLogeado(self){
			$.ajax({
				type: 'GET',
				url: '/api/login/usuarios',
				success(res){
					self.usuario = res;
					console.log(self.usuario)
					self.formarNavbar();
					self.generoUsuarioImagen();
				}
			});
		},
		/*
			@Descripción:
				Verifica si el usuario logeado tiene el rol indicado
			@Params:
				rolIndicado -> String -> Rol que se quiere averiguar.
		*/
		verificarRolDeUsuario(self, rolIndicado){
			let roles = self.usuario.roles;
			let flag = false;
			$.each(roles, function(index, rol){
				if(rol === rolIndicado){
					flag = true;
					return false;
				}
			});
			return flag;
		},
		obtenerInformacionDeProcariano(self, idPersona){
			const urlApi = '/api/procarianos/	' + idPersona;
			$.ajax({
				type: 'GET',
				url: urlApi,
				success(res){
					self.procariano = res[0];
					self.obtenerGrupoDeAnimador(self, self.procariano.procarianoID);
				},
				error(err){
					console.log(err);
				}
			})
		},
		/*
			@Descripción:
				Obtiene el grupo del animador logeado y almacena su id en self.grupoId
		*/
		obtenerGrupoDeAnimador(self, idAnimador){
			const urlApi = '/api/animadores/' + idAnimador;
			console.log(urlApi)
			$.ajax({
				type: 'GET',
				url: urlApi,
				success(res){
					console.log(res)
					self.grupoId = res.datos.GrupoId;
					console.log(self.grupoId)
				},
				error(err){
					console.log(err);
				}
			});
		},
		formarNavbar() {
			if($.inArray('Director Ejecutivo', this.usuario.roles) >= 0){
		  	this.crearDropdownPAd(this); // agrega la parte de procare adminsitracion que es basicamnete cargo, benefactor/donacion, y personal (exclusivo para procare administracion)
		  }
		  this.crearDropdownPA();
			this.crearDropdownPF(this);
		},
		crearDropdownPAd(self){
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
			self.crearDropdown(self, 'Personal', 'dropPersonal', '/personal/nuevo', '/personal/', menuPad);
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
		crearDropdownPF(self) {
			//Esta función crea las pestañas del dropdown de Procare Formación del navbar.
			let menuPF = $('#ulProcareFormacion');
			self.crearLi('Asistencias', '/asistencias/formacion', menuPF);

			let usuarioEsPersonal = self.verificarRolDeUsuario(self, 'Personal');
			let usuarioEsAnimador = self.verificarRolDeUsuario(self, 'Animador');
			let usuarioEsDirectorFormacion = self.verificarRolDeUsuario(self, 'Director Procare Formacion');
			let usuarioEsDirectorEjecutivo = self.verificarRolDeUsuario(self, 'Director Ejecutivo');
			
			if(usuarioEsDirectorEjecutivo){
				self.crearLi('Usuarios', '/usuarios/', menuPF);
				self.crearDropdown(self, 'Grupos', 'dropGrupos', '/grupos/nuevo', '/grupos/', menuPF);
				self.crearDropdown(self, 'Procarianos', 'dropProcarianos', '/procarianos/nuevo/','/procarianos/', menuPF);
			}
			if(usuarioEsPersonal){
				self.crearDropdown(self, 'Grupos', 'dropGrupos', '/grupos/nuevo', '/grupos/', menuPF);
				self.crearDropdown(self, 'Procarianos', 'dropProcarianos', '/procarianos/nuevo/','/procarianos/', menuPF);
			}
			if(usuarioEsDirectorFormacion){

			}
			if(usuarioEsAnimador){
				$.when( $.ajax(self.obtenerInformacionDeProcariano(self, self.usuario.id)) ).then(function(){
					let idGrupo = self.grupoId;
					let urlGrupo = '/grupos/' + idGrupo;
					self.crearLi('Grupo', urlGrupo, menuPF);	
				});
				
			}
		},
		crearDropdown(self, htmlAnchorExterior, idDropdown, rutaCrear, rutaBuscar, ulContenedor){
			//Creo el li exterior
			let liExterior = $('<li>');
			let aExterior = $('<a>').html(htmlAnchorExterior)
															.attr({'class':'dropdown-button', 'href':'#', 'data-activates':idDropdown, 'data-hover':'hover'});
			liExterior.append(aExterior);
			//Creo el ul del dropdown
			let ulDropdown = $('<ul>').attr({ 'id': idDropdown, 'class': 'dropdown-content' });
			//Creo los li del dropdown. Crear y Buscar
			self.crearLi('Crear', rutaCrear, ulDropdown);
			self.crearLi('Buscar', rutaBuscar, ulDropdown);

			$('#navbarApp').append(ulDropdown);
			ulContenedor.append(liExterior);
		},
		crearLi(htmlAnchor, hrefAnchor, ulContenedor){
			let li = $('<li>');
			let a = $('<a>').html(htmlAnchor).attr({href: hrefAnchor});
			li.append(a);
			ulContenedor.append(li);
		},
		/*
			creador : JV
			fecha : 11/08/2017
			@Descripción: Pone la imagen del logo en la navbar dependiendo si eres mujer u hombre
		*/
		generoUsuarioImagen : function(){
			let self = this;
			if (self.usuario.genero == 'femenino'){
				self.logoImagen = '/images/logoProcareMujeres2.png';
			}else{
				self.logoImagen = '/images/logoProcareHombres2.png';
			}
		},
		cargarCandidatosFormacion : function(self){
			const urlApi = '/api/usuarios/';
			//let self = this;
			//console.log(urlApi)
			$.ajax({
				type: 'GET',
				url: urlApi,
				success(res){
					console.log(res)
					if (res.estado){
						self.candidatosFormacion = res.datos;
						$.each(res.datos, function(index, element){
							if($.inArray('director formacion', element.roles) >= 0){
								if (element.genero == 'masculino'){
										self.elegidoFormacionHombre = element;
					  		
					 			}else if ( element.genero == 'femenino') {
					 					self.elegidoFormacionMujer = element;
					 			}
					 		}								
						});

					}else{
						console.log(res);
					}
					self.grupoId = res.datos.GrupoId;
					console.log(self.grupoId)
				},
				error(err){
					console.log(err);
				}
			});

		},
		designarDirectorFormacion : function(){
			/*

			const urlApi = '/api/usuarios/' + self.;
			let self = this;

			let data = 
			//console.log(urlApi)
			$.ajax({
				type: 'GET',
				url: urlApi,
				success(res){
					console.log(res)
					if (res.estado){
						self.candidatosFormacion = res.datos;
						$.each(res.datos, function(index, element){
							if($.inArray('director formacion', element.roles) >= 0){
								if (element.genero == 'masculino'){
										self.elegidoFormacionHombre = element;
					  		
					 			}else if ( element.genero == 'femenino') {
					 					self.elegidoFormacionMujer = element;
					 			}
					 		}								
						});

					}else{
						console.log(res);
					}
					self.grupoId = res.datos.GrupoId;
					console.log(self.grupoId)
				},
				error(err){
					console.log(err);
				}
			});
			*/
		}
	}
});