'use strict';

const test = require('@putout/test')(__dirname, {
    'apply-top-level-await': require('..'),
});

test('plugin-apply-top-level-await: transform: report', (t) => {
    t.report('esm', 'Top-level-await should be used');
    t.end();
});

test('plugin-apply-top-level-await: transform: object', (t) => {
    t.transform('esm');
    t.end();
});

test('plugin-apply-top-level-await: transform: export', (t) => {
    t.transform('export');
    t.end();
});

test('plugin-apply-top-level-await: transform: export-default', (t) => {
    t.transform('export-default');
    t.end();
});

test('plugin-apply-top-level-await: no transform: no esm', (t) => {
    t.noTransform('not-esm');
    t.end();
});

test('plugin-apply-top-level-await: no transform: id', (t) => {
    t.noTransform('id');
    t.end();
});

test('plugin-apply-top-level-await: no transform: params', (t) => {
    t.noTransform('params');
    t.end();
});
