(function(){
   'use strict';

   module.exports = function(grunt){
      grunt.initConfig({
         pkg: grunt.file.readJSON('package.json'),
         watch: {
            js: {
               files: ['gruntfile.js', 'app.js', 'public/javascripts/*.js'],
               options: {
                  livereload: true
               }
            }
         },
         jshint: {
            all: {
               src: ['gruntfile.js', 'app.js', 'public/javascripts/*.js'],
               options: {
                  jshintrc: true
               }
            }
         },
            nodemon: {
                dev: {
                    options: {
                        file: 'app.js',
                        args: [],
                        watchedExtensions: ['js'],
                        nodeArgs: ['--debug'],
                        delayTime: 1,
                        env: {
                            PORT: 3000
                        }
                    }
                }
            },
            concurrent: {
                tasks: ['nodemon','watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
         
      });
      
      //Load NPM tasks
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-nodemon');
        grunt.loadNpmTasks('grunt-concurrent');
        grunt.loadNpmTasks('grunt-env');

      grunt.option('force', true);
      grunt.registerTask('default', ['jshint', 'concurrent']);
   };
})();
