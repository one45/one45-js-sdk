var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    Server      = require('karma').Server,
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    browserify  = require('browserify'),
    babelify    = require('babelify'),
    watchify    = require('watchify'),
    _           = require('lodash');
    
gulp.task('default',['clean','lint', 'compile-watch']);

/**
 * Task for starting the browser
 */
gulp.task('browserSync', function(){
  browserSync({
    server: {
      baseDir: './'
    }
  });
});



/**
 * Transpile es6 to es5 and bundle modules for browser usage
 */
gulp.task('compile',       function() { return compile(false, true); });
gulp.task('compile-watch', function() { return compile(true); });


function compile(watch, prod) {
  var customOpts = {
    entries: ['./src/index.js'],
    debug: true
  };

  var opts = _.assign({}, watchify.args, customOpts);
  var bundler = browserify(opts);

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
    bundler.on('log', plugins.util.log);
  }

  bundler.transform(babelify);

  function rebundle() {
    var bundleStream = bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('one45-sdk.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./dist'));

    if (prod) {
      bundleStream.pipe(plugins.uglify())
        .pipe(plugins.rename({suffix: '.min', extname: '.js'}))
        .pipe(gulp.dest('./dist'));
    }

    return bundleStream;
  }

  return rebundle();
}

/**
 * Task to run lint for js
 */
gulp.task('lint',['jshint']);
gulp.task('jshint', function() {
  return gulp.src('./src/**/*.js')
      .pipe(plugins.jshint())
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(plugins.jshint.reporter('jshint-stylish'));
});
/**
 * Task to run unit tests in Karma
 */
gulp.task('test', function(done) {
  var server = new Server({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true
  }, done);

  server.start();
});

/**
 * Task for cleaning up the build files
 */
gulp.task('clean', function() {
  return gulp.src('./dist', {read: false})
    .pipe(plugins.clean());
});

