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
					self.formarNavbar();
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
			/*
		   	Esta función crea el navbar dependiendo del tipo de usuario que está loggeado.
		   */
		  this.crearDropdownPA();
			this.crearDropdownPF(this);
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
	}
});