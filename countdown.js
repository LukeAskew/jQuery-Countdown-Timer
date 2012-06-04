/*!
 * jQuery Countdown Timer
 * @author Luke Askew <laskew@resource.com>
 * @version 1.0.0
 */
;(function($, window, undefined) {

    "use strict";

    var plugin_name = 'countdown',
        document = window.document;


    // The  plugin constructor
    var Timer = function(element, to_date) {

        var self = this;
        
        self.expired = false;
        
        self.calculate = function() {
						
			// do math to calculate time remaining
			var end_time = new Date(to_date),
				parsed_end_time = (end_time.getTime() / 1000);
			
			// Use UTC
			var now = new Date(),
				local_offset = now.getTimezoneOffset() * 60000,
				parsed_now = ( (now.getTime() + local_offset) / 1000);
						
			var time_left = parsed_end_time - parsed_now;
          
			var hours = Math.floor( time_left / 3600 ),
				minutes = Math.floor( (time_left - (hours * 3600)) / 60 ),
				seconds = Math.floor( (time_left - (hours * 3600) - (minutes * 60)) );
			
			if (hours < 10) { hours = "0" + hours; }
			if (hours < 100) { hours = "0" + hours; }
			if (minutes < 10) { minutes = "0" + minutes; }
			if (seconds < 10) { seconds = "0" + seconds; }
			
			
			hours = hours.toString().split('');
			minutes = minutes.toString().split('');
			seconds = seconds.toString().split('');
			
			// Catch if the time has expired
			if (seconds < 1 || hours[1] === '-') {
				$(element).hide();
				self.expired = true;
			}
			
			if (self.expired) { return; }
			
									
			$(self.hours).html('<span>'+ hours[0] +'</span><span>'+ hours[1] +'</span><span>'+ hours[2] +'</span>');
			$(self.minutes).html('<span>'+ minutes[0] +'</span><span>'+ minutes[1] +'</span>');
			$(self.seconds).html('<span>'+ seconds[0] +'</span><span>'+ seconds[1] +'</span>');

        }, 
        
        self.update = function() {

            // create interval
            (function async_timer() {

                // Calculate
                self.calculate();
				
				if (!self.expired) {
					// Call self every second
					setTimeout(async_timer, 1 * 1000);
					
				}
				
                
            }());

        }, 
        
        self.create = function() {
			
			self.days = $('.days', element);
			self.hours = $('.hours', element);
			self.minutes = $('.minutes', element);
			self.seconds = $('.seconds', element);
			
			// run update
			self.update();

        };

        self.create();

    };



    $.fn[plugin_name] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + plugin_name)) {
                $.data(this, 'plugin_' + plugin_name, new Timer(this, options));
            }
        });
    };

}(jQuery, window));