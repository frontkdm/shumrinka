$(function () {

  let body = $('body'),
    timer;

  function detectScroll(e) {
    var scroll = $(window).scrollTop();
    fixHeader(scroll);
    if ($(".section-image").length) shrinkImageSection(scroll);

    clearTimeout(timer);
    if (!body.has('disable-hover')) {
      body.addClass('disable-hover')
    }

    timer = setTimeout(function () {
      body.removeClass('disable-hover')
    }, 200);

    // console.log(scroll);

  }

  function fixHeader(scrollValue) {
    scrollValue > 0 ?
      $('.page-header').addClass('is-moving') :
      $('.page-header').removeClass('is-moving');
  }

  function shrinkImageSection(scrollValue) {
    const offset = $('.section-top-heading').offset().top - 100 - 30;


    if (scrollValue < offset && scrollValue !== 0) {
      $('.section-top-heading').css({
        'transform': `scale(${1 - (scrollValue / 700)})`
      });
      $(".section-image").get(0).style.setProperty("--section-opaticy", (scrollValue / 200));

    }
  }

  $('.btn-search').click(function () {
    $('.search-wrapper').addClass('show');
    body.addClass('noflow');
    $('#webpage').addClass('with-blur');
    setTimeout(function () {
      $('.search-input').focus();
    }, 400);
  });

  $('.close-search').click(function () {
    $('.search-wrapper').removeClass('show');
    body.removeClass('noflow');
    $('#webpage').removeClass('with-blur');
    $('.search-form').trigger('reset');
  })

  $(document).keyup(function (e) {
    if (e.key === 'Escape') {
      $('.search-wrapper').removeClass('show');
      body.removeClass('noflow');
      $('#webpage').removeClass('with-blur');
      $('.search-form').trigger('reset');
    }
  });

  $(window).scroll(detectScroll);
  detectScroll();

  const pageSlider = $('.page-slider');

  const indexSlider = $('.index-slider').slick({
    arrows: false,
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  const blogSlider = $('.blog-slider').slick({
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand'
  });

  const reviewSlider = $('.review-slider').slick({
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1
  })

  const catalogSlider = $('.catalog-slider').slick({
    arrows: false,
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  })

  const tourismSlider = $('.tourism-slider').slick({
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyload: 'ondemand'
  })

  $('.btn-slider').click(function () {
    const dir = $(this).data('dir');
    $(this).parent().siblings().slick(`slick${dir}`)
  });

  body.click(function (e) {
    const target = e.target.classList[0];

    if (target !== 'filter-label') $('.filter').removeClass('expanded');


  })

  $('.filter').click(function () {
    $('.filter').removeClass('expanded');
    $(this).addClass('expanded');
  })

  $('.filter-option').click(function () {
    const optionText = $(this).text();
    $(this).parent().siblings('.filter-label').text(optionText)
  })

  $('.btn-filter').click(function () {
    $('.btn-filter').removeClass('active');
    $(this).addClass('active');
  });

  $('.btn-faq').click(function () {
    $('.btn-faq').removeClass('active');
    $(this).addClass('active');

    const target = $(this).data('pointer');
    $('.faq-answers').removeClass('show');
    $(`[data-target="${target}"]`).addClass('show');
    console.log($(`[data-target="${target}"]`))

  })

  $('.faq-answer-top').click(function () {
    $(this).siblings().slideToggle(200);
    $(this).children('img').toggleClass('rotate');
  })

  $('.show-order').click(function () {
    body.addClass('noflow');
    $('.modal-wrapper').addClass('show');
    $('.modal-booking').addClass('show')
    setTimeout(function () {
      $('.modal-form').trigger('reset')
      $('.modal-form input[type="tel"]').focus()
    }, 200)
  });

  $('.show-how').click(function () {
    body.addClass('noflow');
    $('.modal-wrapper').addClass('show');

    const target = $(this).data('target');
    switch (target) {
      case 'how':
        $('.modal-how').addClass('show');
        break;
      case 'cancel':
        $('.modal-cancel').addClass('show');
        break;
      case 'transfer':
        $('.modal-transfer').addClass('show');
        break;
    }

    setTimeout(function () {
      $('.modal-form').trigger('reset')
      $('.modal-form input[type="tel"]').focus()
    }, 200)
  })

  $(document).click(function (e) {
    const target = e.target.classList[0];
    if (target === 'modal-wrapper') {
      body.removeClass('noflow');
      $('.modal-wrapper').removeClass('show');
      $('.modal').removeClass('show')
    }
    console.log(target);
  })

  $('.btn-close').click(function () {
    body.removeClass('noflow');
    $('.modal-wrapper').removeClass('show');
    $('.modal').removeClass('show')

  })

  $(document).keyup(function (e) {
    if (e.key === 'Escape') {
      $(this).removeClass('noflow');
      $('.modal-wrapper').removeClass('show');
      $('.modal').removeClass('show')
      $('.modal-form').trigger('reset');
    }
  })

  $('.subscription-form').submit(function (e) {
    e.preventDefault();
    body.addClass('noflow');
    $('.modal-wrapper').addClass('show');
    $('.modal-subscription').addClass('show')
  })

  const btnMobile = $('.btn-mobile');
  const headerMenu = $('.header-nav');

  btnMobile.click(function () {
    $(this).toggleClass('is-active');
    headerMenu.toggleClass('move-right');
    body.toggleClass('noflow');
  });

  $('.show-addresses').click(function () {
    $('.buyout-addresses ').toggleClass('move-left')
  });


});