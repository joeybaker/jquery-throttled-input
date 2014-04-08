// shamelessly stolen from: https://gist.github.com/josh/9633997
'use strict';

var $ = require('jquery')
  , setup, teardown

setup = function setup(){
  var delay = 100
    , inputed = false
    , keypressed = false
    , timer
    , schedule

  schedule = function schedule(target){
    if (timer) clearTimeout(timer)

    timer = setTimeout(function(){
      var throttledEvent = new $.Event('throttled:input', {
        target: target
      })

      $.event.trigger(throttledEvent, null, this, true)
    }.bind(this), delay)
  }

  $(this).on('keydown.throttledInput', function(){
    if (!keypressed) inputed = false

    keypressed = true

    if (timer) clearTimeout(timer)
  })

  $(this).on('keyup.throttledInput', function(e){
    keypressed = false

    if (inputed) schedule(e.target)

    inputed = false
  })

  $(this).on('input.throttledInput', function(e){
    inputed = true

    if (!keypressed) schedule(e.target)
  })
}

teardown = function teardown(){
  $(this).off('keydown.throttledInput')
  $(this).off('keyup.throttledInput')
  $(this).off('input.throttledInput')
}

module.exports = $.event.special['throttled:input'] = {
  setup: setup
  , teardown: teardown
}
