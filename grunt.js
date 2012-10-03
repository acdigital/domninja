module.exports = function(grunt)
{
	/* define css rules */

	grunt.cssRules =
	{
		'adjoining-classes': false,
		'box-model': false,
		'box-sizing': false,
		'compatible-vendor-prefixes': false,
		'duplicate-background-images': false,
		'fallback-colors': false,
		'text-indent': false,
		'unique-headings': false,
		'outline-none': false,
		'qualified-headings': false
	};

	/* config grunt */

	grunt.initConfig({
		lint:
		{
			dn: ['scripts/*.js']
		},
		watch:
		{
			scripts:
			{
				files: ['<config:lint.dn>'],
				tasks: 'lint'
			},
			styles:
			{
				files: ['<config:csslint.dn.src>'],
				tasks: 'csslint'
			}
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
				immed: false,
				latedef: true,
				newcap: true,
				noarg: true,
				node: true,
				sub: true,
				undef: true
			},
			globals:
			{
				_gaq: true,
				_gat: true,
				jQuery: true
			}
		},
		csslint:
		{
			dn:
			{
				src: ['styles/*.css'],
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
			dn:
			{
				src: ['*.html', 'styles/*.css', 'scripts/*.js']
			}
		}
	});

	/* load tasks */

	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-bom');

	/* register tasks */

	grunt.registerTask('default', 'lint');
	grunt.registerTask('deploy', 'min cssmin');
};