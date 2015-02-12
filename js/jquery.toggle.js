;(function($) {

	'use strict';
	
	/**
	* toggles a panel when its toggler is clicked.
	* to link toggle and toggle panel:
	* give toggle class="toggle", panel class="toggle-panel"
	* add another class "collapsed" or "expanded" to the togglePanels for the initial state
	* by default, the plugin searches for a sibling of .toggle with class .togglePanel
	* if you don't want that, give both the attribute data-toggle-panel-id with same value
	* when no data-toggle-panel-id attribute is present,
	
	* @param {event} e The toggler's click event
	* @returns {undefinded}
	*/

	var toggleHandler = function(e) {
		console.log('handle');
		e.preventDefault();
		var $toggle = $(e.currentTarget),
			panelId = $toggle.attr('data-toggle-panel-id'),
			$panel;

		if (panelId) {
			$panel = $('.toggle-panel[data-toggle-panel-id="'+panelId+'"], .toggle-panel[data-toggle-panel-id="'+panelId+'"]');
		} else {
			//no id; search for first sibling with class togglePanel
			$panel = $toggle.parent().find('.toggle-panel').first();
		}
		console.log('len:',$panel.length);

		if ($panel.length) {
			var useJS = $panel.is('[data-toggle-with-js]');
			if (useJS) {
				$panel.slideToggle('fast');
			}
			$panel.toggleClass('collapsed expanded');

			//toggle title or linktext
			if ($toggle.attr('data-toggle-text')) {
				var tt = $toggle.attr('data-toggle-text');
				if ($toggle.attr('title')) {
					$toggle.attr('data-toggle-text', $toggle.attr('title'))
							.attr('title', tt);
				} else {
					//replace the linktext
					$toggle.attr('data-toggle-text', $toggle.text())
						.text(tt);
				}
			}

			$toggle.toggleClass('collapsed expanded');
		}
	};


	/**
	* initializes toggling behaviour on elements with class toggler
	* @returns {undefinded}
	*/
	var init = function() {
		$(document).on('click', '.toggle', toggleHandler);
	};

	init();

})(jQuery);