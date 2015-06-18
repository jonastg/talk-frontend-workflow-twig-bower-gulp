var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var imageResize = require('gulp-image-resize');
var env = process.env.GULP_ENV;

//JAVASCRIPT TASK: write one minified js file out of jquery.js, bootstrap.js and all of my custom js files
gulp.task('js', function () {
    return gulp.src(['assets/vendor/bower_components/jquery/dist/jquery.js',
        'assets/vendor/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        'assets/js/**/*.js'])
        .pipe(concat('javascript.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('source/js'));
});

//CSS TASK: write one minified css file out of bootstrap.less and all of my custom less files
gulp.task('sass', function () {
    return gulp.src(['assets/sass/**/*.scss'])
        .pipe(sass({
            errLogToConsole: true,
            outputStyle:    'expanded',
            sourceComments: true
        }))
        //.pipe(autoprefixer({browsers: ['last 3 version', 'ie >= 10']}))
        .pipe(gulp.dest('source/css'));
});

/*gulp.task('css', function () {
    return gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'assets/sass/ ** /*.scss'])
        .pipe(gulpif('*.scss',
            sass({
                outputStyle: 'nested', // libsass doesn't support expanded yet
                precision: 10,
                includePaths: ['.']
            })
        ))
        .pipe(concat('styles.css'))
        .pipe(gulpif(env === 'prod', uglifycss()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('source/css'));
});*/
gulp.task('sass:watch', function () {
    gulp.watch('assets/sass/**/*.scss', ['sass']);
});

//IMAGE TASK: Just pipe images from project folder to public web folder
gulp.task('img', function() {
    return gulp.src('assets/img/**/*.*')
        /*.pipe(imageResize({
            width : 600,
            height : 400,
            crop : true,
            upscale : false
        }))*/
        .pipe(gulp.dest('source/img'));
});

//define executable tasks when running "gulp" command
gulp.task('default', ['js', 'sass', 'img', 'sass:watch']);
