module.exports = function(grunt) {
  'use strict';
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 1337,
        }
      }
    },
    watch: {
      css: {
        files: 'src/sass/**/*.scss',
        tasks: ['sass:dev'],
        options: {
          atBegin: true,
          interrupt: true,
          spawn: true,
          livereload: 35829
        }
      }
    },
    sass: {
      dev: {
        options: {
          sourceMap: true,
          outputStyle: 'nested'
        },
        files: {
          'src/css/hoodie.css' : 'src/sass/base.scss'
        }
      },
      prod: {
        options: {
            sourceMap: false,
            outputStyle: 'compressed'
        },
        files: {
            'src/css/prod/hoodie.min.css' : 'src/sass/base.scss'
        }
      }
    },
    copy: {
        main: {
            src: 'src/css/prod/hoodie.min.css',
            dest: 'src/css/.tmp/hoodie.min.tmp.css'
        }
    },
    autoprefixer: {
        single_file: {
            options: {
                browsers: ['last 2 versions', 'ie 11', 'ie 10', 'ie 9'],
                cascade: false,
                annotation: false
            },
            src: 'src/css/.tmp/hoodie.min.tmp.css',
            dest: 'src/css/prod/hoodie.min.pref.css'

        }
    },
    uglify: {
      options: {
        mangle: false
      },
      files: {
        files: {
          'src/js/prod/hoodie.min.js' : ['src/js/jquery.min.js', 'src/js/main.js']
        }
      }
    },
    'string-replace': {
      dev: {
        files: {
          '_includes/head.html':'_includes/head.html',
          '_includes/footer.html':'_includes/footer.html'
        },
        options: {
            replacements: [
              {
                pattern: '<link rel="stylesheet" href="/src/prod/hoodie.min.pref.css">',
                replacement: '<link rel="stylesheet" href="/src/css/hoodie.css">'
              },
              {
                pattern: '<script src="/src/prod/hoodie.min.js"></script>',
                replacement: '<script src="/src/js/jquery/dist/jquery.js"></script><script src="/src/js/main.js"></script>'
              }
            ]
        }
      },
      build: {
        files: {
            '_includes/head.html':'_includes/head.html',
            '_includes/footer.html':'_includes/footer.html'
        },
        options: {
          replacements: [
            {
              pattern: '<script src="/src/js/jquery/dist/jquery.js"></script><script src="/dist/js/main.js"></script>',
              replacement: '<script src="/src/prod/hoodie.min.js"></script>'
            },
            {
              pattern: '<link rel="stylesheet" href="/src/css/hoodie.css">',
              replacement: '<link rel="stylesheet" href="/src/prod/hoodie.min.pref.css">'
            },
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-string-replace');


  grunt.registerTask('default', [
      'connect',
      'string-replace:dev',
      'watch'
    ]);
  grunt.registerTask('build', [
      'sass:prod',
      'copy',
      'autoprefixer',
      'uglify',
      'string-replace:build'
    ]);
};
