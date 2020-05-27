'use strict';

const test = require('supertape');
const {
    parseTemplate,
    isNameStr,
    isObjectStr,
    isArrayStr,
    isAnyStr,
} = require('./is');

test('compare: is: parseTemplate: program', (t) => {
    const [node] = parseTemplate('const t = "hi"', {
        program: true,
    });
    
    t.equal(node.type, 'Program');
    t.end();
});

test('compare: is: isNameStr: no', (t) => {
    const result = isNameStr('hello');
    
    t.notOk(result);
    t.end();
});

test('compare: is: isNameStr: yes', (t) => {
    const result = isNameStr('__a');
    
    t.ok(result);
    t.end();
});

test('compare: is: isObjectStr: no', (t) => {
    const result = isObjectStr('hello');
    
    t.notOk(result);
    t.end();
});

test('compare: is: isObjectStr', (t) => {
    const result = isObjectStr('__object');
    
    t.ok(result);
    t.end();
});

test('compare: is: isArrayStr', (t) => {
    const result = isArrayStr('__array');
    
    t.ok(result);
    t.end();
});

test('compare: is: isAnyStr', (t) => {
    const result = isAnyStr('__');
    
    t.ok(result);
    t.end();
});

