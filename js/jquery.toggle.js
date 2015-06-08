;(function($) {

	'use strict';
	
	/**
	* toggles a panel when its toggler is clicked.
	* to link toggle and toggle panel:
	* give toggle class="js-toggle";
	* the panel gets two classes: one general class js-toggle-panel,
	* and one depending on its default state: js-toggle-panel--expanded or js-toggle-panel--collapsted
	* e.g. class="js-toggle-panel js-toggle-panel--expanded"
	* add another class "collapsed" or "expanded" to the toggle-panels for the initial state
	* by default, the plugin searches for a sibling of .js-toggle with class .js-toggle-panel
	* if you don't want that, give both the attribute data-toggle-panel-id with same value
	
	* @param {event} e The toggler's click event
	* @returns {undefinded}
	*/

	var toggleHandler = function(e) {
		e.preventDefault();
		var $toggle = $(e.currentTarget),
			panelId = $toggle.attr('data-toggle-panel-id'),
			$panel;

		if (panelId) {
			$panel = $('.js-toggle-panel[data-toggle-panel-id="'+panelId+'"], .js-toggle-panel[data-toggle-panel-id="'+panelId+'"]');
		} else {
			//no id; search for first sibling with class toggle-panel
			$panel = $toggle.parent().find('.js-toggle-panel').first();
		}

		if ($panel.length) {
			var useJS = $panel.is('[data-toggle-with-js]');
			if (useJS) {
				$panel.slideToggle('fast');
			}
			$panel.toggleClass('js-toggle-panel--collapsed js-toggle-panel--expanded');

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
		$(document).on('click', '.js-toggle', toggleHandler);
	};

	init();

})(jQuery);