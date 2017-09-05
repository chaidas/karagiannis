// Gulp and plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
	sass : './scss/**/*.scss',
	css : './css/'
};

// Compile SASS to CSS
gulp.task('sass', function () {
	gulp.src(paths.sass)
		.pipe(sass({outputStyle : 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({
			browsers : ['last 2 versions'],
			cascade : false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.css));
});

// Default task and watcher
gulp.task('default', ['sass'], function () {
	gulp.watch(paths.sass, ['sass'])
		.on('change', function (evt) {
			console.log(
				'[watcher] File ' + evt.path.replace(/.*(?=sass)/, '') + ' was ' + evt.type + ', compiling...'
			);
		});
});