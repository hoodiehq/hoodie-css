#!/usr/bin/env node
'use strict';

var browserSync = require('browser-sync').create();

browserSync.init({
  open: 'local',
  proxy: {
    target: 'http://hood.ie'
  },
  middleware: require('serve-static')('src'),
  rewriteRules: [
    {
      match: 'hoodiehq.github.io/hoodie-css/src/css/prod/hoodie.min.pref.css',
      replace: 'localhost:3000/css/hoodie.css'
    }
  ]
});
