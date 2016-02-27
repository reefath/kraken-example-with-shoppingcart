'use strict';


module.exports = function clean(grunt) {
	var es6files = grunt.file.expand({}, '**/*.es6').map(function(file) {
        return file.replace('.es6', '.js');
    });

    return {
        tmp: 'tmp',
        build: '.build/templates',
        reports: 'coverage',
        babel: es6files
    };
};
