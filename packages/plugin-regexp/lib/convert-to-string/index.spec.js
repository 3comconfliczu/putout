'use strict';

const test = require('@putout/test')(__dirname, {
    'regexp/convert-to-string': require('.'),
});

test('plugin-regexp/convert-to-string: report', (t) => {
    t.report('replace', 'String should be used instead of RegExp');
    t.end();
});

test('plugin-regexp/convert-to-string: transform', (t) => {
    t.transform('replace');
    t.end();
});

test('plugin-regexp/convert-to-string: transform', (t) => {
    t.transform('replace-all');
    t.end();
});

test('plugin-regexp/convert-to-string: no transform: flags', (t) => {
    t.noTransform('replace-all-flags');
    t.end();
});

test('plugin-regexp/convert-to-string: no transform: replace with flags', (t) => {
    t.noTransform('replace-flags');
    t.end();
});

test('plugin-regexp/simplify: disjunction', (t) => {
    t.noTransform('disjunction');
    t.end();
});

