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
		    <li><a href="#">Salir</a></li>
		  </ul>
		</nav>
	</div>
	
</template>

<script>
	module.exports = {
		created(){
			this.obtenerUsuarioLogeado();
		},
		mounted(){
			$(".button-collapse").sideNav();
			$(".dropdown-button").dropdown();
			//this.formarNavbar();
		},
		data: function() {
			return{
				usuario: {}
			}
		},
		methods: {
			obtenerUsuarioLogeado(){
				let self = this;
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
			formarNavbar() {
				/*
			   	Esta función crea el navbar dependiendo del tipo de usuario que está loggeado.
			   */
			   
			  if($.inArray('director ejecutivo', this.usuario.roles) >= 0){
			  	this.crearDropdownPAd(); // agrega la parte de procare adminsitracion que es basicamnete cargo, benefactor/donacion, y personal (exclusivo para procare administracion)
			  }
			  
			  //this.crearDropdownPAd();
			  this.crearDropdownPA();
				this.crearDropdownPF();
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
			crearDropdownPF() {
				//Esta función crea las pestañas del dropdown de Procare Formación del navbar.
				let liAsistencias = $('<li>');
				let aAsistencias = $('<a>').html('Asistencias');
				liAsistencias.append(aAsistencias);
				$('#ulProcareFormacion').append(liAsistencias);


				if($.inArray('Personal', this.usuario.roles) >= 0){
					this.crearDropdownGrupos();
					this.crearDropdownProcarianos();	
					//Usuarios
					//
					/*
				if($.inArray('director ejecutivo', this.usuario.roles) >= 0){
						let liUsuarios = $('<li>');
						let aUsuarios = $('<a>')
																		.html('Usuarios')
																		.attr({
																			'href': '/usuarios/',
																		});
						liUsuarios.append(aUsuarios);
						$('#slide-out').append(liUsuarios);
					}
					*/
					
				}else{
					//Grupos
					let liGrupo = $('<li>');
					let aGrupo = $('<a>').html('Grupo');
					liGrupo.append(aGrupo);
					$('#ulProcareFormacion').append(liGrupo);
					//Procarianos
					let liProcarianos = $('<li>');
					let aProcarianos = $('<a>').html('Integrantes');
					liProcarianos.append(aProcarianos);
					$('#ulProcareFormacion').append(liProcarianos);
				}				
			},
			crearDropdownGrupos(){
				/*
				Procare Formación
					Grupos -> <li>
						Crear
						Buscar
				*/
				//Primero creo el li exterior.
				let liGrupos = $('<li>');
				let aGrupos = $('<a>').html('Grupos')
															.attr({
																'class': 'dropdown-button',
																'href': '#',
																'data-activates': 'dropGrupos',
																'data-hover': 'hover'
															});
				liGrupos.append(aGrupos);
				//Luego creo el ul del dropdown interior a Grupos
				let ulDropGrupos = $('<ul>').attr({
					'id': 'dropGrupos',
					'class': 'dropdown-content'
				});
				//Creo los li del dropdown. Crear y Buscar
				let liCrear = $('<li>');
				let aCrear = $('<a>').html('Crear').attr({'href': '/grupos/nuevo'});
				liCrear.append(aCrear);
				let liBuscar = $('<li>');
				let aBuscar = $('<a>').html('Buscar').attr({'href': '/grupos/'});
				liBuscar.append(aBuscar);
				ulDropGrupos.append(liCrear, liBuscar);
				$('#template').append(ulDropGrupos);
				$('#ulProcareFormacion').append(liGrupos);
			},
			crearDropdownProcarianos(){
				/*
				Procare Formación
					Procarianos -> <li>
						Ingresar
						Buscar
				*/
				//Primero creo el li exterior.
				let liProcarianos = $('<li>');
				let aProcarianos = $('<a>').html('Procarianos')
															.attr({
																'class': 'dropdown-button',
																'href': '#',
																'data-activates': 'dropProcarianos',
																'data-hover': 'hover'	
															});
				liProcarianos.append(aProcarianos);
				//Luego creo el ul del dropdown interior a Grupos
				let ulDropProcarianos = $('<ul>').attr({
					'id': 'dropProcarianos',
					'class': 'dropdown-content'
				});
				//Creo los li del dropdown. Ingresar y Buscar
				let liCrear = $('<li>');
				let aCrear = $('<a>').html('Ingresar').attr({'href': '/procarianos/nuevo/'});
				liCrear.append(aCrear);
				let liBuscar = $('<li>');
				let aBuscar = $('<a>').html('Buscar').attr({'href': '/procarianos/'});
				liBuscar.append(aBuscar);
				ulDropProcarianos.append(liCrear, liBuscar);
				$('#template').append(ulDropProcarianos);
				$('#ulProcareFormacion').append(liProcarianos);
			}
		}
	}
</script>

<style>
	#dropGrupos, #dropProcarianos{
		margin-left: 50% !important;
	}
</style>