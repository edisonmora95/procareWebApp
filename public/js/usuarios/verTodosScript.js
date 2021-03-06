'use strict';


let vm = new Vue({
	el: '#main',
	created(){
		this.obtenerUsuarios();
	},
	mounted(){
		$('.modal').modal();
		$('select').material_select();
	},
	data: {
		usuarios: [],
		usuarioSeleccionado: {},
		rolEscogido: {
			nombre: '',
			id: ''
		},
		valorBotonFormacion : "  Agregar director formación",
		msg : '',
		fallaCargar: false
	},
	computed: {
		listaUsuarios(){
			function compare(u1, u2){
				return ( (u1.nombres < u2.nombres) ? -1 : ( (u1.nombres > u2.nombres) ? 1 : 0) );
			}

			return this.usuarios.sort(compare);
		},
		esYaDirectorFormacion(){

		}
	},
	methods: {
		//////////////////////////////////
		//OBTENER DATOS DE LA BASE
		//////////////////////////////////
		obtenerUsuarios: function(){
			//vm.usuarios = [];
			$.ajax({
				type   : 'GET',
				url    : '/api/cargo/usuarios',
				headers: {
	        "x-access-token" : localStorage.getItem('token')
		    },
				success: function(res){
					vm.usuarios = res.datos;
					console.log(res);
				},
				error  : function(res){
					vm.fallaCargar = true;
					vm.msg 				 = res.mensaje;
					console.log(res);
				}
			});
		},
		seleccionarUsuario(usuario){
			console.log(usuario);
			let self = this;
			self.usuarioSeleccionado = usuario;
			//self.crearSelectRoles('select-rol', self.rolEscogido, 'modal-content', self.roles);
		},
		crearSelectRoles: function(idSelect, rolEscogido, idDivSelect, roles){
			/*
				Parámetros:
					idSelect -> id del elemento select que se va a crear en esta función para contener a los grupos deseados. Ejemplo: select-grupo-formacion
					rolEscogido ->  Elemento de data con el cual se hará el 2 way data binding. Almacenará el grupo escogido del select
					idDivSelect -> id del div que contendrá al elemento select que se va a crear
					roles -> Los roles que se van a mostrar en el select
			*/
			//Todos los parametros de id vienen sin el #
			var self = this;
			var select = $('<select>').attr({"id":idSelect});
			var optionSelectedAux = '#' + idSelect + ' option:selected';

			select.change(function(){
				rolEscogido.id = $(optionSelectedAux).val();
				rolEscogido.nombre = $(optionSelectedAux).text();
				self.usuarioSeleccionado.rol = $(optionSelectedAux).text();
			});
			var idDivSelectAux = '#' + idDivSelect;
			var divSelect = $(idDivSelectAux);
			self.crearSelectOptions(select, roles, divSelect);
			divSelect.append(select);
			$('#select-rol').val(self.usuarioSeleccionado.rol);
			select.material_select();
		},	
		crearSelectOptions: function(select, roles, divSelect){
			/*
				Parámetros:
					select -> elemento select creado en la función crearSelectRoles que mostrará a los grupos deseados
					roles -> los roles que se mostrarán como opciones dentro del select
					divSelect -> elemento div que contendrá al select
			*/
			var optionDisabled = $('<option>').val("").text("");
			select.append(optionDisabled);
			$.each(roles, function(index, rol){
				var option = $('<option>').val(rol.id).text(rol.rol);
				select.append(option);
			});
			divSelect.append(select);
		},
		esYaDirectorFormacion: function(usuario){
			let self = this;
			self.usuarioSeleccionado = usuario;
			return self.usuarioSeleccionado['rolText'].includes('Director procare formación');
		},
		
	}
});
