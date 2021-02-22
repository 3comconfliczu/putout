'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'convert-commonjs-to-esm/commons': convert,
});

test('plugin-convert-commonjs-to-esm: commons: report', (t) => {
    t.report('commons', '"__filename" and "__dirname" should be declared');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: transform', (t) => {
    t.transform('commons');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: no transform', (t) => {
    t.noTransformCode('const a = 5');
    t.end();
});

