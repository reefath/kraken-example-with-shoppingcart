'use strict';


module.exports = function (grunt) {

    // Load the project's grunt tasks from a directory
    require('load-grunt-config')(grunt, {
        configPath: require('path').resolve('tasks')
    });

    // Register group tasks
    grunt.registerTask('build', [ 'jshint', 'less', 'i18n', 'copyto' ]);
    grunt.registerTask('test', [ 'eslint', 'mochaTest']);
    grunt.registerTask('lint', [ 'eslint']);

};
