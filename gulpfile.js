var gulp = require("gulp"),
	connect = require("gulp-connect"),
	opn = require("opn");
  wiredep = require('wiredep').stream;

//Запуск сервера с лайврелоадом
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });
});

opn('http://localhost:8888');

//Работа с html
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

//Работа с css
gulp.task('css', function () {
  gulp.src('./app/css/*.css')
    .pipe(connect.reload());
});

//Работа с js
gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});

//Слежка
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/css/*.css'], ['css']);
  gulp.watch(['./app//js/*.js'], ['js']);
  gulp.watch(['.bower.json'], ['bower']);
});

gulp.task('default', ['connect', 'watch']);

// Зависимости

gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: "app/bower"
    }))
    .pipe(gulp.dest('./app'));
});
