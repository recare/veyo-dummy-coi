var prevUntil = {},
    nextUntil = {},
    calendarRow = $('.calendar--row'),
    calendarRowDays = $('.calendar--row--days'),
    calendarDetail = $('.calendar--detail--container'),
    calendarContainer = $('.calendar--container'),
    calDay = $('#day')[0],
    calDate = $('#date')[0],
    calWeekArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    thisDate = '',
    dateExtension = '',
    calendarItems = $('.calendar--container ul li');

// item interactions


// row interactions
calendarRow.on('click', function() {

  // store everything in vars
  prevUntil = $(this).prevUntil('.calendar--row--start');
  nextUntil = $(this).nextUntil('.calendar--row--end');

  // calendar fade-out
  $(this).removeClass().addClass('calendar--row fade-to-top');
  prevUntil.removeClass().addClass('calendar--row fade-to-top');
  nextUntil.removeClass().addClass('calendar--row fade-to-bottom');

  // detail fade-in
  calendarDetail.removeClass('fade-back-to-place').addClass('is-visible');

  $('.calendar--container h1').addClass('is-hidden');

  calendarContainer.css('z-index', '-1');

});

// detect flip end change card size
$('.face--back').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {

  console.log('stuff');

});

// on pressing send remove none class and add first message
$(document).keypress(function(e) {

  if (e.which == 13) {
    $('.calendar--detail--chat--send').click();
  }
});

var messageCount = 0;
$('.calendar--detail--chat--send').on('click', function() {

  var inputValue = $('input.calendar--detail--chat--input').val();

  if (messageCount === 0) {

    $('.calendar--detail--chat--content').empty();
    $('.calendar--detail--chat--input').attr('placeholder', '');
  }

  $('.calendar--detail--chat--content').removeClass('no-messages').addClass('has-messages');
  $('.calendar--detail--chat--content').append("<span class='animated fadeInUp'>" + inputValue + "</span><br>");

  $('input.calendar--detail--chat--input').val('');

  messageCount++;

  if (messageCount === 2) {

    $('.calendar--detail--job.not-typing').removeClass('not-typing').addClass('is-typing');

    setTimeout(function(){

      $('.calendar--detail--job.is-typing').removeClass('is-typing').addClass('not-typing');

      $('.calendar--detail--chat--content--response').removeClass('no-response').addClass('has-response');
      $('.calendar--detail--chat--content--response').append("<span class='animated fadeInUp'>" + "Hello Emma. Replenishing some vitamin C – good thinking!" + "</span><br>");
    }, 3200);
  }
});

// flip card
$('a.calendar--detail--chat').on('click', function(e) {

  $(this).fadeOut('fast');
  $('.calendar--detail--body').toggleClass('is-flipped');
});

$('button.reset').on('click', function() {

  calendarRow.removeClass('fade-to-top fade-to-bottom').addClass('fade-back-to-place');
  calendarRowDays.removeClass('fade-to-top fade-to-bottom').addClass('fade-back-to-place');
  $('.calendar--container h1').removeClass('is-hidden');

  calendarDetail.removeClass('is-visible').addClass('fade-back-to-place');

  calendarContainer.css('z-index', '100');

  $('.will--have--date').addClass('calendar--date__highlight');
});

$('.calendar--detail--brief').on('focusin', function() {

  $('.calendar--detail--body').addClass('is-focused');
});

$('.calendar--detail--brief').on('focusout', function() {

  $('.calendar--detail--body').removeClass('is-focused');
});

$('.highlight').on('click', function() {

  $('.calendar--container ul li').not('.notification--highlight').addClass('is-transparent');
});

// onboarding
$('.calendar--detail--partner').one('click', function() {

  $('ul.mock--dropdown').addClass('is-visible');
});

$('ul.mock--dropdown').on('click', function() {

  $('ul.mock--dropdown').removeClass('is-visible');
  $('.calendar--detail--partner').text('Tom Turbo')
  $('.calendar--detail--partner--avatar').addClass('has-icon').empty().append('<img src="img/tom_turbo.jpg">')
});

// search action
// tooltip shit
$.fn.tooltipster('setDefaults', {

  theme: 'tooltipster-veyo',
  animation: 'fall'
});

// init tooltip
$('.tooltip').tooltipster();

$('.search--submit').on('click', function() {

  var searchInputValue = $('.search--input').val();
  $('.search--form').fadeOut('slow', function() {

    $('body').addClass('results--in');
    $('.search--results').fadeIn('fast', function() {

      $('.tooltip').tooltipster('show', setTimeout(function(){

          $('.tooltip').tooltipster('hide');
        }, 5000));

      $('.search--results ul li').addClass('fadeInUp');
    });
  });

  $('.search--in--area').addClass('is-visible');
  $('.entered--zipcode').text(searchInputValue);
});

// editing postcode
$('.entered--zipcode').on('focusin', function() {
  $('.search--results ul').addClass('is-transparent');
});

$('.entered--zipcode').on('focusout', function() {
  $('.search--results ul').removeClass('is-transparent');
});

// view profile action
$('.view-profile.is-clickable').on('click', function() {

  window.scrollTo(0,0);

  $('.search--results').fadeOut('slow', function() {

    $('.search--results--profile').fadeIn('fast');
  });
});
