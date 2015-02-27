module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
	'app/bower_components/angular/angular.js',
	'app/bower_components/angular-route/angular-route.js',
	'app/bower_components/angular-mocks/angular-mocks.js',
	'app/bower_components/angular-resource/angular-resource.js',
  	'test/unit/*.js',
	'app/bower_components/d3/d3.js',
	'app/js/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
