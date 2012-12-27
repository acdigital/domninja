module.exports = function(grunt)
{
	/* define css rules */

	grunt.cssRules =
	{
		'adjoining-classes': false,
		'box-model': false,
		'box-sizing': false,
		'duplicate-background-images': false,
		'outline-none': false
	};

	/* config grunt */

	grunt.initConfig(
	{
		watch:
		{
			scripts:
			{
				files: ['<config:lint.dn>'],
				tasks: 'lint'
			},
			styles:
			{
				files: ['<config:csslint.dn.src>', '<config:csslint.index.src>'],
				tasks: 'csslint'
			}
		},
		lint:
		{
			dn: ['scripts/dn.js']
		},
		jshint:
		{
			options:
			{
				boss: true,
				browser: true,
				curly: true,
				eqeqeq: true,
				eqnull: true,
				es5: true,
				latedef: true,
				newcap: true,
				noarg: true,
				noempty: true,
				node: true,
				strict: true,
				sub: true,
				trailing: true,
				undef: true,
				white: true
			},
			globals:
			{
				jQuery: true
			}
		},
		csslint:
		{
			dn:
			{
				src: ['styles/dn.css'],
				rules: grunt.cssRules
			},
			index:
			{
				src: ['styles/index.css'],
				rules: grunt.cssRules
			}
		},
		min:
		{
			dn:
			{
				src: ['scripts/dn.js'],
				dest: 'scripts/dn_min.js'
			}
		},
		cssmin:
		{
			index:
			{
				src: ['styles/reset.css', 'styles/index.css'],
				dest: 'styles/index_min.css'
			},
			dn:
			{
				src: ['styles/dn.css'],
				dest: 'styles/dn_min.css'
			}
		},
		bom:
		{
			src: ['index.html', 'styles/*.css', 'scripts/*.js']
		},
		shell:
		{
			toc:
			{
				command: 'php ../tocgen/tocgen.php scripts && php ../tocgen/tocgen.php styles',
				stdout: true
			}
		}
	});

	/* load tasks */

	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-bom');
	grunt.loadNpmTasks('grunt-shell');

	/* register tasks */

	grunt.registerTask('default', 'lint');
	grunt.registerTask('toc', 'shell:toc');
	grunt.registerTask('deploy', 'min cssmin');
};