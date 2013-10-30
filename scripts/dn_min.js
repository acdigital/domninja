!function(a,b,c){"use strict";c(function(){b.dn=b.dn||{},dn.version="2.0.0",dn.host=b.location.hostname.split(".").slice(-2).join("."),dn.duration=1e3,dn.wording={title:"DOM Ninja",close:"Close",message:{ninja:"Ninja, you make me proud!",trainee:"Trainee, room for improvement!",novice:"Novice, you are doing it wrong!"},console:"Check the Javascript console for detailed information."},dn.score=0,dn.total=0,dn.html=c("html"),dn.body=dn.html.find("body"),dn.head=dn.html.find("head"),dn.code=dn.html.html(),dn.elements={panel:dn.body.find("div.js_dn_panel"),css:dn.head.find('link[href$="dn_min.css"]'),js:dn.body.find('script[src$="dn_min.js"]')},dn.setup={documentTags:{elements:c("*").not(dn.elements.panel).not(dn.elements.panel.find("*")).not(dn.elements.css).not(dn.elements.js),description:"Document tags",amountNinja:1e3,amountTrainee:1500,amountNovice:2500},canonicalUrl:{elements:dn.head.find('link[rel="canonical"]'),description:"Canonical URL",amountGeneral:1},httpRequests:{elements:dn.html.find("iframe[src], img[src], link[href], script[src], source[src], object[data]").not(dn.elements.css).not(dn.elements.js),description:"HTTP requests",amountNinja:15,amountTrainee:25,amountNovice:50},deprecatedTags:{elements:dn.body.find("applet, basefont, center, dir, font, i, isindex, menu, s, strike, u, xmp"),description:"Deprecated tags",amountNinja:0,amountTrainee:50,amountNovice:100},deprecatedAttributes:{elements:dn.body.find("[align], [alink], [background], [bgcolor], [border], [clear], [height], [hspace], [language], [link], [nowrap], [start], [text], [vlink], [vspace], [width]"),description:"Deprecated attributes",amountNinja:0,amountTrainee:100,amountNovice:200},iframeTags:{elements:dn.body.find("iframe"),description:"Iframe tags",amountNinja:0,amountTrainee:5,amountNovice:10},embedTags:{elements:dn.body.find("embed"),description:"Embed tags",amountNinja:0,amountTrainee:5,amountNovice:10},scaledImgTags:{elements:dn.body.find("img[width], img[height]"),description:"Scaled img tags",amountNinja:5,amountTrainee:10,amountNovice:20},conditionalComments:{elements:dn.code.match(/<!--\[.*?\]-->/g),description:"Conditional comments",amountNinja:20,amountTrainee:30,amountNovice:40},documentComments:{elements:dn.code.match(/<!--.*?-->/g),description:"Document comments",amountNinja:10,amountTrainee:20,amountNovice:30},emptyTags:{elements:dn.html.find(":empty").not("area, base, basefont, br, hr, iframe[src], img[src], input, link[rel], meta, param, script[src]"),description:"Empty tags",amountNinja:50,amountTrainee:100,amountNovice:250},emptyAltAttributes:{elements:dn.body.find('img[alt=""]'),description:"Empty alt attributes",amountNinja:0,amountTrainee:10,amountNovice:20},emptyHrefAttributes:{elements:dn.body.find('a[href=""]'),description:"Empty href attributes",amountNinja:0,amountTrainee:10,amountNovice:20},emptySrcAttributes:{elements:dn.body.find('iframe[src=""], img[src=""]'),description:"Empty src attributes",amountNinja:0,amountTrainee:5,amountNovice:10},visibleTags:{elements:dn.body.find(":visible"),description:"Visible tags",amountNinja:750,amountTrainee:1500,amountNovice:2e3},hiddenTags:{elements:dn.body.find(":hidden"),description:"Hidden tags",amountNinja:100,amountTrainee:200,amountNovice:500},displayRatio:{elements:"",description:"Display ratio",amountNinja:20,amountTrainee:40,amountNovice:60},hasIDTags:{elements:dn.body.find("[id]"),description:"Tags with ID",amountNinja:20,amountTrainee:40,amountNovice:60},duplicatedIDTags:{elements:[],description:"Tags with duplicated ID",amountNinja:0,amountTrainee:5,amountNovice:10},nestedIDTags:{elements:dn.body.find("[id] > [id]"),description:"Tags with nested ID",amountNinja:10,amountTrainee:20,amountNovice:30},deepNestedTags:{elements:dn.body.find("* > * > * > * > * > * > * > * > * > * > * > * > * > * > *"),description:"Deep nested tags",amountNinja:0,amountTrainee:20,amountNovice:50},styleTagsInline:{elements:dn.html.find("style"),description:"Inline style tags",amountNinja:5,amountTrainee:10,amountNovice:20},styleWrongPlace:{elements:dn.body.find("style"),description:"Style tag in body",amountNinja:5,amountTrainee:10,amountNovice:20},styleExternals:{elements:dn.html.find('link[rel="stylesheet"]').not(dn.elements.css),description:"External style files",amountNinja:5,amountTrainee:10,amountNovice:20},styleThirdParty:{elements:dn.html.find('link[rel="stylesheet"]').not('link[rel="stylesheet"][href*="'+dn.host+'"]').not(dn.elements.css),description:"Third Party styles",amountNinja:5,amountTrainee:10,amountNovice:20},styleAttributes:{elements:dn.html.find("[style]").not("div.js_dn_panel"),description:"Inline style attributes",amountNinja:0,amountTrainee:10,amountNovice:20},styleRules:{elements:"",description:"Style rules",amountNinja:500,amountTrainee:1e3,amountNovice:1250},styleSelectors:{elements:"",description:"Style selectors",amountNinja:750,amountTrainee:1250,amountNovice:1500},styleIDSelectors:{elements:"",description:"Styled ID selectors",amountNinja:0,amountTrainee:5,amountNovice:10},styleUniversalSelectors:{elements:"",description:"Universal selectors",amountNinja:0,amountTrainee:5,amountNovice:10},styleImportant:{elements:"",description:"Important in declarations",amountNinja:0,amountTrainee:5,amountNovice:10},scriptTagsInline:{elements:dn.html.find("script").not("[src]"),description:"Inline script tags",amountNinja:5,amountTrainee:10,amountNovice:20},scriptWrongPlace:{elements:dn.head.find("script"),description:"Script tags in head",amountNinja:5,amountTrainee:10,amountNovice:20},scriptExternals:{elements:dn.head.find("script[src]").not(dn.elements.js),description:"External script files",amountNinja:5,amountTrainee:10,amountNovice:20},scriptThirdParty:{elements:dn.html.find("script[src]").not('script[src*="'+dn.host+'"]').not(dn.elements.js),description:"Third Party scripts",amountNinja:5,amountTrainee:10,amountNovice:20},scriptAttributes:{elements:dn.html.find("[onabort], [onactivate], [onafterprint], [onafterupdate], [onbeforeactivate], [onbeforecopy], [onbeforecut], [onbeforedeactivate], [onbeforeeditfocus], [onbeforepaste], [onbeforeprint], [onbeforeunload], [onbeforeupdate], [onblur], [onbounce], [oncellchange], [onchange], [onclick], [oncontextmenu], [oncontrolselect], [oncopy], [oncut], [ondataavailable], [ondatasetchanged], [ondatasetcomplete], [ondblclick], [ondeactivate], [ondrag], [ondragend], [ondragenter], [ondragleave], [ondragover], [ondragstart], [ondrop], [onerror], [onerrorupdate], [onfilterchange], [onfinish], [onfocus], [onfocusin], [onfocusout], [onhelp], [onkeydown], [onkeypress], [onkeyup], [onlayoutcomplete], [onload], [onlosecapture], [onmousedown], [onmouseenter], [onmouseleave], [onmousemove], [onmouseout], [onmouseover], [onmouseup], [onmousewheel], [onmove], [onmoveend], [onmovestart], [onpaste], [onpropertychange], [onreadystatechange], [onreset], [onresize], [onresizeend], [onresizestart], [onrowenter], [onrowexit], [onrowsdelete], [onrowsinserted], [onscroll], [onselect], [onselectionchange], [onselectstart], [onstartonstop], [onsubmit], [onunload]"),description:"Inline script attributes",amountNinja:0,amountTrainee:10,amountNovice:20},scriptGlobals:{elements:[],description:"Script globals",amountNinja:20,amountTrainee:50,amountNovice:100}},dn.calcElementsAmount=function(){for(var a in dn.setup)dn.setup.hasOwnProperty(a)&&(dn.total++,dn.setup[a].amount=dn.setup[a].elements?dn.setup[a].elements.length:0)},dn.calcConditionalComments=function(){dn.setup.conditionalComments.amount&&(dn.setup.documentComments.amount=dn.setup.documentComments.amount-dn.setup.conditionalComments.amount)},dn.calcDisplayRatio=function(){dn.setup.visibleTags.amount&&dn.setup.hiddenTags.amount&&(dn.setup.displayRatio.amount=Math.round(100*(dn.setup.hiddenTags.amount/dn.setup.visibleTags.amount)))},dn.calcDuplicatedID=function(){dn.setup.hasIDTags.elements.each(function(){var a=c('[id="'+this.id+'"]'),b=a.length;b>1&&a[0]===this&&(dn.setup.duplicatedIDTags.elements.push(a),dn.setup.duplicatedIDTags.amount+=b)})},dn.calcStyleSheets=function(){for(var c=0;c<a.styleSheets.length;c++){var d=a.styleSheets[c];if(d&&(d.href&&d.href.match(b.location.hostname)||!d.href)&&d.cssRules){for(var e=0;e<d.cssRules.length;e++){var f=d.cssRules[e],g=f.selectorText,h=f.cssText;g&&(dn.setup.styleSelectors.amount+=g.split(",").length,g.match(/\*/g)&&dn.setup.styleUniversalSelectors.amount++,g.match(/\#/g)&&dn.setup.styleIDSelectors.amount++,h.match(/important/g)&&dn.setup.styleImportant.amount++)}dn.setup.styleRules.amount+=d.cssRules.length}}},dn.calcScriptGlobals=function(){for(var a in b)b.hasOwnProperty(a)&&(dn.setup.scriptGlobals.elements.push(a),dn.setup.scriptGlobals.amount++)},dn.destroyPanel=function(){dn.body.find("div.js_dn_panel").add(dn.elements.css).add(dn.elements.js).remove(),delete b.dn},dn.createPanel=function(){dn.panel=dn.panel||{},dn.panel.body=c('<div class="js_dn_panel dn_panel"></div>').prependTo(dn.body),dn.panel.title=c('<h1 class="js_dn_title_panel dn_title_panel" title="'+dn.version+'">'+dn.wording.title+"</h1>").appendTo(dn.panel.body),dn.panel.list=c('<ul class="js_dn_list_panel dn_list_panel"></ul>').appendTo(dn.panel.body),dn.html.add(dn.body).animate({scrollTop:0},dn.duration),dn.panel.title.click(function(){dn.destroyPanel()}),dn.panel.title.hover(function(){dn.panel.title.text(dn.wording.close)},function(){dn.panel.title.text(dn.wording.title)})},dn.createPanelItems=function(){var a="";for(var c in dn.setup)dn.setup.hasOwnProperty(c)&&(a+='<li class="dn_item_panel dn_amount_',dn.setup[c].amount<=dn.setup[c].amountNinja||dn.setup[c].amount===dn.setup[c].amountGeneral?(dn.score++,a+="ninja"):dn.setup[c].amount<=dn.setup[c].amountTrainee?(a+="trainee","object"==typeof b.console&&dn.setup[c].elements&&(b.console.warn(dn.setup[c].description),b.console.log(dn.setup[c].elements))):(a+="novice","object"==typeof b.console&&dn.setup[c].elements&&(b.console.warn(dn.setup[c].description),b.console.log(dn.setup[c].elements))),a+='" title="',a+=dn.setup[c].amountGeneral?"General: "+dn.setup[c].amountGeneral:"Ninja: "+dn.setup[c].amountNinja+" | Trainee: "+dn.setup[c].amountTrainee+" | Novice: "+dn.setup[c].amountNovice,a+='">'+dn.setup[c].description+": "+dn.setup[c].amount+"</li>");dn.panel.list.html(a)},dn.handleScore=function(){var a="";dn.score<0&&(dn.score=0),dn.type=dn.score>=dn.total-5?"ninja":dn.score>=dn.total-10?"trainee":"novice",a='<li class="dn_item_message dn_amount_'+dn.type+'" title="'+dn.wording.console+'">',a+='<span class="dn_score">'+dn.score+"/"+dn.total+'</span><span class="dn_message">'+dn.wording.message[dn.type]+"</span></li>",dn.panel.list.append(a),dn.panel.body.addClass("dn_score_"+dn.type)},dn.init=function(){dn.calcElementsAmount(),dn.calcConditionalComments(),dn.calcDisplayRatio(),dn.calcDuplicatedID(),dn.calcStyleSheets(),dn.calcScriptGlobals(),dn.createPanel(),dn.createPanelItems(),dn.handleScore(),dn.startup=!0},b.dn.startup||dn.init()})}(document,window,window.jQuery);