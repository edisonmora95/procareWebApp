var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.task('default', ['browser-sync'], function(){

});

gulp.task('browser-sync', ['nodemon'], function(){
	browserSync.init(null, {
		proxy: "http://localhost",
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
})