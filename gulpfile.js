var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

//var sass = require('gulp-sass');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback')


/*
 Styles Task
 */

gulp.task('styles', function () {
    // move over fonts

    gulp.src('css/fonts/**.*')
        .pipe(gulp.dest('build/css/fonts'))

    // var sassOptions = {
    //     errLogToConsole: true,
    //     outputStyle: 'expanded'
    // };

    // Compiles CSS
    gulp.src('css/app.styl')
        .pipe(sourcemaps.init())
        //.pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/css/'))
        .pipe(reload({stream: true}))
});

/*
 Images
 */
gulp.task('images', function () {
    gulp.src('css/images/**')
        .pipe(gulp.dest('./build/css/images'))
});

/*
 Browser Sync
 */
gulp.task('browser-sync', function () {
    browserSync({
        // we need to disable clicks and forms for when we test multiple rooms
        server: {},
        middleware: [historyApiFallback()],
        ghostMode: false
    });
});

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
    var props = {
        entries: ['./scripts/' + file],
        debug: true,
        cache: {},
        packageCache: {},
        extensions: [".js", ".jsx"],
        transform: [
            babelify.configure({
                presets: ["es2015", "react"]
            })]
    };

    // watchify() if watch requested, otherwise run browserify() once
    var bundler = watch ? watchify(browserify(props)) : browserify(props);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
            .on('error', handleErrors)
            .pipe(source(file))
            .pipe(gulp.dest('./build/'))
            // If you also want to uglify it
            // .pipe(buffer())
            // .pipe(uglify())
            // .pipe(rename('app.min.js'))
            // .pipe(gulp.dest('./build'))
            .pipe(reload({stream: true}))
    }

    // listen for an update and run rebundle
    bundler.on('update', function () {
        rebundle();
        gutil.log('Rebundle...');
    });

    // run it once the first time buildScript is called
    return rebundle();
}

gulp.task('scripts', function () {
    return buildScript('main.js', false); // this will run once because we set watch to false
});

gulp.task('build-clean', function() {
    return del(['./build']);
});

gulp.task('build', ['build-clean'], function(callback) {
    runSequence(['images', 'styles', 'scripts'], callback);
});

// run 'build' task first, then watch for future changes
gulp.task('watch', ['build'], function() {
    gulp.watch('css/**/*', ['styles']); // gulp watch for styles changes
    return buildScript('main.js', true); // browserify watch for JS changes
});

// run browser-sync and watch for future changes
gulp.task('default', [], function (callback) {
    runSequence('watch', 'browser-sync', callback);
});
