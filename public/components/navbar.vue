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
		    <li>
		    	<img :src="logoImagen" alt="logo procare" class=" responsive-img circle" >
		    </li>
		    <li>
		    	<h4> {{usuario.nombre}} {{usuario.apellidos}}</h4>
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
		    <li><a href="/cambioContrasenna">Cambiar contraseña</a></li>
		    <li><a href="/logout">Salir</a></li>

		  </ul>
		</nav>
		<!--
		<div id="modalFormacion" class="modal">
			<div class="modal-content" id="modal-content">
			  <h4 class="center-align">Asignación de directores de formación </h4>
				<form action="">
							<div class="row">
								  <div class="input-field col s6">							  
								    <select >
								      <option  v-for="usuario in listaUsuarios" v-if="usuario.esProcariano && usuario.genero == 'masculino' " :value="usuario.id">{{usuario.nombres}} {{usuario.apellidos}}</option>
								    </select>
								    <label>Hombres</label>
								  </div>
									<div class="input-field col s6">
								    <select >
								      <option v-for="usuario in listaUsuarios" v-if="usuario.esProcariano && usuario.genero == 'femenino' " :value="usuario.id">  {{usuario.nombres}} {{usuario.apellidos}}</option>
								    </select>
								    <label>Mujeres</label>
								  </div>
							</div>
						</form>
			</div>
			<div class="modal-footer">
			      <a href="#" class="modal-action modal-close waves-effect waves-green btn-flat" >Aceptar</a>
			</div>
		</div>
		-->
	</div>

	
</template>

<script>
	module.exports = {
		created(){
			this.obtenerUsuarioLogeado(this);
		},
		mounted(){
			this.generoUsuarioImagen();
			$(".button-collapse").sideNav();
			$(".dropdown-button").dropdown();
			if($.inArray('director ejecutivo', this.usuario.roles) >= 0){
			  	//this.cargarCandidatosFormacion(this); // genera y carga la informacion de los posibles candidatos a formacion
			 }
			//this.formarNavbar();
		},
		data: function() {
			return{
				usuario: {},
				grupoId: 0,
				logoImagen: '/images/logoProcareHombres2.png',
				candidatosFormacion: [],
				elegidoFormacionHombre: '',
				elegidoFormacionMujer: ''
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
			  	this.crearDropdownPAd(this); // agrega la parte de procare adminsitracion que es basicamnete cargo, benefactor/donacion, y personal (exclusivo para procare administracion)
			  }
			  
			  //this.crearDropdownPAd();
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
				self.crearLi('Cargos', '/usuarios', menuPad);
				self.crearLi('Cargos', '#modalFormacion', menuPad);
				//self.crearDropdown(self, 'Procarianos', 'dropProcarianos', '/procarianos/nuevo/','/procarianos/', menuPF);
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
			},
			/*
			creador : JV
			fecha : 11/08/2017
			//Pone la imagen del logo en la navbar dependiendo si eres mujer u hombre

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
	}
</script>

<style>
	#dropGrupos, #dropProcarianos{
		margin-left: 50% !important;
	}

	img {
    display: block;
    margin: auto;
    width: 40%;
	}

	h4 {
		color: black;
		text-align: center;
	}
</style>