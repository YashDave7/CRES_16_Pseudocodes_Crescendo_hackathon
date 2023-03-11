// Smooth scrolling for anchor links
$('a[href*="#"]').on('click', function (e) {
    e.preventDefault();

    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 600, 'linear');
});

// Testimonials carousel
$('.testimonial-carousel').slick({
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    fade: true,
    cssEase: 'linear'
});

// Scroll reveal animations
ScrollReveal().reveal('.hero-section', { delay: 200, duration: 800 });
ScrollReveal().reveal('.services-section', { delay: 200, duration: 800 });
ScrollReveal().reveal('.testimonial-section', { delay: 200, duration: 800 });
