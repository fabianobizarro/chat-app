var gulp = require('gulp');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');


gulp.task('vendors', function() {
    return gulp.src([
        'bower_components/Materialize/dist/css/materialize.min.css',
        'bower_components/Materialize/dist/js/materialize.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-cookies/angular-cookies.min.js'
    ])
        .pipe(gulp.dest('wwwroot/vendors'));
});

gulp.task('fonts-roboto', function() {
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
    ])
        .pipe(gulp.dest('wwwroot/font/roboto'));
})

gulp.task('images', function() {
    return gulp.src([
        'src/images/user/*.*',
    ])
        .pipe(gulp.dest('wwwroot/images'));
});

gulp.task('build-app', function() {
    return gulp.src('src/js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('wwwroot/js'));
});

gulp.task('watch', function() {
    return watch('src/js/**/*.js', function() {
        gulp.start('build-app');
    });
});