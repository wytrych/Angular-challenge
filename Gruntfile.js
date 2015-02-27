module.exports = function(grunt) {
  grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),

 	  concat: {
 		 options: {
    			separator: ';'
  		 },
  	  	 dist: {
    		 	src: ['app/js/*.js'],
    			dest: 'build/script.js'
  		 }
 	 }	
  })
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.registerTask('build', ['concat']);
};



