'use strict';

const test = require('@putout/test')(__dirname, {
    'browserlist/remove-node-versions': require('..'),
});

test('plugin-browserlist: remove-node-versions: report', (t) => {
    t.report('browserlist', 'remove node from .browserlist');
});

test('plugin-browserlist: remove-node-versions: transform', (t) => {
    t.transform('browserlist');
    t.end();
});

test('plugin-browserlist: no transform: absent', (t) => {
    t.noTransform('absent');
    t.end();
});

test('plugin-browserlist: no transform: no browser', (t) => {
    t.noTransform('no-browser');
    t.end();
});
