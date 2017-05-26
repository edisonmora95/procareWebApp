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
		data: function() {
			return{
				greeting: 'Hello'
			}
		}
	}
</script>