'use strict';

var ES5JS = [
    'controllers/**/*.js',
    'lib/**/*.js',
    'models/**/*.js'
];

module.exports = {
    es6: {
        options: {
            extensions: ['.es6'],
            config: '.eslintes6rc'
        },
        src: '.'
    },
    es5: {
        options: {
            config: '.eslintrc'
        },
        src: ES5JS
    }
};







