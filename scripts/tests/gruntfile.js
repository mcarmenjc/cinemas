module.exports = function(grunt) {
  grunt.initConfig({
    simplemocha: {
      options: {
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },
      all: {
        src: ['*.spec.js']
      }
    },
    mocha_istanbul: {
      coverage: {
        src: ['../controllers', '../models', './'],
        options: {
            mask: '*.js',
            root: '../'
        }
      }
    },
    watch: {
      scripts: {
        files: ['../controllers/*.js', '../models/*.js', '*.spec.js'],
        tasks: ['mocha_istanbul:coverage']
      }
    }
  });

  grunt.event.on('coverage', function(lcovFileContents, done){
    done();
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  
  grunt.registerTask('tests', 'simplemocha');
  grunt.registerTask('coverage', 'mocha_istanbul:coverage');
  grunt.registerTask('default', 'mocha_istanbul:coverage');
};