/*
	@Descripción: Controlador de la vista de buscarGrupo. Permisos:
		* Si el usuario es Director Ejecutivo o Personal, tiene acceso a todos los grupos.
		* Si el usuario es Director de Formación, tiene acceso solo a los grupos de Procare o Procare Mujeres dependiendo de su género.
		* Si el usuario es Animador, no tiene acceso a esta página... Solo se muestra el grupo al que pertenece.
	@Autor: @edisonmora95
	@FechaCreación: 31/05/2017
*/

let BuscarGrupoApp = new Vue({
	el: '#BuscarGrupoApp',
	created: function(){
		this.obtenerUsuario();
		this.obtenerGrupos(this);
	},
	mounted: function(){
	},
	data: {
		grupos: [],
		grupo:{
			nombre: '',
			anio: new Date().getFullYear(),
			animador: '',
			etapa: '',
			genero: ''
		},
		usuario: {}
	},
	methods: {
		obtenerUsuario(){
			let self = this;
			$.ajax({
				type: 'GET',
				url: '/api/login/usuarios',
				success(res){
					self.usuario = res;
					if(self.usuario.tipo === 'director formacion'){
						if(self.usuario.genero === 'masculino'){
							self.grupo.genero = 'Procare';
						}else if(self.usuario.genero === 'femenino'){
							self.grupo.genero = 'Procare Mujeres';
						}
					}
				}
			});
		},
		obtenerGrupos(self){
			$.ajax({
				type: 'GET',
				url: '/api/grupos/',
				success(res){
					self.armarArrayGrupos(self, res.datos);
				}
			});
		},
		armarArrayGrupos(self, grupos){
			$.each(grupos, function(index, grupo){
				let grupoObj = {
					id 				 : grupo.id,
					nombre 		 : grupo.nombre,
					tipo 			 : grupo.tipo,
					integrantes: grupo.cantidadChicos,
					genero 		 : grupo.genero,
					etapaId 	 : '',
					etapaNombre: ''
				};
				//Se busca la etapa actual del grupo
				$.each(grupo.Etapas, function(j, etapa){
					let fechaFin = etapa.GrupoEtapa.fechaFin;
					//La etapa actual es aquella que tenga fecha fin null
					if( fechaFin === null ){
						grupoObj.etapaId = etapa.id;
						grupoObj.etapaNombre = etapa.nombre;
					}
				});
				//Solo se añaden los grupos que pertenezcan actualmente a una etapa
				if( grupoObj.etapaId !== '' ){
					self.grupos.push(grupoObj);
				}
			});
		},
		//Eventos
		irAGrupo(grupo){
			let url = '/grupos/' + grupo.id;
			window.location.href = url;
		},
	}
});
