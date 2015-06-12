var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var livereload = require('gulp-livereload');


var devCompiler;


gulp.task("webpack:build-dev", function(done) {
  if (!devCompiler) {
    var myDevConfig = Object.create(webpackConfig);
    myDevConfig.devtool = "sourcemap";
    myDevConfig.debug = true;
    devCompiler = webpack(myDevConfig);
  }

  devCompiler.run(function(err, stats) {
    if (err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({colors: true}));
    done();
  });
});


gulp.task('livereload-build', ['webpack:build-dev'], function() {
  livereload.reload();
});

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch(['assets/js/**'], ['livereload-build']);
});
