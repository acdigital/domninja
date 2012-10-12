(function ($)
{
	'use strict';

	/* startup */

	$(function ()
	{
		var html = $('html'),
			body = html.find('body'),
			head = body.find('head'),
			code = html.html(),
			score = 0, scoreTotal = 0, scoreClass,
			id, value, i, panel, panelMessage, panelListing, panelClass,
			dn =
			{
				documentTags:
				{
					elements: $('*').not('div.js_dn_panel, div.js_dn_panel *, link[href$="dn.css"], script[src$="dn.js"]'),
					description: 'Document tags',
					amountNinja: 750,
					amountTrainee: 1500,
					amountNovice: 2500
				},
				httpRequests:
				{
					elements: $('iframe[src], img[src], link[href], script[src], source[src], object[data]').not('link[href$="dn.css"], script[src$="dn.js"]'),
					description: 'HTTP requests',
					amountNinja: 10,
					amountTrainee: 20,
					amountNovice: 50
				},
				deprecatedTags:
				{
					elements: body.find('applet, basefont, center, dir, font, i, isindex, menu, s, strike, u, xmp'),
					description: 'Deprecated tags',
					amountNinja: 0,
					amountTrainee: 50,
					amountNovice: 100
				},
				deprecatedAttributes:
				{
					elements: body.find('[align], [alink], [background], [bgcolor], [border], [clear], [height], [hspace], [language], [link], [nowrap], [start], [text], [vlink], [vspace], [width]'),
					description: 'Deprecated attributes',
					amountNinja: 0,
					amountTrainee: 100,
					amountNovice: 200
				},
				iframeTags:
				{
					elements: body.find('iframe'),
					description: 'Iframe tags',
					amountNinja: 0,
					amountTrainee: 5,
					amountNovice: 10
				},
				embedTags:
				{
					elements: body.find('embed'),
					description: 'Embed tags',
					amountNinja: 0,
					amountTrainee: 5,
					amountNovice: 10
				},
				scaledImgTags:
				{
					elements: body.find('img[width], img[height]'),
					description: 'Scaled img tags',
					amountNinja: 5,
					amountTrainee: 10,
					amountNovice: 20
				},
				conditionalComments:
				{
					elements: code.match(/<!--\[.*?\]-->/g),
					description: 'Conditional comments',
					amountNinja: 20,
					amountTrainee: 30,
					amountNovice: 40
				},
				documentComments:
				{
					elements: code.match(/<!--.*?-->/g),
					description: 'Document comments',
					amountNinja: 10,
					amountTrainee: 20,
					amountNovice: 30
				},
				emptyTags:
				{
					elements: html.find(':empty').not('area, base, basefont, br, hr, iframe[src], img[src], input, link[rel], meta, param, script[src]'),
					description: 'Empty tags',
					amountNinja: 50,
					amountTrainee: 100,
					amountNovice: 250
				},
				emptyAltAttributes:
				{
					elements: body.find('img[alt=""]'),
					description: 'Empty alt attributes',
					amountNinja: 0,
					amountTrainee: 10,
					amountNovice: 20
				},
				emptyHrefAttributes:
				{
					elements: body.find('a[href=""]'),
					description: 'Empty href attributes',
					amountNinja: 0,
					amountTrainee: 10,
					amountNovice: 20
				},
				emptySrcAttributes:
				{
					elements: body.find('iframe[src=""], img[src=""]'),
					description: 'Empty src attributes',
					amountNinja: 0,
					amountTrainee: 5,
					amountNovice: 10
				},
				visibleTags:
				{
					elements: body.find(':visible'),
					description: 'Visible tags',
					amountNinja: 650,
					amountTrainee: 1300,
					amountNovice: 2000
				},
				hiddenTags:
				{
					elements: body.find(':hidden'),
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
					elements: body.find('[id]'),
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
					elements: body.find('[id] > [id]'),
					description: 'Tags with nested ID',
					amountNinja: 5,
					amountTrainee: 10,
					amountNovice: 15
				},
				deepNestedTags:
				{
					elements: body.find('* > * > * > * > * > * > * > * > * > * > * > * > * > * > *'),
					description: 'Deep nested tags',
					amountNinja: 0,
					amountTrainee: 20,
					amountNovice: 50
				},
				styleTagsInBody:
				{
					elements: body.find('style'),
					description: 'Style tag in body',
					amountNinja: 5,
					amountTrainee: 10,
					amountNovice: 20
				},
				styleExternals:
				{
					elements: html.find('link[type="text/css"][rel="stylesheet"]').not('link[href$="dn.css"]'),
					description: 'External style files',
					amountNinja: 5,
					amountTrainee: 10,
					amountNovice: 20
				},
				styleInlineAttributes:
				{
					elements: html.find('[style]').not('div.js_dn_panel'),
					description: 'Inline style attributes',
					amountNinja: 0,
					amountTrainee: 10,
					amountNovice: 20
				},
				scriptTagsInHead:
				{
					elements: head.find('script'),
					description: 'Script tags in head',
					amountNinja: 5,
					amountTrainee: 10,
					amountNovice: 20
				},
				scriptExternals:
				{
					elements: head.find('script[type="text/javascript"][src]').not('script[src$="dn.js"]'),
					description: 'External script files',
					amountNinja: 5,
					amountTrainee: 10,
					amountNovice: 20
				},
				scriptInlineAttributes:
				{
					elements: html.find('[onabort], [onactivate], [onafterprint], [onafterupdate], [onbeforeactivate], [onbeforecopy], [onbeforecut], [onbeforedeactivate], [onbeforeeditfocus], [onbeforepaste], [onbeforeprint], [onbeforeunload], [onbeforeupdate], [onblur], [onbounce], [oncellchange], [onchange], [onclick], [oncontextmenu], [oncontrolselect], [oncopy], [oncut], [ondataavailable], [ondatasetchanged], [ondatasetcomplete], [ondblclick], [ondeactivate], [ondrag], [ondragend], [ondragenter], [ondragleave], [ondragover], [ondragstart], [ondrop], [onerror], [onerrorupdate], [onfilterchange], [onfinish], [onfocus], [onfocusin], [onfocusout], [onhelp], [onkeydown], [onkeypress], [onkeyup], [onlayoutcomplete], [onload], [onlosecapture], [onmousedown], [onmouseenter], [onmouseleave], [onmousemove], [onmouseout], [onmouseover], [onmouseup], [onmousewheel], [onmove], [onmoveend], [onmovestart], [onpaste], [onpropertychange], [onreadystatechange], [onreset], [onresize], [onresizeend], [onresizestart], [onrowenter], [onrowexit], [onrowsdelete], [onrowsinserted], [onscroll], [onselect], [onselectionchange], [onselectstart], [onstartonstop], [onsubmit], [onunload]'),
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

		/* calculate amounts of dn objects */

		for (value in dn)
		{
			if (dn.hasOwnProperty(value))
			{
				if (dn[value].elements)
				{
					dn[value].amount = dn[value].elements.length;
				}
				else
				{
					dn[value].amount = 0;
				}
			}
		}

		/* calculate conditional comments */

		if (dn.conditionalComments.amount)
		{
			dn.documentComments.amount = dn.documentComments.amount - dn.conditionalComments.amount;
		}

		/* calculate display ratio */

		if (dn.visibleTags.amount && dn.hiddenTags.amount)
		{
			dn.displayRatio.amount = Math.round(dn.hiddenTags.amount / dn.visibleTags.amount * 100);
		}

		/* calculate duplicated id */

		dn.hasIDTags.elements.each(function ()
		{
			id = $('[id=' + this.id + ']');

			if (id.length > 1 && id[0] === this)
			{
				dn.duplicatedIDTags.elements.push(id);
				dn.duplicatedIDTags.amount += id.length;
			}
		});

		/* calculate script globals */

		for (i in window)
		{
			if (window.hasOwnProperty(i))
			{
				dn.scriptGlobals.elements.push(i);
				dn.scriptGlobals.amount++;
			}
		}

		/* remove old panel */

		$('div.js_dn_panel').remove();

		/* append new panel */

		panel = $('<div class="js_dn_panel dn_panel dn_panel_left"></div>').appendTo(body).hide();

		/* collect panel listing */

		panelListing = '<h1 class="js_dn_title_panel dn_title_panel">DOM Ninja</h1><ul class="js_dn_list_panel dn_list_panel">';
		for (value in dn)
		{
			if (dn.hasOwnProperty(value))
			{
				scoreTotal++;
				if (dn[value].amount === 0)
				{
					score++;
					panelClass = 'dn_amount_zero';
				}
				else if (dn[value].amount <= dn[value].amountNinja)
				{
					score++;
					panelClass = 'dn_amount_ninja';
				}
				else if (dn[value].amount <= dn[value].amountTrainee)
				{
					panelClass = 'dn_amount_trainee';
				}
				else if (dn[value].amount >= dn[value].amountNovice)
				{
					score--;
					panelClass = 'dn_amount_novice';
				}
				else
				{
					panelClass = 'dn_amount';
				}
				panelListing += '<li class=' + panelClass +' title="Ninja: ' + dn[value].amountNinja + ' | Trainee: ' + dn[value].amountTrainee + ' | Novice: ' + dn[value].amountNovice + '">' + dn[value].description + ': ' + dn[value].amount + '</li>';
			}
		}
		panelListing += '</ul>';

		/* post listing to panel */

		panel.html(panelListing).fadeIn(500);

		/* handle score */

		if (score < 0)
		{
			score = 0;
		}
		if (score >= scoreTotal - 5)
		{
			scoreClass = 'dn_score_ninja';
			panelMessage = 'Ninja, you make me proud!';
		}
		else if (score >= scoreTotal - 10)
		{
			scoreClass = 'dn_score_trainee';
			panelMessage = 'Trainee, room for improvement!';
		}
		else
		{
			scoreClass = 'dn_score_novice';
			panelMessage = 'Novice, you are doing it wrong!';
		}

		/* modify panel */

		panel.addClass(scoreClass);
		panel.children('ul').append('<li class="dn_strong" title="Check the Javascript console for detailed information.">' + panelMessage + ' (' + score + '/' + scoreTotal +')</li>');

		/* scroll to panel */

		html.add(body).animate({
			scrollTop: 0
		}, 1000);

		/* switch panel position on click */

		panel.children('ul.js_dn_list_panel').click(function ()
		{
			panel.hide().toggleClass('dn_panel_left dn_panel_right').fadeIn(500);
		});

		/* change panel title on hover */

		panel.children('h1.js_dn_title_panel').hover(function ()
		{
			$(this).text('Close');
		}, function () {
			$(this).text('DOM Ninja');
		});

		/* remove dom ninja on click */

		panel.children('h1.js_dn_title_panel').click(function ()
		{
			panel.remove();
			$('link[href$="dn.css"], script[src$="dn.js"]').remove();
		});

		/* output dn object to console */

		if (window.console)
		{
			window.console.log(dn);
		}
	});
})(jQuery);