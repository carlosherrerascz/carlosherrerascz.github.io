var gulp = require ('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    minify = require('gulp-minify-css'),
    rename    = require('gulp-rename'); 
    concat    = require('gulp-concat'),
    browserSync = require('browser-sync');
var reload = browserSync.reload;


 //Scripts Task
 // Uglifies
 gulp.task('scripts', function(){
   return gulp.src('src/pre-js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
 });

// Static Server + watching scss/html files
//
gulp.task('serve', ['sass', 'minify-css', 'scripts'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.css', ['minify-css']);
    gulp.watch("build/**/*.html").on('change', browserSync.reload);
    gulp.watch('src/pre-js/*.js', ['scripts']);
});

// Compile sass into CSS & auto-inject into browsers
//
gulp.task('sass', function() {
         gulp.src("src/scss/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .on('error', swallowError)
        .pipe(minify())
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', function() {
    return gulp.src('src/pre-css/*.css')
        .pipe(minify())
        .pipe(gulp.dest('build/css'));
});

function swallowError (error) {

    //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}

//
// Default action: uglifies JS, minifies Bootstrap CSS, compiles SASS to CSS and minifies it,
// and, finally, tracks new changes to JS and SASS code so it can be compiled, minified, 
// and previewed once more if gulp detects any new changes.
//
gulp.task('default', ['scripts', 'minify-css', 'sass', 'serve']);