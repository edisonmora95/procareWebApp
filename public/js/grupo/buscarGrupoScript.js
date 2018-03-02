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
		$('.modal').modal();
	},
	data: {
		grupos: [],
		grupo :{
			nombre  : '',
			anio    : new Date().getFullYear(),
			animador: '',
			etapa   : '',
			genero  : ''
		},
		usuario   : {},
		errorAjax : {
			header  : '',
			content : ''
		}
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
		/*
			@UltimaModificacion
				25/12/2017	@edisonmora95	Añadido token al header. Añadido error handler
		*/
		obtenerGrupos(self){
			$.ajax({
				type   : 'GET',
				url    : '/api/grupos/',
				headers: {
	        "x-access-token" : localStorage.getItem('token')
		    },
				success(res){
					self.armarArrayGrupos(self, res.datos);
				},
				error(err){
					if( err.status === 403 ){
						BuscarGrupoApp.error404(err.responseJSON.mensaje);
					}else{
						Materialize.toast('No se pudieron obtener las tareas y eventos', 4000, 'rounded error');	
					}
					console.log(err)
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
		error404(mensaje){
    	App.errorAjax.header = 'Usuario no autorizado';
			App.errorAjax.content=  mensaje;	
			$('#modalAjax').modal('open');
    },
	}
});
