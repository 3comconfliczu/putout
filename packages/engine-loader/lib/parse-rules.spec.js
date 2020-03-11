'use strict';

const test = require('supertape');
const tryCatch = require('try-catch');

const parseRules = require('./parse-rules');

test('putout: loader: parse rules: not on/off', (t) => {
    const expected = 'hello: state option can be "on" or "off" only, when used as string, received: "abc"';
    const [error] = tryCatch(parseRules, {
        hello: 'abc',
    });
    
    t.equal(error.message, expected);
    t.end();
});

test('putout: loader: parse rules: two elements array', (t) => {
    const [error] = tryCatch(parseRules, {
        hello: ['on', {}],
    });
    
    t.equal(error, null);
    t.end();
});

test('putout: loader: parse rules: three elements array: custom message', (t) => {
    const [, result] = tryCatch(parseRules, {
        hello: ['on', 'hello', {
            a: 'b',
        }],
    });
    
    const expected = [{
        rule: 'hello',
        state: true,
        plugin: null,
        msg: 'hello',
        options: {
            a: 'b',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: loader: parse rules: not supported', (t) => {
    const [error] = tryCatch(parseRules, {
        hello: 1,
    });
    
    const expected = 'Rule format not supported 1: number';
    t.equal(error.message, expected);
    t.end();
});

