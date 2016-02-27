'use strict';

var path = require('path');

module.exports = function babel(grunt) {
	return {
		server: {
			files: [{
				expand: true,
				src: ['**/*.es6'],
				ext: '.js'
			}]
		}
	}

}
