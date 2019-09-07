'use strict';

const test = require('@putout/test')(__dirname, {
    'add-fix-lint': require('.'),
});

test('madrun: add fix:lint: report', (t) => {
    t.report('lint', 'fix:lint should exist');
    t.end();
});

test('madrun: add fix:lint: transform: string', (t) => {
    t.transform('lint');
    t.end();
});

test('madrun: add fix:lint: transform: exists', (t) => {
    t.noTransform('exists');
    t.end();
});

