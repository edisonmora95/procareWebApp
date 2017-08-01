<template>
	<div id="template">
		<nav class="orange darken-1">
			<a href="#" data-activates="slide-out" class="button-collapse show-on-large"><i class="material-icons">menu</i></a>
			<a href="/" class="brand-logo">Procare</a>
			<ul id="slide-out" class="side-nav">
		    <li>
		    	<div class="userView">
			      
			    </div>
		    </li>
		    <li class="no-padding">
		    	<ul class="collapsible collapsible-accordion">
		    		<li>
		    			<a class="collapsible-header waves-effect waves-teal">Procare<i class="material-icons right">arrow_drop_down</i></a>
		    			<div class="collapsible-body">
		            <ul id="ulProcareAdministracion">
		            </ul>
		          </div>
		    		</li>
		    	</ul>
		    </li>
		    <li class="no-padding">
		    	<ul class="collapsible collapsible-accordion">
		    		<li>
		    			<a class="collapsible-header waves-effect waves-teal">Procare Formación<i class="material-icons right">arrow_drop_down</i></a>
		    			<div class="collapsible-body">
		            <ul id="ulProcareFormacion">
		            </ul>
		          </div>
		    		</li>
		    	</ul>
		    </li>
		    <li class="no-padding">
		    	<ul class="collapsible collapsible-accordion">
		    		<li>
		    			<a class="collapsible-header waves-effect waves-teal">Procare Acción<i class="material-icons right">arrow_drop_down</i></a>
		    			<div class="collapsible-body">
		            <ul id="ulProcareAccion">
		            </ul>
		          </div>
		    		</li>
		    	</ul>
		    </li>
		    <li><a href="/logout">Salir</a></li>
		  </ul>
		</nav>
	</div>
	
</template>

<script>
	module.exports = {
		created(){
			this.obtenerUsuarioLogeado(this);
		},
		mounted(){
			$(".button-collapse").sideNav();
			$(".dropdown-button").dropdown();
			//this.formarNavbar();
		},
		data: function() {
			return{
				usuario: {},
				grupoId: 0,
			}
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
						console.log(self.usuario.roles)
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
			   
			  if($.inArray('director ejecutivo', this.usuario.roles) >= 0){
			  	this.crearDropdownPAd(); // agrega la parte de procare adminsitracion que es basicamnete cargo, benefactor/donacion, y personal (exclusivo para procare administracion)
			  }
			  
			  //this.crearDropdownPAd();
			  this.crearDropdownPA();
				this.crearDropdownPF(this);
			},
			crearDropdownPAd(){
				//donacion , benefactores , personal , director formacion

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

				$('#template').append(ulDropdown);
				ulContenedor.append(liExterior);
			},
			crearLi(htmlAnchor, hrefAnchor, ulContenedor){
				let li = $('<li>');
				let a = $('<a>').html(htmlAnchor).attr({href: hrefAnchor});
				li.append(a);
				ulContenedor.append(li);
			}
		}
	}
</script>

<style>
	#dropGrupos, #dropProcarianos{
		margin-left: 50% !important;
	}
</style>