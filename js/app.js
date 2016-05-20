// $(document).foundation();
var firstSection;
var headerCached;
var navCached;
addOnReady(function(){
	// displayLoremIpsum();
	firstSection = document.getElementById("first-section");
	headerCached = $('.header');
	navCached = $('.nav');

	$('.nav-show').on('click',function(){
		$(this).toggleClass('dark');
		navCached.toggleClass('nav-visible');
	});

	$('.nav-item').on('click',function(){
		var targ = $('#'+$(this).attr('data-url'));
		animatedScrollTo(targ);
		$('.nav').removeClass('nav-visible');
	});
});

function addOnReady(fn){
	var last = window.onload;
	var isReady = true;

	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			console.log('DOM is loaded');
			isReady = false;
			fn();
		});
	}

	window.onload = function(){
		console.log('window is loaded');
		if(last) {
			last();
		}
		if(isReady) {
			fn();
		}
	};
}

// jQuery plug-in
(function($) {
    var uniqueCntr = 0;
    $.fn.scrolled = function (waitTime, fn) {
        if (typeof waitTime === "function") {
            fn = waitTime;
            waitTime = 200;
        }
        var tag = "scrollTimer" + uniqueCntr++;
        this.scroll(function () {
            var self = $(this);
            var timer = self.data(tag);
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                self.removeData(tag);
                fn.call(self[0]);
            }, waitTime);
            self.data(tag, timer);
        });
    }
})(jQuery);

$(window).scrolled(function() {
    var bottomHero = firstSection.getBoundingClientRect().bottom;
    if(bottomHero < 280){
    	headerCached.addClass('visible');
    	navCached.addClass('dark');
    	$('.nav-show').addClass('permaDark');
    } else {
    	headerCached.removeClass('visible');
    	navCached.removeClass('dark');
    	$('.nav-show').removeClass('permaDark');
    }
});

function animatedScrollTo(target){
    $('html, body').animate({
      scrollTop: target.offset().top - 68
    }, 1000);
}