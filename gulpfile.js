// plugins
var gulp = require('gulp'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		autoprefixer = require('gulp-autoprefixer');

// variables
var autoprefixerOptions = {
	browsers: ['last 2 versions']
};

// compile sass
gulp.task('sass', function() {
	return gulp.src('./sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest('./css'));
});

// watch for changes
gulp.task('watch', function() {
	gulp.watch('./sass/**/*.scss', ['sass']);
});
