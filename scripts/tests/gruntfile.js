module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
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
    watch: {
      scripts: {
        files: ['../controllers/*.js', '*.spec.js'],
        tasks: ['simplemocha']
      }
    }
  });
  grunt.registerTask('default', 'simplemocha');
};