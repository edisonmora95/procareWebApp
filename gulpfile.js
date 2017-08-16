'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var runSequence = require('run-sequence');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var stripDebug = require('gulp-strip-debug');


////////////////////////////////////////////
//Tasks para correr la aplicación
////////////////////////////////////////////

//CORRER LA APLICACIÓN PARA DEVELOPMENT
gulp.task('default', ['js-compile', 'vue-compile'], function(){
		//Por default, el environment será el de development
		runSequence('set-dev-node-env', 'browser-sync', 'nodemon');
});

//CORRER LA APLICACIÓN PARA TESTING
gulp.task('build-test', function(){
	runSequence('set-test-node-env', 'browser-sync', 'nodemon');
});

//CORRER LA APLICACIÓN PARA PRODUCCIÓN
gulp.task('build-prod', function(){
	runSequence('set-prod-node-env', 'browser-sync');
});

////////////////////////////////////////////
//Watch tasks
////////////////////////////////////////////

//Vigila los cambios en los archivos dentro de la carpeta /public/js/
//Hace build solo de los archivos cambiados
gulp.task('js-compile', function(){
	const src = './public/js/**/*.js';
	const dest = './public/build';

	var jsWatcher = gulp.watch(src, function(){
		gutil.log('Compilar js');
	});

	jsWatcher.on('change', function(file){
		gulp.src( file.path, { base: 'public/js' }, { read: false })
				.pipe(babel({											//Conversión de ES6 a ES5
					presets: ['es2015']
				}))
				.pipe(browserify({								//Importa los módulos requeridos
					transform: ['vueify'], 
				}))
				.pipe(rename({suffix: '.min'}))		//Cambia la extensión a nombreArchivo.min.js
				.pipe(uglify())										//Minify
				.pipe(gulp.dest(dest));
	});

});
//Vigila los cambios de los archivos *.vue
//Vuelve a hacer build de toda la aplicación
gulp.task('vue-compile', function(){
	const src = './public/components/**/*.vue';

	var vueWatcher = gulp.watch(src, function(){
		gutil.log('Compilar vue');
	});

	vueWatcher.on('change', function(file){
		runSequence('babel', 'vueify');
	});

});

////////////////////////////////////////////
//Tasks inicializaciones
////////////////////////////////////////////

//Browser-Sync
/*
	@Descripción:
		Vigila cambios de *.js, *.css y *.ejs y los injecta en el navegador
*/
gulp.task('browser-sync', function(){
	browserSync.init(null, {
		proxy: "http://localhost/",
    files: [
    	"public/build/**/*.js",
    	"public/stylesheets/**/*.css",
    	"views/**/*.*"
    ],
    browser: "default",
    port: 3001,
	});
});

//Nodemon
/*
	@Descripción:
		Vigila cambios de documentos del servidor y lo reinicia
*/
gulp.task('nodemon', function(cb){
	var started = false;
	return nodemon({
		script: './bin/www',
		ignore: [
			"public/**/*.*",
			"gulpfile.js",
			"package.json",
			"README.md",
			"./test/**/*.*"
		]
	})
	.on('start', function(){
		if(!started){
			cb();
			started = true;
		}
	});
});


////////////////////////////////////////////
//Tasks conversiones
////////////////////////////////////////////

//Conversión a ES5
gulp.task('babel', function(){
	console.log('Convirtiendo a ES5');
	var dist = './public/dist/';
	return gulp.src('./public/js/**/*.*')
				.pipe(babel({
					presets: ['es2015']
				}))
				.pipe(gulp.dest(dist));
});

//Ipmortación de módulos requeridos
gulp.task('vueify', function(){
	console.log('Importando los módulos con Vueify');
	var src = './public/dist/**/*.*';
	var build = './public/build/';
	gulp.src(src, { read: false })
			.pipe(browserify({
				transform: ['vueify'], //anterior
			}))
			.pipe(rename({suffix: '.min'}))		//Cambia la extensión a nombreArchivo.min.js
			.pipe(uglify())										//Minify
			.pipe(gulp.dest(build));
});

gulp.task('build', function(){
	runSequence('babel', 'vueify');
});

////////////////////////////////////////////
//Tasks para setear variables de entorno
////////////////////////////////////////////

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

////////////////////////////////////////////
//Tasks para tests
////////////////////////////////////////////

//TASK DE MOCHA
gulp.task('mocha', function(){
	gulp.src('./test/grupos/*.js', {read: false})
		.pipe(mocha());
});

//SCRIPT PARA CORRER TESTS
gulp.task('test', function(){
	runSequence('set-test-node-env', 'mocha');
});

