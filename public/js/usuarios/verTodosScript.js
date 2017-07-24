'use strict';

import Navbar from './../../components/navbar.vue';
import Materials from 'vue-materials';

Vue.component('navbar', Navbar); 

let main = new Vue({
	el: '#main',
	created(){
	},
	mounted(){
		$('.modal').modal();
		$('select').material_select();


		/*
		$('#datatable').DataTable( {
        "language": {
            "lengthMenu": "",
            "zeroRecords": "Nada para mostrar",
            "info": "Mostrando _PAGE_ de _PAGES_",
            "infoEmpty": "Nada encontrado",
            "infoFiltered": "(filtrado de  _MAX_ registros totales)"
        }
    } );
	*/
	},
	updated(){

	},
	data: {
		usuarios: [
			{
			  "id": 1,
			  "nombres": "Vernor",
			  "apellidos": "Crolla",
			  "email": "vcrolla0@engadget.com",
			  "rolText": ["Geological Engineer"],
			  "rolId": 1,
			  "esProcariano" : true,
			  "genero" : "masculino"
			}, {
			  "id": 2,
			  "nombres": "Roxie",
			  "apellidos": "MacInnes",
			  "email": "rmacinnes1@cnbc.com",
			  "rolText": ["Cost Accountant"],
			  "rolId": 2,
			  "esProcariano" : false,
			  "genero" : "masculino"
			}, {
			  "id": 3,
			  "nombres": "Cooper",
			  "apellidos": "Robathon",
			  "email": "crobathon2@slideshare.net",
			  "rolText": ["Developer III","Director procare formación"],
			  "rolId": 3,
			  "esProcariano" : true,
			  "genero" : "femenino"
			}, {
			  "id": 4,
			  "nombres": "Davita",
			  "apellidos": "Brobeck",
			  "email": "dbrobeck3@ihg.com",
			  "rolText": ["Budget","Accounting Analyst III","Director procare formación"],
			  "rolId": 4,
			  "esProcariano" : true,
			  "genero" : "masculino"
			}, {
			  "id": 5,
			  "nombres": "Lynda",
			  "apellidos": "Bradburn",
			  "email": "lbradburn4@live.com",
			  "rolText": ["Editor"],
			  "rolId": 5,
			  "esProcariano" : false,
			  "genero" : "masculino"
			}, {
			  "id": 6,
			  "nombres": "Feliza",
			  "apellidos": "Daily",
			  "email": "fdaily5@ucsd.edu",
			  "rolText": ["Community Outreach Specialist"],
			  "rolId": 6,
			  "esProcariano" : true,
			  "genero" : "masculino"
			}, {
			  "id": 7,
			  "nombres": "Fons",
			  "apellidos": "Luckcuck",
			  "email": "fluckcuck6@gizmodo.com",
			  "rolText": ["Human Resources Assistant III"],
			  "rolId": 7,
			  "esProcariano" : false,
			  "genero" : "masculino"
			}, {
			  "id": 8,
			  "nombres": "Jolee",
			  "apellidos": "Ormshaw",
			  "email": "jormshaw7@slashdot.org",
			  "rolText": ["Geologist IV"],
			  "rolId": 8,
			  "esProcariano" : true,
			  "genero" : "femenino"
			}, {
			  "id": 9,
			  "nombres": "Addy",
			  "apellidos": "Gwatkin",
			  "email": "agwatkin8@abc.net.au",
			  "rolText": ["Executive Secretary"],
			  "rolId": 9,
			  "esProcariano" : true,
			  "genero" : "masculino"
			}, {
			  "id": 10,
			  "nombres": "Frederik",
			  "apellidos": "Bulled",
			  "email": "fbulled9@de.vu",
			  "rolText":[ "Desktop Support Technician"],
			  "rolId": 10,
			  "esProcariano" : true,
			  "genero" : "femenino"
			}, {
			  "id": 11,
			  "nombres": "Drederik",
			  "apellidos": "Bulled",
			  "email": "fbulled9@de.vu",
			  "rolText":[ "Desktop Support Technician"],
			  "rolId": 11,
			  "esProcariano" : true,
			  "genero" : "masculino"
			}
		],
		roles: [
			{
			  "id": 1,
			  "text": "Paralegal"
			}, {
			  "id": 2,
			  "text": "Budget/Accounting Analyst III"
			}, {
			  "id": 3,
			  "text": "Sales Associate"
			}, {
			  "id": 4,
			  "text": "Food Chemist"
			}, {
			  "id": 5,
			  "text": "Assistant Manager"
			}, {
			  "id": 6,
			  "text": "Account Representative IV"
			}, {
			  "id": 7,
			  "text": "Editor"
			}, {
			  "id": 8,
			  "text": "Software Test Engineer III"
			}, {
			  "id": 9,
			  "text": "Software Test Engineer II"
			}, {
			  "id": 10,
			  "text": "Geologist III"
			}
		],
		usuarioSeleccionado: {},
		rolEscogido: {
			nombre: '',
			id: ''
		},
		valorBotonFormacion : "  Agregar director formación"
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
		seleccionarUsuario(usuario){
			console.log(usuario)
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
		}
	}
});
