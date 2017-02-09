var
  gulp         = require('gulp'),
	sass         = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
	browserSync  = require('browser-sync').create();

	gulp.task('default', ['serve']);

	gulp.task('serve', function() {

		browserSync.init({
			server: './'
		});

		gulp.watch('sass/**/*.scss', ['styles']);			// watch sass files; when touched, execute styles task
		gulp.watch('*.html').on('change', browserSync.reload);  //watch html... see how there's more to watch?

	});

	gulp.task('styles', function() {
		gulp.src('sass/**/*.scss')										// select the scss files from sass/**
				.pipe(sass().on('error', sass.logError))	// run through sass; log error instead of breaking build
				.pipe(autoprefixer())											// auto prefix browser-specific styles, like webkit
				.pipe(gulp.dest('./css')) 								// save them to the /css folder
				.pipe(browserSync.stream());
	});
