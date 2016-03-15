/**
 * Created by noah.r on 16/3/6.
 */

//引入gulp及组件
var gulp = require('gulp'),                //基础库
    //changed = require('gulp-changed'),     //
    //jscs = require('gulp-jscs'),           //
    uglify = require('gulp-uglify'),       //js压缩

    imagemin = require('gulp-imagemin'),    //图片压缩
    sass = require('gulp-ruby-sass'),       //sass
    minifycss = require('gulp-minify-css'), //css压缩
    jshint = require('gulp-jshint'),        //js检查
    rename = require('gulp-rename'),        //重命名
    concat = require('gulp-concat'),        //合并文件
    clean = require('gulp-clean'),          //清空文件夹
    tinylr = require("tiny-lr"),            //livereload
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload'),//livereload

    babel = require('gulp-babel'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    react = require('gulp-react');



// HTML处理
gulp.task('html',function(){
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        //.pipe(livereload(server))
        .pipe(gulp.dest(htmlDst))
});


gulp.task('css', function () {
    gulp.src(['src/less/*.less', '!src/less/**/{reset,test}.less'])
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(minifycss({compatibility: 'ie7'}))
        .pipe(gulp.dest('dist/css'));
        //.pipe(livereload(server));
    gulp.src('src/css/*.css')
        .pipe(minifycss({compatibility: 'ie7'}))
        .pipe(gulp.dest('dist/css'));
});

//图片处理
gulp.task('images',function(){
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';

    gulp.src(imgSrc)
        .pipe(imagemin())
        //.pipe(livereload(server))
        .pipe(gulp.dest(imgDst));
});

//js处理
gulp.task('js',function(){
    var jsSrc = './src/js/*.js',
        jsDst = './dist/js';
    gulp.src(jsSrc)
        .pipe(babel({presets:['es2015']}))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        //.pipe(livereload(server))
        .pipe(gulp.dest(jsDst));
});

//react
gulp.task('react',function(){
    gulp.src('./src/react/*.jsx')
        .pipe(react())
        .pipe(babel({presets:['es2015']}))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('reactlist.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

//清空图片,样式,js
gulp.task('clean', function () {
    gulp.src(['./dist/css','./dist/js','./dist/images'],{read:false})
        .pipe(clean());
});

//默认任务 清空图片\样式\JS并重建 运行语句 gulp
gulp.task('default',['clean'],function(){
    gulp.start('html','css','images','js','react');
});

//监听任务 运行语句 gulp watch
gulp.task('watch',function(){
    server.listen(port,function(err){
       if(err){
           return console.log(err);
       }
        gulp.watch('./src/*.html',['html']);
        gulp.watch('./src/**/*.less', ['css']);
        gulp.watch('./src/images/**/*',['images']);
        gulp.watch('./src/js/*.js',['js']);
        gulp.watch('./src/react/*.jsx',['react']);
    });
});

