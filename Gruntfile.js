module.exports = function (grunt) {

  grunt.initConfig({
    transpile: {
      main: {
        type: 'globals',
        imports: { rx: 'Rx' },
        files: {
          'dist/main.js': ['src/main.js'],
          'dist/BidiEl.js': ['src/BidiEl.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-es6-module-transpiler');
  grunt.registerTask('default', ['transpile']);
};