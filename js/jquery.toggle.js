;(function($) {

	'use strict';
	
	/**
	* toggles a panel when its toggle is clicked.
	* to link toggle and toggle panel:
	* give toggle two classes: one general class js-toggle;
	* and one depending on its panel's default state: js-toggle--is-expanded or js-toggle--collapsted
	* i.e. class="js-toggle js-toggle--is-collapsed" or class="js-toggle js-toggle--is-expanded"
	*
	* the panel also gets two classes: one general class js-toggle-panel,
	* and one depending on its default state: js-toggle-panel--is-expanded or js-toggle-panel--collapsted
	* i.e. class="js-toggle-panel js-toggle-panel--is-collapsed" or class="js-toggle-panel js-toggle-panel--is-expanded"
	* 
	* by default, the plugin searches for a sibling of .js-toggle with class .js-toggle-panel
	* if you don't want that, give both the toggle and the toggle-panel and attribute data-toggle-panel-id with same value
	* The plugin only toggles the classes. You'll have to use css to do the actual toggling
	* the jquery.toggle.css contains the most basic version (display: block/none)
	*/

	

	/**
	* do the toggle action
	* @param {jQuery object} $toggle The toggle to activate
	* @param {boolean} expand - Indicates if panel should expand
	* @returns {undefined}
	*/
	var toggle = function($toggle, expand) {
		var	panelId = $toggle.attr('data-toggle-panel-id'),
			$panel,
			$toggles = $toggle;// new var so we can group all toggles with same panel-id

		//check if we have to toggle a panel with id or a sibling
		if (panelId) {
			$panel = $('.js-toggle-panel[data-toggle-panel-id="'+panelId+'"]');
			$toggles = $('.js-toggle[data-toggle-panel-id="'+panelId+'"]');
		} else {
			//no id; search for first sibling with class toggle-panel
			$panel = $toggle.siblings('.js-toggle-panel').first();
		}

		if ($panel.length) {
			// toggle($toggles, $panel, expand);
			if (expand) {
				$panel.addClass('js-toggle-panel--is-expanded');
				$panel.removeClass('js-toggle-panel--is-collapsed');
				$toggles.addClass('js-toggle--is-expanded');
				$toggles.removeClass('js-toggle--is-collapsed');
			}else {
				$panel.addClass('js-toggle-panel--is-collapsed');
				$panel.removeClass('js-toggle-panel--is-expanded');
				$toggles.addClass('js-toggle--is-collapsed');
				$toggles.removeClass('js-toggle--is-expanded');
			}

			// check if linked panels in group need to be collapsed
			if (expand) {
				var toggleGroup = $toggle.attr('data-toggle-group');
				if (toggleGroup) {
					var $expandedGroupMembers = $('.js-toggle--is-expanded[data-toggle-group="'+toggleGroup+'"]').not('[data-toggle-panel-id="' + panelId + '"]');
					$expandedGroupMembers.each(function() {
						toggle($(this), false);
					});
				}
			}
		}
	};
	

	/**
	* @param {event} e The toggler's click event
	* @returns {undefinded}
	*/
	var toggleHandler = function(e) {
		e.preventDefault();
		var $toggle = $(e.currentTarget),
			expand = ($toggle.is('.js-toggle--is-collapsed'));//if it's collapsed now, we need to expand

		toggle($toggle, expand);
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