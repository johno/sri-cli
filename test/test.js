'use strict'

var fs = require('fs')
var test = require('tape')
var execSync = require('child_process').execSync

test('sri-cli', function (t) {
  t.plan(1)

  var stdout = execSync('./cli.js test/file.json', { }).toString().trim()

  t.strictEqual(stdout, '{"test/file.json":"sha256-fIvJdu/oeQ1giPKahw15mTvE0YngeoACfhWzpDBrlp4="}')
})

test('sri-cli with --json-out', function (t) {
  t.plan(1)

  execSync('./cli.js test/file.json --json-out=tmp.json')

  var content = fs.readFileSync('tmp.json', { encoding: 'utf8' });

  t.strictEqual(content, '{"test/file.json":"sha256-fIvJdu/oeQ1giPKahw15mTvE0YngeoACfhWzpDBrlp4="}')
  fs.unlinkSync('tmp.json')
})

test('sri-cli with different algorithm', function (t) {
  t.plan(1)

  var stdout = execSync('./cli.js test/file.json --algorithm=sha512').toString().trim()

  t.strictEqual(stdout, '{"test/file.json":"sha512-XosllZsuDzXtj60eEmGA9ZkUoappLi4sDJsCQIt/U5rUxMQ5f50q4V5w/MxYEoN2uFUb59iEhEm67mIkkTV2pg=="}')
})
