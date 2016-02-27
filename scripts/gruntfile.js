module.exports = function(grunt) {
  grunt.initConfig({
    simplemocha: {
      options: {
        timeout: 3000,
        ignoreLeaks: false
      },
      all: {
        src: ['./*.spec.js']
      }
    },
    mocha_istanbul: {
      coverage: {
        src: ['./controllers', './models', './services', './tests/controllers'],
        options: {
            mask: '*.js'
        }
      }
    },
    watch: {
      scripts: {
        files: ['./**/*.js', './tests/**/*.spec.js'],
        tasks: ['controller-tests', 'service-tests']
      }
    }
  });

  grunt.event.on('coverage', function(lcovFileContents, done){
    done();
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  
  grunt.registerTask('controller-tests', function(){
    grunt.file.setBase('./tests/controllers');
    grunt.task.run('simplemocha');

  });
  grunt.registerTask('service-tests', function(){
    grunt.file.setBase('../services');
    grunt.task.run('simplemocha');
  });
  grunt.registerTask('coverage', 'mocha_istanbul:coverage');
  grunt.registerTask('default', ['controller-tests', 'service-tests']);
};