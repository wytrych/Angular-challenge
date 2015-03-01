module.exports = function(grunt) {
  grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),

 	  concat: {
 		 options: {
    			separator: ';'
  		 },
  	  	 dist: {
			 files: {
    			'app/build/js/script.js': ['app/js/*.js'],
    			'app/build/strands/strands.json': ['app/strands/strands.json'],
    			'app/build/popup.html': ['app/popup.html'],
    			'app/build/css/style.css': ['app/css/*.css']
			}
  		 }
 	 },

	 processhtml: {
	 	options: {
		},
	 	dist: {
			files: {
				'app/build/index.html': ['app/index.html']
			}
		}
	}
  })
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-processhtml');
grunt.registerTask('build', ['concat', 'processhtml']);
};



