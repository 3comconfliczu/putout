'use strict';

const test = require('@putout/test')(__dirname, {
    'cloudcmd/convert-io-write-to-io-create-directory': require('.'),
});

test('cloudcmd: convert-io-write-to-io-create-directory: report', (t) => {
    t.report('write', 'IO.createDirectory should be used instead of IO.write');
    t.end();
});

test('cloudcmd: convert-io-write-to-io-create-directory: transform', (t) => {
    t.transform('write');
    t.end();
});

test('cloudcmd: convert-io-write-to-io-create-directory: transform: str', (t) => {
    t.transform('write-str');
    t.end();
});

test('cloudcmd: convert-io-write-to-io-create-directory: transform: template', (t) => {
    t.transform('write-template');
    t.end();
});

test('cloudcmd: convert-io-write-to-io-create-directory: no transform: no suffix', (t) => {
    t.noTransform('no-suffix');
    t.end();
});

