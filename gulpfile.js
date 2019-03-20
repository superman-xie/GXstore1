var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var cleanDest = require('gulp-clean-dest');
gulp.task('fileinclude',function(){
    gulp.src('./src/html/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./src/pages'))
})
gulp.task('sass',()=>{
	gulp.src('./src/sass/*.scss')
	.pipe(sass())
	//.pipe(rename({"suffix" : ".min"}))
	.pipe(gulp.dest('./src/css'))
})
gulp.task('concat', function() {                                //- 创建一个名为 concat 的 task
    gulp.src('./src/css/*.css')    								//- 需要处理的css文件，放到一个字符串数组里
        .pipe(concat('index.min.css'))                               //- 合并后的文件名
        .pipe(minifyCss())                                      //- 压缩处理成一行
        .pipe(rev())
        .pipe(cleanDest('./dist/css'))                                            //- 文件名加MD5后缀
        .pipe(gulp.dest('./dist/css'))                               //- 输出文件本地
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./rev'));                              //- 将 rev-manifest.json 保存到 rev 目录内
});
gulp.task('rev',function(){
	gulp.src(['./rev/*.json','./src/newhtml/index.html'])
	.pipe(revCollector({replaceReved: true}))
	.pipe(gulp.dest('./dist/html/'))
})
gulp.task('default',function(){
	gulp.watch(['./src/sass/*.scss'],['sass'])
    gulp.watch(['src/html/**/*.html'],['fileinclude']);
    gulp.watch(['./src/css/*.css'],['concat']);
    gulp.watch(['./rev/*.json','./src/newhtml/index.html'],['rev']);
})