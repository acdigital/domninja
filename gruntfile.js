module.exports = function (grunt)
{
	'use strict';

	/* config grunt */

	grunt.initConfig(
	{
		jshint:
		{
			gruntfile: ['gruntfile.js'],
			dn: ['scripts/dn.js'],
			options:
			{
				jshintrc: '.jshintrc'
			}
		},
		csslint:
		{
			dn:
			{
				src: ['styles/dn.css']
			},
			index:
			{
				src: ['styles/index.css']
			},
			options:
			{
				csslintrc: '.csslintrc'
			}
		},
		uglify:
		{
			dn:
			{
				files:
				{
					'scripts/dn_min.js': ['scripts/dn.js']
				}
			}
		},
		cssmin:
		{
			index:
			{
				files:
				{
					'styles/index_min.css': ['styles/reset.css', 'styles/index.css']
				}
			},
			dn:
			{
				files:
				{
					'styles/dn_min.css': ['styles/dn.css']
				}
			}
		},
		shell:
		{
			toc:
			{
				command: 'php ../tocgen/tocgen.php scripts && php ../tocgen/tocgen.php styles'
			},
			options:
			{
				stdout: true
			}
		}
	});

	/* load tasks */

	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-shell');

	/* register tasks */

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('toc', ['shell:toc']);
	grunt.registerTask('deploy', ['uglify', 'cssmin']);
};