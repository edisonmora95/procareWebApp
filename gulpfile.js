'use strict';

let gulp        = require('gulp');
let nodemon     = require('gulp-nodemon');
let browserSync = require('browser-sync').create();
let babel       = require('gulp-babel');
let browserify  = require('gulp-browserify');
let runSequence = require('run-sequence');
let mocha       = require('gulp-mocha');
let uglify      = require('gulp-uglify');
let rename      = require('gulp-rename');
let gutil       = require('gulp-util');
let clean       = require('gulp-clean');
let forever     = require('gulp-forever-monitor');
let gmcfp       = require('gulp-mysql-command-file-processor');
let apidoc      = require('gulp-apidoc');

const config    = require('./config/config.json');

////////////////////////////////////////////
// Tasks para correr la aplicación
////////////////////////////////////////////

// CORRER LA APLICACIÓN PARA DEVELOPMENT
// npm run dev
gulp.task('default', ['js-compile', 'vue-compile'], function(){
	//Por default, el environment será el de development
	runSequence('set-dev-node-env', 'nodemon', 'browser-sync');
});

// CORRER LA APLICACIÓN PARA TESTING
// npm run test
gulp.task('run-test', function() {
    runSequence('set-test-node-env', 'babel', 'vueify-dev', 'nodemon',  'browser-sync');
});

// CORRER LA APLICACIÓN PARA PRODUCCIÓN
// npm run prod
gulp.task('run-prod', function() {
    runSequence('set-prod-node-env', 'forever');
});

gulp.task('forever', function() {
  let foreverMonitorOptions = { 
    env: process.env,
    args: process.argv,
    watch: true, 
    watchIgnorePatterns:  ['.*', 'node_modules/**', 'public/**', 'temp/**']
  };
  
  forever('app.js', foreverMonitorOptions)  
  .on('watch:restart', function(fileInfo) { 
    console.log('server was restarted');          
  })
  .on('exit', function() {
    console.log('server was closed');
  });
});

////////////////////////////////////////////
//Watch tasks
////////////////////////////////////////////

// Vigila los cambios en los archivos dentro de la carpeta /public/js/
// Hace build solo de los archivos cambiados
gulp.task('js-compile', () => {
    const src     = './public/js/**/*.js';
    const dest    = './public/build';

    let jsWatcher = gulp.watch(src, () => {
        gutil.log('Compilar js');
    });

    jsWatcher.on('change', file => {
        gulp.src(file.path, {
                base: 'public/js'
            }, {
                read: false
            })
            .pipe(babel({       //Conversión de ES6 a ES5
                presets: ['es2015']
            }))
            .pipe(browserify({  //Importa los módulos requeridos
                transform: ['vueify'],
            }))
            .pipe(rename({
                suffix: '.min'
            })) //Cambia la extensión a nombreArchivo.min.js
            //.pipe(uglify()) //Minify
            .pipe(gulp.dest(dest));
    });

});

// Vigila los cambios de los archivos *.vue
// Vuelve a hacer build de toda la aplicación
gulp.task('vue-compile', () => {
    const src = './public/components/**/*.vue';

    let vueWatcher = gulp.watch(src, () => {
        gutil.log('Compilar vue');
    });

    vueWatcher.on('change', file => {
        runSequence('babel', 'vueify-dev');
    });

});

gulp.task('api-docs', function(done) {
    const src  = 'routes/api/';
    const dest = 'apidoc/';

    apidoc({
        src: src,
        dest: dest
    }, done);
});

////////////////////////////////////////////
//Tasks inicializaciones
////////////////////////////////////////////

//Browser-Sync
/*
	@Descripción:
		Vigila cambios de *.js, *.css y *.ejs y los injecta en el navegador
*/
gulp.task('browser-sync', () => {
    browserSync.init(null, {
        proxy   : "http://localhost/",
        files   : [
            "public/build/**/*.js",
            "public/stylesheets/**/*.css",
            "views/**/*.*"
        ],
        browser : "default",
        port    : 3001,
    });
});

//Nodemon
/*
	@Descripción:
		Vigila cambios de documentos del servidor y lo reinicia
*/
gulp.task('nodemon', cb => {
    let started = false;
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
        .on('start', () => {
            if (!started) {
                cb();
                started = true;
            }
        });
});

////////////////////////////////////////////
//Tasks conversiones
////////////////////////////////////////////

