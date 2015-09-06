var gulp         = require ('gulp'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    plumber      = require('gulp-plumber'),
    CSSMinify    = require('gulp-minify-css'),
    HTMLMinify   = require('gulp-minify-html'), 
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    rename       = require('gulp-rename'), 
    concat       = require('gulp-concat'),
    browserSync  = require('browser-sync');
    
var reload = browserSync.reload;


 //Scripts Task
 // Uglifies
 gulp.task('scripts', function(){
   return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
 });

// Static Server + watching scss/html files
//
gulp.task('serve', ['sass', 'scripts'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("src/html/**/*.html", ['minify-html']);
    gulp.watch("src/html/**/*.html", ['minify-html']);
    gulp.watch("./**/*.html").on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js', ['scripts']);
});

// Compile sass into CSS & auto-inject into browsers
//
gulp.task('sass', function() {
    gulp.src("src/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(CSSMinify())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', function() {
    return gulp.src('src/css/*.css')
        .pipe(CSSMinify())
        .pipe(gulp.dest('./css'));
});

gulp.task('minify-html', function(){
    var opts = {
        conditionals: true,
        spare:true 
    };

    return gulp.src('src/html/**/*.html') 
        .pipe(HTMLMinify(opts))  
        .pipe(gulp.dest('./'));
});

gulp.task('imagemin', function() {
   return gulp.src('src/pics/**/*') 
    .pipe(imagemin({
        progressive:true,
        svgoPlugins: [{removeViewBox:false}],
        use: [pngquant()] 
    }))
    .pipe(gulp.dest('./pics'));
});


//
// Default action: uglifies JS, minifies Bootstrap CSS, compiles SASS to CSS and minifies it,
// and, finally, tracks new changes to JS and SASS code so it can be compiled, minified, 
// and previewed once more if gulp detects any new changes.
//
gulp.task('default', ['scripts', 'minify-css', 'sass', 'minify-html', 'imagemin',  'serve']);
