"use strict";

(function($) {
	var TextCounter = {
		init : function(element, options) {
			this.element = element;
			this.$element = $(element);
			this.options = $.extend({}, this._defaults, options);
			this._build();
			return this;
		},
		_defaults : {
			maxLength : 140,
			cssClass : "text-counter",
			message : "{charLeft} character(s) left of {maxLength}."
		},
		$textCounterElement : null,
		_build : function() {
			var that = this;
			this.$element.on("keyup keydown blur", function(e) {
				that.update();
			});
			this.$textCounterElement = $('<span/>').addClass(this.options.cssClass);
			this.$element.after(this.$textCounterElement);

			//update once
			this.update();
		},
		update : function() {
			var value = this.$element.val() ? this.$element.val() : "";
			var charUsed = value.length;
			var charLeft = this.options.maxLength - charUsed;
			if(charLeft < 0) {
				this.$element.val(value.substr(0, this.options.maxLength));
				charLeft = 0;
			}

			var message = "";
			if(typeof this.options.message === "function") {
				message = this.options.message(charLeft, this.options.maxLength);
			} else {
				message = this.options.message.replace("{charLeft}", charLeft).
				replace("{maxLength}", this.options.maxLength);
			}

			this.$textCounterElement.html(message);
		}
	};

	$.fn.mkcl = function(){
		var elements = this;

		return {
			textCounter : function(options) {
				return elements.each(function() {
					var textCounter = Object.create(TextCounter);
					textCounter.init(this, options);
					$.data(this, "textCounter", textCounter);
				});
			}
		}
	}
})(jQuery);