'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-await': require('..'),
});

test('plugin-remove-useless-await: report', (t) => {
    t.report('await-await', 'Useless await should be avoided');
    t.end();
});

test('plugin-remove-useless-await: transform', (t) => {
    t.transform('await-await');
    t.end();
});

test('plugin-remove-useless-await: transform: not async', (t) => {
    t.transform('not-async');
    t.end();
});

test('plugin-remove-useless-await: transform: no call', (t) => {
    t.noTransform('no-call');
    t.end();
});

test('plugin-remove-useless-await: transform: no declaration', (t) => {
    t.noTransform('no-declaration');
    t.end();
});

test('plugin-remove-useless-await: transform: not fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('plugin-remove-useless-await: transform: callee not identifier', (t) => {
    t.noTransform('callee-not-identifier');
    t.end();
});

test('plugin-remove-useless-await: transform: type-promise', (t) => {
    t.transform('type-promise');
    t.end();
});

