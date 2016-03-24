var gulp = require('gulp');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var clean = require('gulp-clean');


gulp.task('vendors', function() {
    return gulp.src([
        'bower_components/Materialize/dist/css/materialize.min.css',
        'bower_components/Materialize/dist/js/materialize.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-cookies/angular-cookies.min.js',
        'bower_components/animate.css/animate.min.css',
        'bower_components/sweetalert/dist/sweetalert.min.js',
        'bower_components/sweetalert/dist/sweetalert.css',
        'bower_components/Waves/dist/waves.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/jquery.nicescroll/dist/jquery.nicescroll.min.js',
        'bower_components/material-design-iconic-font/dist/css/material-design-iconic-font.min.css',
        'bower_components/material-design-iconic-font/dist/css/material-design-iconic-font.css'
    ])
        .pipe(gulp.dest('wwwroot/vendors'));
});

gulp.task('template-css', function() {
    return gulp.src(['src/css/app.min.1.css', 'src/css/app.min.2.css'])
        .pipe(gulp.dest('wwwroot/css'));
});

gulp.task('fonts-roboto', function() {
    gulp.src([
        'bower_components/material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.ttf',
        'bower_components/material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff',
        'bower_components/material-design-iconic-font/dist/fonts/Material-Design-Iconic-Font.woff2',
    ])
        .pipe(gulp.dest('wwwroot/fonts'));

    return gulp.src([
        'bower_components/Materialize/dist/font/roboto/Roboto-Regular.woff',
        'bower_components/Materialize/dist/font/roboto/Roboto-Regular.woff2',
        'bower_components/Materialize/dist/font/roboto/Roboto-Regular.ttf',
        'bower_components/Materialize/dist/font/roboto/Roboto-Light.woff',
        'bower_components/Materialize/dist/font/roboto/Roboto-Light.woff2',
        'bower_components/Materialize/dist/font/roboto/Roboto-Light.ttf',
        'bower_components/Materialize/dist/font/roboto/Roboto-Regular.woff',
        'bower_components/Materialize/dist/font/roboto/Roboto-Regular.woff2',
        'bower_components/Materialize/dist/font/roboto/Roboto-Regular.ttf',
        'bower_components/Materialize/dist/font/roboto/Roboto-Medium.woff',
        'bower_components/Materialize/dist/font/roboto/Roboto-Medium.woff2',
        'bower_components/Materialize/dist/font/roboto/Roboto-Medium.ttf',
        'src/fonts/Roboto-Regular-webfont.woff',
        'src/fonts/Roboto-Regular-webfont.ttf',
        'src/fonts/Roboto-Medium-webfont.woff',
        'src/fonts/Roboto-Medium-webfont.woff'
    ])
        .pipe(gulp.dest('wwwroot/fonts/roboto'));
})

gulp.task('images', function() {
    return gulp.src([
        'src/img/**',
    ])
        .pipe(gulp.dest('wwwroot/img'));
});

gulp.task('build-app', function() {
    return gulp.src(['src/js/app.js', 'src/js/functions.js'])
        .pipe(uglify())
        .pipe(gulp.dest('wwwroot/js'));
});

gulp.task("build", ['vendors', 'fonts-roboto', 'images', 'template-css', 'build-app']);

gulp.task('clear', function() {
    return gulp.src('wwwroot')
        .pipe(clean({ force: true }));
})

gulp.task('watch', function() {
    return watch('src/js/**/*.js', function() {
        gulp.start('build-app');
    });
});

gulp.task('default', function() {
    console.log('Availabe tasks:');
    for (var t in gulp.tasks) {
        console.log(' * => ' + t);
    }
});