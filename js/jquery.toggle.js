;(function($) {

	'use strict';
	
	/**
	* toggles a panel when its toggler is clicked.
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
	* the jquery.toggle.js contains the most basic version (display: block/none)
	*/

	
	/**
	* toggle the toggle's title-attribute or linktext
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var toggleText = function($toggle) {
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
	};


	/**
	* 
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var toggle = function($toggles, $panel) {
		$panel.toggleClass('js-toggle-panel--is-collapsed js-toggle-panel--is-expanded');
		$toggles.toggleClass('js-toggle--is-collapsed js-toggle--is-expanded');
		toggleText($toggles);
	};


	/**
	* initialize toggle action
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var initToggle = function($toggle, expand) {
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
			toggle($toggles, $panel, expand);

			// check if linked panels in group need to be collapsed
			if (expand) {
				var toggleGroup = $toggle.attr('data-toggle-group');
				if (toggleGroup) {
					var $expandedGroupMembers = $('.js-toggle--is-expanded[data-toggle-group="'+toggleGroup+'"]').not($toggle);
					$expandedGroupMembers.each(function() {
						initToggle($(this), false);
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

		initToggle($toggle, expand);
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