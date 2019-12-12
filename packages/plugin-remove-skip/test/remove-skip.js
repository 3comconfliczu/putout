'use strict';

const removeSkip = require('..');
const test = require('@putout/test')(__dirname, {
    'remove-skip':  removeSkip,
});

test('plugin-remove-skip: report', (t) => {
    t.report('skip', '"test.skip" should not be used');
    t.end();
});

test('plugin-remove-skip: transform', (t) => {
    t.transform('skip');
    t.end();
});

test('plugin-remove-skip: transform', (t) => {
    t.transform('skip-skip');
    t.end();
});

