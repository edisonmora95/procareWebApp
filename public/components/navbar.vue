<template>
	<nav>
		<a href="#" data-activates="slide-out" class="button-collapse show-on-large"><i class="material-icons">menu</i></a>
		<a href="" class="brand-logo">Procare</a>
		<ul id="slide-out" class="side-nav">
	    <li>
	    	<div class="userView">
		      
		    </div>
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
</template>

<script>
	module.exports = {
		created(){
			
		},
		mounted(){
			$(".button-collapse").sideNav();
			this.formarNavbar();
		},
		data: function() {
			return{
				greeting: 'Hello'
			}
		},
		methods: {
			formarNavbar() {
			/*
		   	Esta función crea el navbar dependiendo tel tipo de usuario que está loggeado.
		   */
			let usuario = 'personal';
			if (usuario === 'personal') {
				this.crearDropdownPA();
				this.crearDropdownPF();
			}
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
			let liGrupos = $('<li>');
			let aGrupos = $('<a>').html('Grupos');
			liGrupos.append(aGrupos);
			$('#ulProcareFormacion').append(liGrupos);
			let liProcarianos = $('<li>');
			let aProcarianos = $('<a>').html('Procarianos');
			liProcarianos.append(aProcarianos);
			$('#ulProcareFormacion').append(liProcarianos);
		},
		}
	}
</script>