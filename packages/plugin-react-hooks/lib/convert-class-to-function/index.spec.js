'use strict';

/* eslint node/no-unpublished-require:0 */
const test = require('@putout/test')(__dirname, {
    'convert-class-to-function': require('.'),
});

test('plugin-react-hooks: convert-class-to-function: report', (t) => {
    t.report('class', 'class FormLoginContainer should be a function');
    t.end();
});

test('plugin-react-hooks: convert-class-to-function: transform', (t) => {
    t.transform('class');
    t.end();
});

