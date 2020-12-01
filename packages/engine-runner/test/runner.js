'use strict';

const test = require('supertape');
const putout = require('putout');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');
const {reRequire, stopAll} = mockRequire;

const {readFixtures} = require('./fixture');
const {runPlugins} = require('..');

const fixture = readFixtures([
    'import',
    'no-parent',
    'shebang',
    'shebang-fix',
    'babel',
    'babel-fix',
    'debug',
]);

test('putout: runner: run plugins', (t) => {
    const result = putout(fixture.import, {
        runPlugins,
        plugins: [
            'remove-unused-variables',
            'remove-empty',
        ],
    });
    
    const expected = '\n';
    
    t.deepEqual(result.code, expected, 'should equal');
    t.end();
});

test('putout: runner: run plugins: disable, using "off"', (t) => {
    const result = putout(fixture.import, {
        runPlugins,
        rules: {
            'remove-unused-variables': 'off',
            'remove-empty': 'off',
        },
        plugins: [
            'remove-unused-variables',
            'remove-empty',
        ],
    });
    
    const expected = fixture.import;
    
    t.deepEqual(result.code, expected, 'should equal');
    t.end();
});

test('putout: runner: filter: options', (t) => {
    const addVar = {
        report: () => '',
        fix: stub(),
        include: () => [
            'debugger',
        ],
        filter: (path, {options}) => {
            return options.ok;
        },
    };
    
    const code = 'debugger';
    
    const {places} = putout(code, {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
        rules: {
            'add-variable': ['on', {
                ok: true,
            }],
        },
    });
    
    const expected = [{
        rule: 'add-variable',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: runner: filter: options: no filter call', (t) => {
    const addVar = {
        report: () => '',
        fix: stub(),
        include: () => [
            'debugger',
        ],
        filter: (path, {options}) => {
            return options.ok;
        },
    };
    
    const code = 'debugger';
    
    const {places} = putout(code, {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
        rules: {
            'add-variable': ['on', {
                ok: false,
            }],
        },
    });
    
    const expected = [];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            debugger: 'const a = 1',
        }),
    };
    
    const {code} = putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = 'const a = 1;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace: a couple', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            'debugger': 'const a = 1',
            'var x = 1': 'const x = 1',
        }),
    };
    
    const {code} = putout('var x = 1', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = 'const x = 1;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace: remove', (t) => {
    const rmDebugger = {
        report: () => '',
        replace: () => ({
            debugger: '',
        }),
    };
    
    const {code} = putout('debugger', {
        runPlugins,
        plugins: [{
            'rm-debugger': rmDebugger,
        }],
    });
    
    const expected = '';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace: remove: exclude', (t) => {
    const rmDebugger = {
        report: () => '',
        replace: () => ({
            debugger: '',
        }),
    };
    
    const {code} = putout('debugger', {
        runPlugins,
        rules: {
            'rm-debugger': ['on', {
                exclude: 'debugger',
            }],
        },
        plugins: [{
            'rm-debugger': rmDebugger,
        }],
    });
    
    const expected = 'debugger';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace: template', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'var __a = __b': 'const __a = __b',
        }),
    };
    
    const {code} = putout('var hello = 5', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const hello = 5;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace: template: a couple vars', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const __a = __b': 'const __b = __a',
            'debugger': '',
        }),
    };
    
    const {code} = putout('debugger; const hello = world', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const world = hello;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace: template: array', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const __a = __b[0]': 'const [__a] = __b',
        }),
    };
    
    const {code} = putout('const first = elements[0]', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const [first] = elements;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace: template: identifier', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            '!!__a': '__a',
        }),
    };
    
    const {code} = putout('if (!!y) fn()', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'if (y) fn()';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace: template: ifCondition', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'if (!!__a) __b': 'if (__a) __b',
        }),
    };
    
    const {code} = putout('if (!!y) fn()', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'if (y)\n  fn();';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace: template: ifCondition: body', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'if (!!__a) __b': 'if (__a) __b',
        }),
    };
    
    const {code} = putout('if (!!y) {fn()}', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'if (y)\n  {fn()};';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace: template: object pattern', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const __a = __b.__a': 'const {__a} = __b',
        }),
    };
    
    const {code} = putout('const hello = world.hello', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const {\n  hello\n} = world;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace: template: infinite loop', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const __a = __b': 'let __a = __b',
            'let __a = __b': 'const __b = __a',
        }),
    };
    
    const {code} = putout('const hello = world', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const world = hello;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: plugins: replace: template: same', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'console.log.apply(/*hello*/ console, lines)': 'console.log(...lines)',
        }),
    };
    
    const {code} = putout('console.log(...lines)', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'apply-to-spread': applyToSpread,
        }],
    });
    
    const expected = 'console.log(...lines)';
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: linked literal node', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'import __a from "__b"': 'const __a = require("__b")',
        }),
    };
    
    const {code} = putout('import hello from "world"', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'apply-to-spread': applyToSpread,
        }],
    });
    
    const expected = 'const hello = require("world");';
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: function: __imports', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'import __imports from "__a"': ({__imports, __a}) => {
                let result = 'const {\n';
                
                for (const {imported} of __imports) {
                    result += `${imported.name},`;
                }
                
                result += `\n} = require("${__a.value}");`;
                
                return result;
            },
        }),
    };
    
    const {code} = putout('import {hello} from "world"', {
        runPlugins,
        plugins: [{
            'convert-esm-to-commonjs': applyToSpread,
        }],
    });
    
    const expected = `const {\n  hello\n} = require('world');`;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: function: __args', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'function __a(__args){}': 'const __a = (__args) => {}',
        }),
    };
    
    const {code} = putout('function hello(a, b, c){}', {
        runPlugins,
        plugins: [{
            'convert-to-arrow': applyToSpread,
        }],
    });
    
    const expected = 'const hello = (a, b, c) => {};';
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: expression', (t) => {
    const rm = {
        report: () => '',
        replace: () => ({
            'if (!!__a) __b': 'if (__a) __b',
        }),
    };
    
    const {code} = putout(`if (!!true) {console.log('sh');}`, {
        runPlugins,
        plugins: [
            ['rm', rm],
        ],
    });
    
    const expected = `if (true)\n  {console.log('sh');};`;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: filter', (t) => {
    const rm = {
        report: () => '',
        filter: () => false,
        replace: () => ({
            'return x': 'return',
        }),
    };
    
    const {code} = putout('return x', {
        runPlugins,
        plugins: [{
            rm,
        }],
    });
    
    const expected = 'return x';
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: path', (t) => {
    const rm = {
        report: () => '',
        replace: () => ({
            'return x': (vars, path) => {
                path.getPrevSibling().remove();
                return 'return x';
            },
        }),
    };
    
    const {code} = putout('var y; return x', {
        runPlugins,
        plugins: [{
            rm,
        }],
    });
    
    const expected = 'return x;';
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: match', (t) => {
    const rm = {
        report: () => '',
        match: () => ({
            'const __array = __': ({__array}) => {
                const {elements} = __array;
                return !elements.find(Boolean);
            },
        }),
        replace: () => ({
            'const __array = __x': '',
        }),
    };
    
    const {code} = putout('const [] = array', {
        runPlugins,
        plugins: [{
            rm,
        }],
    });
    
    const expected = '';
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: match: not found', (t) => {
    const rm = {
        report: () => '',
        match: () => ({
            'const [,] = __': ({__array}) => {
                const {elements} = __array;
                return !elements.find(Boolean);
            },
        }),
        replace: () => ({
            'const __array = __x': '',
        }),
    };
    
    const {code} = putout('const [] = array', {
        runPlugins,
        plugins: [{
            rm,
        }],
    });
    
    const expected = '';
    
    t.deepEqual(code, expected);
    t.end();
});

