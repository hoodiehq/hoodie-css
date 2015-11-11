'use strict';

var browserSync = require('browser-sync').create();

browserSync.init({
  open: 'local',
  proxy: {
    target: 'http://hood.ie'
  },
  files: ['src'],
  middleware: require('serve-static')('src'),
  rewriteRules: [
    {
      match: 'hoodie-css/src/css/prod/hoodie.min.pref.css',
      replace: './css/hoodie.css'
    }
  ]
});
