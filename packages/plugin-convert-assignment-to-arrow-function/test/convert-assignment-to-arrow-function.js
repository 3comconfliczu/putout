'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-assignment-to-arrow-function': require('..'),
});

test('plugin-convert-assignment-to-arrow-function: report', (t) => {
    t.report('assignment', 'Expected ArrowFunction instead of Assignment');
    t.end();
});

test('plugin-convert-assignment-to-arrow-function: transform', (t) => {
    t.transform('assignment');
    t.end();
});

test('plugin-convert-assignment-to-arrow-function: no transform: variable', (t) => {
    t.noTransform('variable');
    t.end();
});

test('plugin-convert-assignment-to-arrow-function: no transform: member-expression', (t) => {
    t.noTransform('member-expression');
    t.end();
});
