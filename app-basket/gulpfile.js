var gulp = require('gulp');
//压缩js
var uglify = require('gulp-uglify');
//压缩css
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
//生成版本号
var rev = require('gulp-rev');
//替换版本号
var revCollector = require('gulp-rev-collector');
var clean = require('gulp-clean');

var runSequence = require('run-sequence');

gulp.task('jscompress', function() {
    return gulp.src('js/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/js'));
});
gulp.task('csscompress', function() {
    return gulp.src('css/index.min.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/css'));
});

gulp.task('clean', function() {
    gulp.src("dist/**/*.js", { read: false }).pipe(clean());
    gulp.src("dist/**/*.css", { read: false }).pipe(clean());
});

gulp.task('revVersion', function() {
    return gulp.src(['dist/rev/**/*.json', 'view/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('view'));
})

gulp.task('newSources', function(callback) {
    runSequence('clean', ['jscompress', 'csscompress'],
        'revVersion',
        callback);
});

gulp.task('auto', function() {
    gulp.watch('js/*.js', ['newSources']);
    gulp.watch('css/index.min.css', ['newSources']);
})

gulp.task('default', ['auto']);