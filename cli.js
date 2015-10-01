#!/usr/bin/env node

'use strict'

var fs = require('fs')
var meow = require('meow')
var glob = require('glob')
var sri = require('node-sri')
var isPresent = require('is-present')

var helpText = [
  'Usage',
  '  sri foo/bar.css',
  '  sri foo/**/*.(js|css) --json-out=sri-hashes.json',
  '  sri foo/**/*.js --algorithm=sha512 > sri-digest.json'
]

var cli = meow({
  help: helpText,
  h: helpText,
  pkg: './package.json'
})

var assetCache = {}
var assetGlob = cli.input[0]

if (isPresent(assetGlob)) {
  glob(assetGlob, function (err, files) {
    if (isPresent(err)) {
      console.log(err)
      process.exit(1)
    }

    if (!isPresent(files)) {
      console.log('No files matched ' + assetGlob)
      process.exit(1)
    }

    var currFile = 0
    var numFiles = files.length
    files.forEach(function (file) {
      currFile += 1

      sri.hash(file, function (err, hash) {
        if (isPresent(err)) {
          console.log(err)
          process.exit(1)
        }

        assetCache[file] = hash

        if (numFiles === currFile) {
          var assetCacheJson = JSON.stringify(assetCache)

          if (cli.flags.jsonOut) {
            fs.writeFileSync('./' + cli.flags.jsonOut, assetCacheJson)
          } else {
            console.log(assetCacheJson)
          }
        }
      })
    })
  })
}


if (cli.flags.h) {
  console.log(cli.help)
}