//Conversión a ES5
gulp.task('babel', function() {
    console.log('Convirtiendo a ES5');
    var dist = './public/dist/';
    return gulp.src('./public/js/**/*.*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(dist));
});

//Ipmortación de módulos requeridos
gulp.task('vueify-prod', function() {
    console.log('Importando los módulos con Vueify');
    var src   = './public/dist/**/*.*';
    var build = './public/build/';
    gulp.src(src, {
            read: false
        })
        .pipe(browserify({
            transform: ['vueify'], //anterior
        }))
        .pipe(rename({
            suffix: '.min'
        })) //Cambia la extensión a nombreArchivo.min.js
        .pipe(uglify()) //Minify
        .pipe(gulp.dest(build));
});

//Para development y testing no se va a minificar
gulp.task('vueify-dev', function(){
    console.log('Importando los módulos con Vueify');
    const src = './public/dist/**/*.*';
    const build = './public/build/';
    gulp.src(src, {
            read: false
        })
        .pipe(browserify({
            transform: ['vueify'],   //anterior
        }))
        .pipe(rename({
            suffix: '.min'           //Cambia la extensión a nombreArchivo.min.js
        }))                         
        .pipe(gulp.dest(build));
});

gulp.task('build-prod', () => {
    runSequence('babel', 'vueify-prod');
});

gulp.task('build-dev', () => {
    runSequence('babel', 'vueify-dev');
});

////////////////////////////////////////////
//Clean tasks
////////////////////////////////////////////

gulp.task('clean', () => {
    const src = './public/dist/';
    return  gulp.src(src, {read: false})
                .pipe(clean());
});

////////////////////////////////////////////
//Tasks para setear variables de entorno
////////////////////////////////////////////

gulp.task('set-test-node-env', function(cb) {
    console.log('Cambiado environment para testing');
    process.env.NODE_ENV = 'test';
    cb();
});
gulp.task('set-dev-node-env', function() {
    console.log('Cambiado environment para development');
    return process.env.NODE_ENV = 'development';
});
gulp.task('set-prod-node-env', function() {
    console.log('Cambiado environment para production');
    return process.env.NODE_ENV = 'production';
});

////////////////////////////////////////////
//Tasks para tests
////////////////////////////////////////////

//TASK DE MOCHA
gulp.task('unit-test', function() {
    process.env.NODE_ENV = 'test';
    gulp.src('./test/unit_test/*.unit.test.js', {
            read: false
        })
        .pipe(mocha());
});

gulp.task('integration-test', function() {
    process.env.NODE_ENV = 'test';
    gulp.src('./test/integration_test/*.integration.test.js', {
            read: false
        })
        .pipe(mocha());
});

////////////////////////////////////////////
//Tasks para base de datos
////////////////////////////////////////////

gulp.task('creation-db-test', function(cb){
    process.env.NODE_ENV = 'test';
    const src = './public/scripts/db_test_creation.sql';
    const user = config[process.env.NODE_ENV].username;
    const pwd  = config[process.env.NODE_ENV].password;
    const host = 'localhost';
    const port = 3306;
    const db   = config[process.env.NODE_ENV].database;
    gulp.src(src)
        .pipe(gmcfp(user, pwd, host, port, null, db))
        .on('end', function() { cb(); });
    //cb();
});

gulp.task('populate-db-test', function(cb){
    process.env.NODE_ENV = 'test';
    const src = './public/scripts/populate_db_test.sql';
    const user = config[process.env.NODE_ENV].username;
    const pwd  = config[process.env.NODE_ENV].password;
    const host = 'localhost';
    const port = 3306;
    const db   = config[process.env.NODE_ENV].database;
    gulp.src(src)
        .pipe(gmcfp(user, pwd, host, port, null, db));
    cb();
});

gulp.task('create-populate-db-test', function(cb){
    process.env.NODE_ENV = 'test';
    const src = './public/scripts/db_test_create_populate.sql';
    const user = config[process.env.NODE_ENV].username;
    const pwd  = config[process.env.NODE_ENV].password;
    const host = 'localhost';
    const port = 3306;
    const db   = config[process.env.NODE_ENV].database;
    gulp.src(src)
        .pipe(gmcfp(user, pwd, host, port, null, db))
        .on('error', function(err){
            cb(err);
        })
        .on('end', function(){
            cb();
        });
});

gulp.task('create-populate-db-dev', function(cb){
    process.env.NODE_ENV = 'development';
    const src = './public/scripts/db_dev_create_populate.sql';
    const user = config[process.env.NODE_ENV].username;
    const pwd  = config[process.env.NODE_ENV].password;
    const host = 'localhost';
    const port = 3306;
    const db   = config[process.env.NODE_ENV].database;
    gulp.src(src)
        .pipe(gmcfp(user, pwd, host, port, null, db));
    cb();
});