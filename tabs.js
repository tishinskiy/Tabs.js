;'use strict'

;(function(){

	$.fn.createTabs = function(options){

		var block = $(this);
		var active;
		var index = 0;

		var defaults = {
			actions: {}
		}

		var options = $.extend({}, defaults, options);


		var tabSelect = function(obj, rel){
				// console.log(rel);

			obj.addClass('tab-head__active');
			if (block.find($('.tab-content#'+rel)).length) {
				block.find($('.tab-content')).hide();
				block.find($('.tab-content#'+rel)).fadeIn('fast');
			}

			if('ALL' in options.actions) {
				options.actions.ALL();
			}

			if(rel in options.actions) {
				eval('options.actions.'+rel+'()');
			}

		}

		if (block.find('.tab-head__active').length) {
			active = block.find('.tab-head__active > a').attr('rel');
			index = block.find('.tab-head__active').index();
		}

		else {
			active = block.find('.tab-head:eq(0) > a').attr('rel');
			index = 0;
		}

		tabSelect(block.find($('.tab-head')).eq(index), active);


		block.find('.tab-head > a').click(function(){

			var rel = $(this).attr('rel');
			var th = $(this).closest('.tab-head');
			
			block.find('.tab-head').each(function(){

				if ($(this).index() != th.index()) {
					if ($(this).hasClass('tab-head__active')) {
						$(this).removeClass('tab-head__active');
					}
				}
				else {
					if (!$(this).hasClass('tab-head__active')) {
						tabSelect($(this), rel);
					}
				}
			})
		});
	}

})();