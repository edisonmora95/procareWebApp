'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import Evento from './../../public/components/evento';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/evento/',
			name: 'Evento',
			component: Evento
		}
	]
});
