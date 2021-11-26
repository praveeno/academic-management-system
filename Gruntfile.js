// all configuration goes inside this function
module.exports = function(grunt) {

  // Project configuration,CONFIGURE GRUNT
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    closureLibraryPath: 'node_modules/google-closure-library',
    devDir: 'src/static',
    jsDir: '<%= devDir %>/js',

  closureDepsWriter: {
    options: {
      closureLibraryPath: '<%= closureLibraryPath %>'
    },
    dev: {
      options: {
        root_with_prefix: '"<%= jsDir %>/ ../../../../static/js/"',
      },
      dest: '<%= jsDir %>/dependecies.js'
    }
  }
 
	});
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.registerTask('jshnt', ['jshint']);
  grunt.registerTask('deps', ['closureDepsWriter:dev']);
};