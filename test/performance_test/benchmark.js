const siege = require('siege');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJQZXJzb25hbCJdLCJpZCI6MiwiaWF0IjoxNTEzODkwNzAxfQ.5OQlRcegbehBU2C9Lnwz59zgBPRyBLicpwnpigYllG0';

siege()
	.on(3001)
	.withCookie
	.post('/api/login', { correo : 'personal@gmail.com', password : 'posi'}).for(1).times
	//.get('/api/grupos', { "x-access-token" : token}).for(10).times
	.get('/grupos').for(10).times
	.attack()