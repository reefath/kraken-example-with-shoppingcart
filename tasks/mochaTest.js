'use strict';

module.exports = function mochaTest(grunt) {
    return {
        options: {
            require: ['babel-register', 'babel-polyfill'], // add es6 support
            timeout: 10000,
            ignoreLeaks: true,
            ui: 'bdd',
            reporter: 'spec'
        },
        test: ['test/*.es6'] // list of test files
    };
};
