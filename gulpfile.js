var
  // <auto>build
  gulp         = require('gulp'),
  sass         = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),

  // live edit
  browserSync  = require('browser-sync').create(),

  // commit & release
  runSequence  = require('run-sequence'),
  argv         = require('yargs').argv,
  git          = require('gulp-git');
  // conventionalChangeLog     = require('gulp-conventional-changelog'),
  // conventionalGithubRelease = require('conventional-github-releaser'),
  // gutil = require('gulp-util'),
  // fs    = require('fs');


  //--- <auto>build ---
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

  //--- git commit & push ---
  gulp.task('init', function() {
    console.log(argv.m);
  });

  gulp.task('add', function() {
    console.log('adding...');
    return gulp.src('.')
      .pipe(git.commit(argv.m));
  });

  gulp.task('commit', function() {
    console.log('committing...');
    if (argv.m) {
      return gulp.src('.')
        .pipe(git.commit(argv.m));
    }
  });

  gulp.task('push', function() {
    console.log('pushing...');
    git.push('origin', 'master', function(err) {
      if (err) throw err;
    });
  });

  gulp.task('gitsend', function() {
    runSequence(
      'add',
      'commit',
      'push'
    );
  });


  // gulp.task('release', function (callback) {
  //   runSequence(
  //     // 'changelog',
  //     // 'commit-changes',
  //     // 'push-changes',
  //     // 'create-new-tag',
  //     // 'github-release',
  //     function (error) {
  //       if (error) {
  //         console.log(error.message);
  //       }
  //       else {
  //         console.log('RELEASE FINISHED SUCCESSFULLY');
  //       }
  //       callback(error);
  //     }
  //   );
  // });
