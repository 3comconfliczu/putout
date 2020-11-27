'use strict';

const test = require('@putout/test')(__dirname, {
    'set-lint-dot': require('.'),
});

test('madrun: set lint dot: report', (t) => {
    t.report('lint', '"lint" should check current directory');
    t.end();
});

test('madrun: set lint dot: transform', (t) => {
    t.transform('lint');
    t.end();
});

test('madrun: set lint dot: transform: template', (t) => {
    t.transform('lint-template');
    t.end();
});

test('madrun: set lint dot: transform: template: variables', (t) => {
    t.transform('template-variables');
    t.end();
});

test('madrun: set lint dot: no transform: function', (t) => {
    t.noTransform('lint-fn');
    t.end();
});

test('madrun: set lint dot: no transform: no lint', (t) => {
    t.noTransform('no-lint');
    t.end();
});

