'use strict';

var gulp = require('gulp');
var server = require('gulp-express');
var webpack = require('gulp-webpack');

gulp.task('webpack', function () {
  gulp.src('src/init.jsx')
    .pipe(webpack({
      output: {
        filename: "bundle.js" //fichier de sortie
      },
      module: {
        loaders: [
          {test: /\.jsx$/, loader: 'jsx-loader'} //jsx-loader is used for files that match regex /\.jsx$/
        ]
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['webpack'], function () {
  server.run({
    file: 'server.js'
  });

  gulp.watch(['src/**/*.{html,css,js,jsx}'], ['webpack']);
  gulp.watch(['src/**/*.{html,css,js,jsx}'], function (event) {
    server.notify(event);
  });
});