(function (jQuery) {
    "use strict";


    var win = jQuery(window);

    /*--
        Menu Sticky
    -----------------------------------*/
    var sticky = jQuery('.sticky');
    win.on('scroll', function () {
        var scroll = win.scrollTop();
        if (scroll < 245) {
            sticky.removeClass('stick');
        } else {
            sticky.addClass('stick');
        }
    });
    /*--
        One Page Menu
    -----------------------------------*/
    var TopOffsetId = jQuery('.onepage-nav').height() - 20;
    jQuery('.onepage-nav nav').onePageNav({
        currentClass: 'active',
        scrollThreshold: 0.2,
        scrollSpeed: 1000,
        scrollOffset: TopOffsetId,
    });
    /*--
        One Page Menu Open & Close Icon
    -----------------------------------*/
    var navCollapse = jQuery('.navbar-collapse');
    jQuery('.navbar-collapse ul li a').on('click', function () {
        if (navCollapse.hasClass('in')) {
            navCollapse.css('height', '1px').removeClass('in');
            jQuery('.navbar-toggle').addClass('collapsed');
        }
    })
    /*--
        Menu Toggle
    -----------------------------------*/
    var menuToggle = jQuery('.menu-toggle');
    var menuNav = jQuery('.main-menu nav');
    menuToggle.on('click', function () {
        if (menuToggle.hasClass('is-active')) {
            menuNav.removeClass('menu-open');
        } else {
            menuNav.addClass('menu-open');
        }
    });
    /*--
        Mean Mobile Menu
    ------------------------*/
    jQuery('.mean-menu nav').meanmenu({
        meanScreenWidth: '990',
        meanMenuContainer: '.mobile-menu',
        meanMenuClose: '<i class="icofont icofont-close"></i>',
        meanMenuOpen: '<i class="icofont icofont-navigation-menu"></i>',
        meanRevealPosition: 'right',
        meanMenuCloseSize: '30px',
        onePage: true,
    });
    /*--
        Hero Slider
    -----------------------------------*/
    jQuery('#hero-slider').nivoSlider({
        animSpeed: 500,
        slices: 18,
        pauseTime: 55557000,
        pauseOnHover: true,
        controlNav: true,
        prevText: '<i class="icofont icofont-long-arrow-left"></i>',
        nextText: '<i class="icofont icofont-long-arrow-right"></i>',
        afterChange: function () {
            var date = jQuery('.nivo-caption .date-picker');
            date.datepicker();
            var select = jQuery('.nivo-caption .cusselect');
            select.selectpicker();
        },
        afterLoad: function () {
            var select = jQuery('.nivo-caption .cusselect');
            select.selectpicker();
        },
    });
    /*--
        Date Picker
    -----------------------------------*/
    var datePicker = jQuery('.date-picker');
    datePicker.datepicker();
    /*--
        Select Picker
    -----------------------------------*/
    var selectPicker = jQuery('.cus-select');
    selectPicker.selectpicker();
    /*--
        Counter UP
    -----------------------------------*/
    var counter = jQuery('.counter');
    counter.counterUp({
        time: 3000,
    });
    /*--
        Scroll Up
    -----------------------------------*/
    jQuery.scrollUp({
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade',
        scrollText: '<i class="icofont icofont-simple-up"></i>',
    });
    /*--
        Magnific Popup
    -----------------------------------*/
    /*-- Video --*/
    var videoPopup = jQuery('.video-popup');
    videoPopup.magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        zoom: {
            enabled: true,
        }
    });
    /*-- Image --*/
    var imagePopup = jQuery('.image-popup');
    imagePopup.magnificPopup({
        type: 'image',
    });
    /*-- Gallery --*/
    var galleryPopup = jQuery('.gallery-popup');
    galleryPopup.magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    /*--
        Isotop with ImagesLoaded
    -----------------------------------*/
    var galleryFilter = jQuery('.gallery-filter');
    var galleryGrid = jQuery('.gallery-grid');
    /*-- Images Loaded --*/
    galleryGrid.imagesLoaded(function () {
        /*-- Filter List --*/
        galleryFilter.on('click', 'button', function () {
            galleryFilter.find('button').removeClass('active');
            jQuery(this).addClass('active');
            var filterValue = jQuery(this).attr('data-filter');
            galleryGrid.isotope({
                filter: filterValue
            });
        });
        /*-- Filter Grid --*/
        galleryGrid.isotope({
            itemSelector: '.gallery-item',
            masonry: {
                columnWidth: '.gallery-item',
            }
        });

    });
    /*--
        Testimonial Slider
    -----------------------------------*/
    /*-- Image Slider --*/
    var tiSlider = jQuery('.ti-slider');
    tiSlider.slick({
        arrows: false,
        asNavFor: '.tc-slider',
        centerMode: true,
        centerPadding: '225px',
        slidesToShow: 1,
        responsive: [{
                breakpoint: 1150,
                settings: {
                    centerPadding: '190px',
                }
            },
            {
                breakpoint: 990,
                settings: {
                    centerPadding: '210px',
                }
            },
            {
                breakpoint: 600,
                settings: {
                    centerPadding: '50px',
                }
            },
            {
                breakpoint: 350,
                settings: {
                    centerPadding: '20px',
                }
            }
        ]
    });
    /*-- Text Slider --*/
    var tcSlider = jQuery('.tc-slider');
    tcSlider.slick({
        arrows: false,
        asNavFor: '.ti-slider',
        slidesToShow: 1,
    });
    /*-- Text Slider Preview --*/
    var tsPrev = jQuery('.ts-prev');
    tsPrev.on('click', function () {
        tcSlider.slick('slickPrev');
    })
    /*-- Text Slider Nex --*/
    var tsNext = jQuery('.ts-next');
    tsNext.on('click', function () {
        tcSlider.slick('slickNext');
    })
    /*--
        Background Slideshow
    -----------------------------------*/
    var slideshowBG = jQuery('.slideshow-bg');
    slideshowBG.backstretch([
        'img/slider/1.jpg',
        'img/slider/4.jpg',
        'img/slider/3.jpg',
    ], {
        fade: 750,
        duration: 3000
    });
    /*--
        Kenburnsy Slideshow
    -----------------------------------*/
    var kenburneBG = jQuery('.kenburne-slideshow');
    kenburneBG.kenburnsy({
        fullscreen: true
    });
    /*----------------------------
    youtube video
    ------------------------------ */
    var youtubeVideoBG = jQuery('.youtube-video');
    youtubeVideoBG.YTPlayer({
        containment: '.youtube-video',
        autoPlay: true,
        loop: true,
    });






    /*--
        Textillate
    -----------------------------------*/
    jQuery('.tlt').textillate({
        loop: true,
    });
    /*--
        Wow js
    -----------------------------------*/
    new WOW().init();
    /*--
        Hamburger js
    -----------------------------------*/
    var forEach = function (t, o, r) {
        if ('[object Object]' === Object.prototype.toString.call(t))
            for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
        else
            for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t)
    };

    var hamburgers = document.querySelectorAll(".hamburger");
    if (hamburgers.length > 0) {
        forEach(hamburgers, function (hamburger) {
            hamburger.addEventListener('click', function () {
                this.classList.toggle('is-active');
            }, false);
        });
    }




})(jQuery);