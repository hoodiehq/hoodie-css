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
    scsslint: {
      allFiles: [
          'src/sass/*.scss'
        ],
        options: {
          config: '.scss-lint.yml',
          colorizeOutput: true
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
          'src/js/prod/hoodie.min.js' : ['src/js/jquery.min.js', 'src/js/icheck.min.js', 'src/js/main.js', 'src/prism/prism.js']
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
  grunt.loadNpmTasks('grunt-scss-lint');


  grunt.registerTask('default', [
      'connect',
      'watch'
    ]);
  grunt.registerTask('build', [
      'sass:scsslint',
      'sass:prod',
      'copy',
      'autoprefixer',
      'uglify',
    ]);
};
