'use strict'

var test = require('tape')
var sriCli = require('..')

test('sri-cli', function (t) {
  t.plan(1)

  t.equal(sriCli(), false)
})
