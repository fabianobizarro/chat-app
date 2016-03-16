var gulp = require('gulp');
var uglify = require('gulp-uglify');


gulp.task('vendors', function(){
    return gulp.src([
        'bower_components/Materialize/dist/css/materialize.min.css',
        'bower_components/Materialize/dist/js/materialize.min.js',
        'bower_components/jquery/dist/jquery.min.js'
    ])
    .pipe(gulp.dest('wwwroot/vendors'));
});

gulp.task('fonts', function () {
    return gulp.src([
        'bower_components/Materialize/dist/font/roboto/Roboto-Regular.woff',
        'bower_components/Materialize/dist/font/roboto/Roboto-Regular.woff2',
        'bower_components/Materialize/dist/font/roboto/Roboto-Regular.ttf',
    ])
    .pipe(gulp.dest('wwwroot/fonts'));
})

gulp.task('images', function(){
    return gulp.src([
        'src/images/user.png'
    ])
    .pipe(gulp.dest('wwwroot/images'));
})