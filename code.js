'use strict';

(function () {
  var
    A = _getRandomNumber(6, 9),
    SUM = _getRandomNumber(11, 14),
    B = SUM - A,
    MIN_MEASURE = 39;

  function _getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function _renderSum() {
    $('.js-summand-one').text(A);
    $('.js-summand-two').text(B);
    $('.js-sum').html('?');
  }

  function _showArrow($arrowWrapper, summand) {
    $arrowWrapper.removeClass('hidden');
    _setCoordinates($arrowWrapper.find('.js-arrow'), $arrowWrapper.find('.js-input-wrapper'), summand);
  }

  function _setCoordinates($arrow, $input, summand) {
    var
      LEFT_PADDING = 35,
      TOP_DISTANCE = 10,
      arrowWidth = summand * MIN_MEASURE,
      inputCenter = (arrowWidth - $input.width()) / 2,
      firstArrowWidth = A * MIN_MEASURE;

    $arrow.css({width: arrowWidth});

    if (!$('.js-first-arrow').hasClass('hidden')) {
      $input.css({left: LEFT_PADDING + inputCenter, top: -(TOP_DISTANCE + $arrow.height())});
    }

    if (!$('.js-second-arrow').hasClass('hidden')) {
      $arrow.css({left: LEFT_PADDING + firstArrowWidth});
      $input.css({left: LEFT_PADDING + firstArrowWidth + inputCenter, top: -(TOP_DISTANCE + $arrow.height())});
    }
  }

  function _validateNumber() {
    var
      key = event.which,
      num = $('.js-sum-number').length ? 1 : 0;

    if (!(key >= 48 && key <= 57) || $(this).val().length > num) {
      event.preventDefault();
    }
  }

  function _checkNumber() {
    var
      VALUES = {
        'js-summand-one': A,
        'js-summand-two': B,
        'js-sum': SUM
      },
      $input = $(this),
      inputValue = Number($input.val()),
      elementClass = $input.data('class'),
      isRightValue = inputValue === VALUES[elementClass];

    if (isRightValue) {
      $input.closest('.js-input-wrapper').html(inputValue);

      switch (VALUES[elementClass]) {
        case A:
          _showArrow($('.js-second-arrow'), B);
          break;
        case B:
          $('.js-sum').html($('<input />').addClass('number js-sum-number').attr({type: 'text'}).data('class', 'js-sum'));
          break;
      }
    }

    _showError(isRightValue, $input, elementClass !== 'js-sum' && $('.' + elementClass));
  }

  function _showError(condition, $input, $summand) {
    $input.toggleClass('error', !condition);
    $summand && $summand.toggleClass('highlighted', !condition);
  }

  function _listeners() {
    $(document)
      .on('keypress', '.js-number, .js-sum-number', _validateNumber)
      .on('input', '.js-number, .js-sum-number', _checkNumber);
  }

  _renderSum();
  _showArrow($('.js-first-arrow'), A);
  _listeners();
})();