module.exports.replace = () => ({
    'const __array = __': '',
    'const {} = __': '',
    '([]) => __a': '() => __a',
    '({}) => __a': '() => __a',
});

test('putout: runner: root vars: no parent', (t) => {
    const result = putout(fixture.noParent, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = {
        code: '\n',
        places: [],
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: runner: parser: no loc', (t) => {
    const rmLoc = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => {
            return {
                Program(path) {
                    path.node.loc = null;
                    push(path);
                },
            };
        },
    };
    
    const {places} = putout('', {
        plugins: [{
            'rm-loc': rmLoc,
        }],
    });
    
    const expected = [{
        rule: 'rm-loc',
        message: '',
        position: {
            line: 0,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: runner: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    const expected = fixture.shebangFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: debug', (t) => {
    const {DEBUG} = process.env;
    process.env.DEBUG = 'putout:runner:fix';
    
    const debugFn = stub();
    debugFn.enabled = true;
    const debug = stub().returns(debugFn);
    
    mockRequire('debug', debug);
    reRequire('../lib/run-fix');
    const {runPlugins} = reRequire('..');
    const putout = reRequire('putout');
    
    const {code} = putout(fixture.debug, {
        fix: true,
        runPlugins,
        plugins: [
            'remove-unused-variables',
        ],
    });
    const expected = '\n';
    process.env.DEBUG = DEBUG;
    
    stopAll();
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: babel', (t) => {
    const {code} = putout(fixture.babel, {
        runPlugins,
        plugins: [
            'babel/codemod-optional-catch-binding',
        ],
    });
    
    t.deepEqual(code, fixture.babelFix);
    t.end();
});

