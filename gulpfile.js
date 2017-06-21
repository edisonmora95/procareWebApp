var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var runSequence = require('run-sequence');

gulp.task('default', ['browser-sync'],function(){
	runSequence('babel', 'vueify', 'browser-sync');
});

gulp.task('browser-sync', ['nodemon'], function(){
	browserSync.init(null, {
		proxy: "http://localhost/login",
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