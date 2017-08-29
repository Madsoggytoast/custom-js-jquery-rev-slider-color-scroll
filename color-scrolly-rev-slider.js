/*
 * colorScroll - jQuery 
 * A jQuery plugin that transitions the background color, when the user scrolls.
 * by: Toast.
 *
 */

!function(o){"use strict";"function"==typeof define&&define.amd?define(["jquery"],o):o("object"==typeof exports?require("jquery"):jQuery)}(function(o){"use strict";function t(t,e){this.element=t,this.$element=o(t),this.options=o.extend({},l,e),this._defaults=l,this._name=s,this.init()}var s="colorScroll",e=window.document,r=o(e),i=o(window),n={UPDATE:"update.colorScroll"},l={colors:[{color:"#FFFFFF",position:"0%"},{color:"#000000",position:"100%"}],scrollElement:r,fauxScroll:!1,colorChange:void 0},c=function(){var o=e.createElement("div"),t=o.style;return t.cssText="background-color:rgba(150,255,150,.5)",(""+t.backgroundColor).indexOf("rgba")>-1}(),a=function(o){return function(t,s){return t[o]<s[o]?-1:t[o]>s[o]?1:0}},h=function(o,t,s){var e="rgb"+(c?"a":"")+"("+parseInt(o[0]+s*(t[0]-o[0]),10)+","+parseInt(o[1]+s*(t[1]-o[1]),10)+","+parseInt(o[2]+s*(t[2]-o[2]),10);return c&&(e+=","+(o&&t?parseFloat(o[3]+s*(t[3]-o[3])):1)),e+=")"},u=function(o){var t,s;return(t=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(o))?s=[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16),1]:(t=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(o))?s=[17*parseInt(t[1],16),17*parseInt(t[2],16),17*parseInt(t[3],16),1]:(t=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(o))?s=[parseInt(t[1],10),parseInt(t[2],10),parseInt(t[3],10),1]:(t=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(o))&&(s=[parseInt(t[1],10),parseInt(t[2],10),parseInt(t[3],10),parseFloat(t[4])]),s};t.prototype={colors:[],init:function(){this.setPositions(),this.currentColor=this.$element.css("background-color"),this.updateColor(),this.addListeners()},addListeners:function(){var t=this;this.options.scrollElement.on("scroll",o.proxy(this.updateColor,this)),i.on("debouncedresize",function(){t.setPositions(),t.updateColor()})},setPositions:function(){for(var o=r.height()-i.height(),t=[],s=0;s<this.options.colors.length;s++){var e={},n=this.options.colors[s].position;e.color=this.options.colors[s].color,"string"==typeof n?"%"===n.charAt(n.length-1)?e.position=Math.floor(parseFloat(n)*o/100):e.position=parseFloat(n):e.position=n,t.push(e)}t.sort(a("position")),this.colors=t},updateColor:function(){var o,t,s,e,i=r.scrollTop();if(i<=this.colors[0].position)this.setColor(this.colors[0].color);else if(i>=this.colors[this.colors.length-1].position)this.setColor(this.colors[this.colors.length-1].color);else{for(var n=0;n<this.colors.length;n++){if(!(i>=this.colors[n].position)){t=this.colors[n].position,e=this.colors[n].color;break}o=this.colors[n].position,s=this.colors[n].color}var l=(i-o)/(t-o),c=h(u(s),u(e),l);this.setColor(c)}},setColor:function(o){o!==this.currentColor&&(this.$element.css("background-color",o),this.currentColor=o,this.$element.trigger(n.UPDATE,{color:o}),this.options.colorChange&&this.options.colorChange(o))}},o.fn[s]=function(e){return this.each(function(){o.data(this,"plugin_"+s)||o.data(this,"plugin_"+s,new t(this,e))})}}),function(o){"use strict";var t,s,e=o.event;t=e.special.debouncedresize={setup:function(){o(this).on("resize",t.handler)},teardown:function(){o(this).off("resize",t.handler)},handler:function(o,r){var i=this,n=arguments,l=function(){o.type="debouncedresize",e.dispatch.apply(i,n)};s&&clearTimeout(s),r?l():s=setTimeout(l,t.threshold)},threshold:150}}(jQuery);


/* SET SCROLL COLORS BELOW AND COORDINATE THE PERCENTAGE TO MATCH */

jQuery('body, .tp-colorchange').colorScroll({
    colors: [{
        color: '#ffffff',
        position: '0%'
    }, {
        color: '#8EC640',
        position: '20%'
    }, {
        color: '##23BCBA',
        position: '40%'
    }, {
        color: '#6DCEF1',
        position: '60%'   
    }, {
        color: '#EA0A8C',
        position: '80%' 
    }, {
        color: '#F8C612',
        position: '100%'                    
    }]
});


/* THE MENU SCROLL */

function sliderAnchors() {

	var anchorarray = new Array;
		lastknowheaderheight = 0; //jQuery('').height();

	// Anchor and highlights
	jQuery('.tp-rs-menulink').each(function(i) {
		var a = jQuery(this),
			obj = new Object();

		obj.button = a;
		obj.href = a.attr("href");
		if(obj.href!=undefined){
			obj.fakehref = obj.href.replace("#","#!");

			if (obj.href!=undefined && obj.href.split("http").length<2 && obj.href!="#wp-toolbar") {
				obj.target = jQuery(obj.href);
				obj.offset = obj.target.data('offset') == undefined ? 0 : obj.target.data('offset');				
			}
			
			if (obj.target!=undefined && obj.target.length>0)
				anchorarray.push(obj);
		}
	});

	jQuery('.tp-rs-menulink').each(function(i) {
		var a = jQuery(this);
		a.click(function() {

			var obj = new Object(),
				ypos = 0;
				
				if (a.attr('href') != undefined) {
					obj.href = a.attr("href");
					obj.target = jQuery(obj.href);
					if (obj.href!=undefined && obj.target!=undefined && jQuery(obj.target).length>0) {

						
						//if (jQuery(this).hasClass("tp-rs-menu-selected")) return false;
						
						obj.offset = obj.target.data('offset') == undefined ? 0 : obj.target.data('offset');
						obj.top = jQuery(obj.target).offset().top;
						ypos = obj.top+obj.offset;
						var counter = {val:doctop};

							
						if (jQuery('body').data('currenscrollanim')!=undefined)
								jQuery('body').data('currenscrollanim').pause();				

						
						var sanim = punchgs.TweenLite.to(counter,1.5,{val:ypos,ease:punchgs.Power4.easeOut,
								onUpdate:function() {
									forcescrolled = true;									
									punchgs.TweenLite.set(jQuery('body, html'),{scrollTop:counter.val});
								},
								onComplete:function(){
									forcescrolled = false;
									jQuery(window).trigger("scroll.tprsmenu");
								}
						});

						forcescrolled = true;
						jQuery.each(anchorarray,function(index,o) {							
							if (obj.href!==o.href) {												
								o.button.removeClass("tp-rs-menu-selected");
							} else {								
								o.button.addClass("tp-rs-menu-selected");
								window.history.pushState('','',obj.href)
							}
						});
						

						jQuery('body').data('currenscrollanim',sanim);
						return false;
					} else {
						return true;
					}
				} else {
					return true;
				}			
		})
	});

}

sliderAnchors();