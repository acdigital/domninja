/**
 * @tableofcontents
 *
 * 1. dom ninja
 */

(function ($)
{
	'use strict';

	/* @section 1. dom ninja */

	$(function ()
	{
		var dn = dn || {};

		/* wording */

		dn.wording =
		{
			title: 'DOM Ninja',
			close: 'Close',
			message:
			{
				ninja: 'Ninja, you make me proud!',
				trainee: 'Trainee, room for improvement!',
				novice: 'Novice, you are doing it wrong!'
			},
			console: 'Check the Javascript console for detailed information.'
		};

		/* counters */

		dn.score = 0;
		dn.total = 0;

		/* cache */

		dn.html = $('html');
		dn.body = dn.html.find('body');
		dn.head = dn.body.find('head');
		dn.code = dn.html.html();

		/* files */

		dn.files =
		{
			css: 'dn_min.css',
			js: 'dn_min.js'
		};

		/* setup */

		dn.setup =
		{
			documentTags:
			{
				elements: $('*').not('div.js_dn_panel, div.js_dn_panel *, link[href$="' + dn.files.css + '"], script[src$="' + dn.files.js + '"]'),
				description: 'Document tags',
				amountNinja: 750,
				amountTrainee: 1500,
				amountNovice: 2500
			},
			httpRequests:
			{
				elements: $('iframe[src], img[src], link[href], script[src], source[src], object[data]').not('link[href$="' + dn.files.css + '"], script[src$="' + dn.files.js + '"]'),
				description: 'HTTP requests',
				amountNinja: 10,
				amountTrainee: 20,
				amountNovice: 50
			},
			deprecatedTags:
			{
				elements: dn.body.find('applet, basefont, center, dir, font, i, isindex, menu, s, strike, u, xmp'),
				description: 'Deprecated tags',
				amountNinja: 0,
				amountTrainee: 50,
				amountNovice: 100
			},
			deprecatedAttributes:
			{
				elements: dn.body.find('[align], [alink], [background], [bgcolor], [border], [clear], [height], [hspace], [language], [link], [nowrap], [start], [text], [vlink], [vspace], [width]'),
				description: 'Deprecated attributes',
				amountNinja: 0,
				amountTrainee: 100,
				amountNovice: 200
			},
			iframeTags:
			{
				elements: dn.body.find('iframe'),
				description: 'Iframe tags',
				amountNinja: 0,
				amountTrainee: 5,
				amountNovice: 10
			},
			embedTags:
			{
				elements: dn.body.find('embed'),
				description: 'Embed tags',
				amountNinja: 0,
				amountTrainee: 5,
				amountNovice: 10
			},
			scaledImgTags:
			{
				elements: dn.body.find('img[width], img[height]'),
				description: 'Scaled img tags',
				amountNinja: 5,
				amountTrainee: 10,
				amountNovice: 20
			},
			conditionalComments:
			{
				elements: dn.code.match(/<!--\[.*?\]-->/g),
				description: 'Conditional comments',
				amountNinja: 20,
				amountTrainee: 30,
				amountNovice: 40
			},
			documentComments:
			{
				elements: dn.code.match(/<!--.*?-->/g),
				description: 'Document comments',
				amountNinja: 10,
				amountTrainee: 20,
				amountNovice: 30
			},
			emptyTags:
			{
				elements: dn.html.find(':empty').not('area, base, basefont, br, hr, iframe[src], img[src], input, link[rel], meta, param, script[src]'),
				description: 'Empty tags',
				amountNinja: 50,
				amountTrainee: 100,
				amountNovice: 250
			},
			emptyAltAttributes:
			{
				elements: dn.body.find('img[alt=""]'),
				description: 'Empty alt attributes',
				amountNinja: 0,
				amountTrainee: 10,
				amountNovice: 20
			},
			emptyHrefAttributes:
			{
				elements: dn.body.find('a[href=""]'),
				description: 'Empty href attributes',
				amountNinja: 0,
				amountTrainee: 10,
				amountNovice: 20
			},
			emptySrcAttributes:
			{
				elements: dn.body.find('iframe[src=""], img[src=""]'),
				description: 'Empty src attributes',
				amountNinja: 0,
				amountTrainee: 5,
				amountNovice: 10
			},
			visibleTags:
			{
				elements: dn.body.find(':visible'),
				description: 'Visible tags',
				amountNinja: 650,
				amountTrainee: 1300,
				amountNovice: 2000
			},
			hiddenTags:
			{
				elements: dn.body.find(':hidden'),
				description: 'Hidden tags',
				amountNinja: 100,
				amountTrainee: 200,
				amountNovice: 500
			},
			displayRatio:
			{
				elements: '',
				description: 'Display ratio',
				amountNinja: 20,
				amountTrainee: 40,
				amountNovice: 60
			},
			hasIDTags:
			{
				elements: dn.body.find('[id]'),
				description: 'Tags with ID',
				amountNinja: 10,
				amountTrainee: 20,
				amountNovice: 50
			},
			duplicatedIDTags:
			{
				elements: [],
				description: 'Tags with duplicated ID',
				amountNinja: 0,
				amountTrainee: 5,
				amountNovice: 10
			},
			nestedIDTags:
			{
				elements: dn.body.find('[id] > [id]'),
				description: 'Tags with nested ID',
				amountNinja: 5,
				amountTrainee: 10,
				amountNovice: 15
			},
			deepNestedTags:
			{
				elements: dn.body.find('* > * > * > * > * > * > * > * > * > * > * > * > * > * > *'),
				description: 'Deep nested tags',
				amountNinja: 0,
				amountTrainee: 20,
				amountNovice: 50
			},
			styleTagsInBody:
			{
				elements: dn.body.find('style'),
				description: 'Style tag in body',
				amountNinja: 5,
				amountTrainee: 10,
				amountNovice: 20
			},
			styleExternals:
			{
				elements: dn.html.find('link[type="text/css"][rel="stylesheet"]').not('link[href$="' + dn.files.css + '"]'),
				description: 'External style files',
				amountNinja: 5,
				amountTrainee: 10,
				amountNovice: 20
			},
			styleInlineAttributes:
			{
				elements: dn.html.find('[style]').not('div.js_dn_panel'),
				description: 'Inline style attributes',
				amountNinja: 0,
				amountTrainee: 10,
				amountNovice: 20
			},
			scriptTagsInHead:
			{
				elements: dn.head.find('script'),
				description: 'Script tags in head',
				amountNinja: 5,
				amountTrainee: 10,
				amountNovice: 20
			},
			scriptExternals:
			{
				elements: dn.head.find('script[type="text/javascript"][src]').not('script[src$="' + dn.files.js + '"]'),
				description: 'External script files',
				amountNinja: 5,
				amountTrainee: 10,
				amountNovice: 20
			},
			scriptInlineAttributes:
			{
				elements: dn.html.find('[onabort], [onactivate], [onafterprint], [onafterupdate], [onbeforeactivate], [onbeforecopy], [onbeforecut], [onbeforedeactivate], [onbeforeeditfocus], [onbeforepaste], [onbeforeprint], [onbeforeunload], [onbeforeupdate], [onblur], [onbounce], [oncellchange], [onchange], [onclick], [oncontextmenu], [oncontrolselect], [oncopy], [oncut], [ondataavailable], [ondatasetchanged], [ondatasetcomplete], [ondblclick], [ondeactivate], [ondrag], [ondragend], [ondragenter], [ondragleave], [ondragover], [ondragstart], [ondrop], [onerror], [onerrorupdate], [onfilterchange], [onfinish], [onfocus], [onfocusin], [onfocusout], [onhelp], [onkeydown], [onkeypress], [onkeyup], [onlayoutcomplete], [onload], [onlosecapture], [onmousedown], [onmouseenter], [onmouseleave], [onmousemove], [onmouseout], [onmouseover], [onmouseup], [onmousewheel], [onmove], [onmoveend], [onmovestart], [onpaste], [onpropertychange], [onreadystatechange], [onreset], [onresize], [onresizeend], [onresizestart], [onrowenter], [onrowexit], [onrowsdelete], [onrowsinserted], [onscroll], [onselect], [onselectionchange], [onselectstart], [onstartonstop], [onsubmit], [onunload]'),
				description: 'Inline script attributes',
				amountNinja: 0,
				amountTrainee: 10,
				amountNovice: 20
			},
			scriptGlobals:
			{
				elements: [],
				description: 'Script globals',
				amountNinja: 20,
				amountTrainee: 50,
				amountNovice: 100
			}
		};

		/* calculate elements amount */

		dn.calcElementsAmount = function ()
		{
			var i = '';

			for (i in dn.setup)
			{
				if (dn.setup.hasOwnProperty(i))
				{
					dn.total++;
					if (dn.setup[i].elements)
					{
						dn.setup[i].amount = dn.setup[i].elements.length;
					}
					else
					{
						dn.setup[i].amount = 0;
					}
				}
			}
		}();

		/* calculate conditional comments */

		dn.calcConditionalComments = function ()
		{
			if (dn.setup.conditionalComments.amount)
			{
				dn.setup.documentComments.amount = dn.setup.documentComments.amount - dn.setup.conditionalComments.amount;
			}
		}();

		/* calculate display ratio */

		dn.calcDisplayRatio = function ()
		{
			if (dn.setup.visibleTags.amount && dn.setup.hiddenTags.amount)
			{
				dn.setup.displayRatio.amount = Math.round(dn.setup.hiddenTags.amount / dn.setup.visibleTags.amount * 100);
			}
		}();

		/* calculate duplicated id */

		dn.calcDuplicatedID = function ()
		{
			dn.setup.hasIDTags.elements.each(function ()
			{
				var id = $('[id=' + this.id + ']'),
					lenght = id.length;

				if (lenght > 1 && id[0] === this)
				{
					dn.setup.duplicatedIDTags.elements.push(id);
					dn.setup.duplicatedIDTags.amount += lenght;
				}
			});
		}();

		/* calculate script globals */

		dn.calcScriptGlobals = function ()
		{
			var i = '';

			for (i in window)
			{
				if (window.hasOwnProperty(i))
				{
					dn.setup.scriptGlobals.elements.push(i);
					dn.setup.scriptGlobals.amount++;
				}
			}
		}();

		/* console log */

		dn.consoleLog = function ()
		{
			if (typeof window.console === 'object')
			{
				window.console.log(dn.setup);
			}
		}();

		/* destroy panel */

		dn.destroyPanel = function ()
		{
			dn.body.find('div.js_dn_panel, link[href$="' + dn.files.css + '"], script[src$="' + dn.files.js + '"]').remove();
		}();

		/* create panel */

		dn.createPanel = function ()
		{
			dn.panel = dn.panel || {};
			dn.panel.body = $('<div class="js_dn_panel dn_panel"></div>').appendTo(dn.body);
			dn.panel.title = $('<h1 class="js_dn_title_panel dn_title_panel">' + dn.wording.title + '</h1>').appendTo(dn.panel.body);
			dn.panel.list = $('<ul class="js_dn_list_panel dn_list_panel"></ul>').appendTo(dn.panel.body);

			/* scroll top */

			dn.html.add(dn.body).animate(
			{
				scrollTop: 0
			}, 1000);

			/* panel title click */

			dn.panel.title.click(function ()
			{
				dn.body.find('div.js_dn_panel, link[href$="' + dn.files.css + '"], script[src$="' + dn.files.js + '"]').remove();
			});

			/* panel title hover */

			dn.panel.title.hover(function ()
			{
				dn.panel.title.text(dn.wording.close);
			}, function ()
			{
				dn.panel.title.text(dn.wording.title);
			});
		}();

		/* create panel items */

		dn.createPanelItems = function ()
		{
			var output = '', i = '';

			/* collect output */

			for (i in dn.setup)
			{
				if (dn.setup.hasOwnProperty(i))
				{
					output += '<li class="dn_amount_';
					if (dn.setup[i].amount <= dn.setup[i].amountNinja)
					{
						dn.score++;
						output += 'ninja';
					}
					else if (dn.setup[i].amount <= dn.setup[i].amountTrainee)
					{
						output += 'trainee';
					}
					else if (dn.setup[i].amount <= dn.setup[i].amountNovice)
					{
						dn.score--;
						output += 'novice';
					}
					else
					{
						dn.score - 2;
						output += 'fail';
					}
					output += '" title="Ninja: ' + dn.setup[i].amountNinja + ' | Trainee: ' + dn.setup[i].amountTrainee + ' | Novice: ' + dn.setup[i].amountNovice + '">' + dn.setup[i].description + ': ' + dn.setup[i].amount + '</li>';
				}
			}

			/* append output to panel list */

			dn.panel.list.html(output).fadeIn(500);
		}();

		/* handle score */

		dn.handleScore = function ()
		{
			var output = '';

			/* prevent negative score */

			if (dn.score < 0)
			{
				dn.score = 0;
			}

			/* collect output */

			output = '<li class="dn_strong" title="' + dn.wording.console + '">';
			if (dn.score >= dn.total - 5)
			{
				dn.type = 'ninja';
			}
			else if (dn.score >= dn.total - 10)
			{
				dn.type = 'trainee';
			}
			else
			{
				dn.type = 'novice';
			}
			output += dn.wording.message[dn.type] + ' (' + dn.score + '/' + dn.total + ')</li>';

			/* modify panel */

			dn.panel.list.append(output);
			dn.panel.body.addClass('dn_score_' + dn.type);
		}();
	});
})(jQuery);