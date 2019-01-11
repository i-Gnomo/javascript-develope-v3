<<<<<<< HEAD
var gulp = require('gulp');
//压缩js
var uglify = require('gulp-uglify');
//压缩css
var cleanCSS = require('gulp-clean-css');
//压缩图片
var imageMin = require('gulp-imagemin');
var rename = require('gulp-rename');
//生成版本号
var rev = require('gulp-rev');
//替换版本号
var revCollector = require('gulp-rev-collector');
var clean = require('gulp-clean');

var runSequence = require('run-sequence');

//压缩js
gulp.task('jscompress', function() {
    return gulp.src('js/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/js'));
});
//压缩css
gulp.task('csscompress', function() {
    return gulp.src('css/index.min.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/css'));
});

//压缩图片
gulp.task('compressimage', function() {
    return gulp.src('images/*.{png,jpg,gif,ico,svg}')
        .pipe(imageMin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/cmpimages'));
})

gulp.task('clean', function() {
    gulp.src("dist/**/*.js", { read: false }).pipe(clean());
    gulp.src("dist/**/*.css", { read: false }).pipe(clean());
});

gulp.task('revVersion', function() {
    return gulp.src(['dist/rev/**/*.json', 'view/*.html'])
        .pipe(revCollector({
            replaceReved: true
        })).pipe(gulp.dest('view'));
})

gulp.task('newSources', function(callback) {
    runSequence('clean', ['jscompress', 'csscompress'],
        'revVersion',
        callback);
});

gulp.task('auto', function() {
    gulp.watch('js/*.js', ['newSources']);
    gulp.watch('css/index.min.css', ['newSources']);
    gulp.watch('images/*.*', ['compressimage']);
})

=======
var gulp = require('gulp');
//压缩js
var uglify = require('gulp-uglify');
//压缩css
var cleanCSS = require('gulp-clean-css');
//压缩图片
var imageMin = require('gulp-imagemin');
var rename = require('gulp-rename');
//生成版本号
var rev = require('gulp-rev');
//替换版本号
var revCollector = require('gulp-rev-collector');
var clean = require('gulp-clean');

var runSequence = require('run-sequence');

//压缩js
gulp.task('jscompress', function() {
    return gulp.src('js/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/js'));
});
//压缩css
gulp.task('csscompress', function() {
    return gulp.src('css/index.min.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/css'));
});

//压缩图片
gulp.task('compressimage', function() {
    return gulp.src('images/*.{png,jpg,gif,ico,svg}')
        .pipe(imageMin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/cmpimages'));
})

gulp.task('clean', function() {
    gulp.src("dist/**/*.js", { read: false }).pipe(clean());
    gulp.src("dist/**/*.css", { read: false }).pipe(clean());
});

gulp.task('revVersion', function() {
    return gulp.src(['dist/rev/**/*.json', 'view/*.html'])
        .pipe(revCollector({
            replaceReved: true
        })).pipe(gulp.dest('view'));
})

gulp.task('newSources', function(callback) {
    runSequence('clean', ['jscompress', 'csscompress'],
        'revVersion',
        callback);
});

gulp.task('auto', function() {
    gulp.watch('js/*.js', ['newSources']);
    gulp.watch('css/index.min.css', ['newSources']);
    gulp.watch('images/*.*', ['compressimage']);
})

>>>>>>> 8f33d3388ed0c45d5fd3c6910549d7b78440e8e8
gulp.task('default', ['auto']);