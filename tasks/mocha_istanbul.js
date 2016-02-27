'use strict';

module.exports = function mochaIstanbul() {

	return {
		mocha_istanbul: {
			src: ['test/*.js'],
			options: {
				coverageOptions: '--hook-run-in-context',
				excludes: ['**/public/js/**'],
				globals: ['chai', '_', 'Backbone'],
				ignoreLeaks: true,
				mochaOptions: ['-R', 'dot', '--recursive'],
				reportFormats: ['text'],
				reporter: 'dot',
				reportType: 'lcov',
				printType: 'both',
				timeout: 10000,
				ui: 'bdd',

				check: {
					'lines': 30,
					'statements': 30,
					'functions': 40,
					'branches': 10,
					'includePattern': '**/coverage*.json'
				}
			}
		}
	};
};
