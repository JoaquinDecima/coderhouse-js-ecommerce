window.onscroll = function() {
	var header_navbar = document.querySelector('.navbar-area');
	var sticky = header_navbar.offsetTop;
	if (window.pageYOffset > sticky) {
		header_navbar.classList.add('sticky');
	} else {
		header_navbar.classList.remove('sticky');
	}
};

let navbarToggler = document.querySelector('.navbar-toggler');

navbarToggler.addEventListener('click', function() {
	navbarToggler.classList.toggle('active');
});

//tns({
//	container: '.client-logo-carousel',
//	autoplay: true,
//	autoplayButtonOutput: false,
//	mouseDrag: true,
//	gutter: 15,
//	nav: false,
//	controls: false,
//	responsive: {
//		0: {
//			items: 1,
//		},
//		540: {
//			items: 2,
//		},
//		768: {
//			items: 3,
//		},
//		992: {
//			items: 4,
//		}
//	}
//});

var wow = new WOW();
wow.init();

//var cu = new counterUp({
//	start: 0,
//	duration: 2000,
//	intvalues: true,
//	interval: 100,
//});
//cu.start();

function scrollTo(element, to = 0, duration = 1000) {
	const start = element.scrollTop;
	const change = to - start;
	const increment = 20;
	let currentTime = 0;
	const animateScroll = (() => {
		currentTime += increment;
		const val = Math.easeInOutQuad(currentTime, start, change, duration);
		element.scrollTop = val;
		if (currentTime < duration) {
			setTimeout(animateScroll, increment);
		}
	});
	animateScroll();
}

Math.easeInOutQuad = function(t, b, c, d) {
	t /= d / 2;
	if (t < 1) return c / 2 * t * t + b;
	t--;
	return -c / 2 * (t * (t - 2) - 1) + b;
};

document.querySelector('.scroll-top').onclick = function() {
	scrollTo(document.documentElement);
};
