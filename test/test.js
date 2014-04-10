'use strict';

var lab = require('lab')
  , describe = lab.experiment
  , it = lab.test
  , expect = lab.expect
  , plugin = require('../index.js')

describe('jquery-throttled-input', function(){
  it('exports a setup method', function(){
    expect(plugin.setup).to.exist
    expect(plugin.setup).to.be.a('function')
  })
})
