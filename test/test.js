'use strict'

var fs = require('fs')
var test = require('tape')
var pathExists = require('path-exists')
var spawn = require('child_process').spawn

test('sri-cli', function (t) {
  t.plan(1)

  var cp = spawn('./cli.js', ['test/test.js'])

  cp.on('close', function () {
    t.assert(true)
  })
})

test('sri-cli with --json-out', function (t) {
  t.plan(1)

  var cp = spawn('./cli.js', ['test/test.js', '--json-out=tmp.json'])

  cp.on('close', function () {
    t.assert(pathExists.sync('tmp.json'))
    fs.unlink('tmp.json')
  })
})
