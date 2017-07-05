var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var runSequence = require('run-sequence');
const mocha = require('gulp-mocha');

gulp.task('default', ['browser-sync'],function(){
	//runSequence('babel', 'vueify', 'browser-sync');

gulp.task('default', function(){
		//Por default, el environment será el de development
		runSequence('set-dev-node-env', 'browser-sync');


});

//TASKS INICIALIZACIONES
gulp.task('browser-sync', ['nodemon'], function(){
	browserSync.init(null, {

		proxy: "http://localhost/login",

		proxy: "http://localhost/",

    files: ["public/**/*.*"],
    browser: "default",
    port: 3001,
	});
});
gulp.task('nodemon', function(cb){
	var started = false;

	return nodemon({
		script: './bin/www'
	})
	.on('start', function(){
		if(!started){
			cb();
			started = true;
		}
	})
});

//TASKS CONVERSIONES DE ES6
gulp.task('babel', function(){
	console.log('Convirtiendo a ES5');
	var dist = './public/dist/';
	return gulp.src('./public/js/*/*')
				.pipe(babel({
					presets: ['es2015']
				}))
				.pipe(gulp.dest(dist));
});
gulp.task('vueify', function(){
	console.log('Importando los módulos con Vueify');

	//var src = './public/js/grupo/crearGrupoScript.js'
	//var build = './build/grupo/bundle.js'


	var src = './public/dist/**/*.js'
	var build = './public/build/'
	gulp.src(src, { read: false })
			.pipe(browserify({
				//debug: false,
				transform: ['vueify'], //anterior
				//transform: [babelify, [{_flags: {debug: true}}, vueify]], internte
				//transform: [{_flags: {debug: false}}, 'vueify'], //mia
			}))
			.pipe(gulp.dest(build));
});

gulp.task('build', function(){
	runSequence('babel', 'vueify');
});

//TASKS VARIABLES DE ENTORNO
gulp.task('set-test-node-env', function() {
	console.log('Cambiado environment para testing');
  return process.env.NODE_ENV = 'test';
});
gulp.task('set-dev-node-env', function(){
	console.log('Cambiado environment para development');
  return process.env.NODE_ENV = 'development';
});
gulp.task('set-prod-node-env', function(){
	console.log('Cambiado environment para production');
  return process.env.NODE_ENV = 'production';
});

//TASK DE MOCHA
gulp.task('mocha', function(){
	gulp.src('./test/etapa/etapa.test.js', {read: false})
		.pipe(mocha())
});

//SCRIPT PARA CORRER TESTS
gulp.task('test', function(){
	runSequence('set-test-node-env', 'mocha');
});

//TESTING
gulp.task('build-test', function(){
	runSequence('set-test-node-env', 'browser-sync');
});

//PRODUCTION
gulp.task('build-prod', function(){
	runSequence('set-prod-node-env', 'browser-sync');
});