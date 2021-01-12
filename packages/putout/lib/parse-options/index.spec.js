'use strict';

const fs = require('fs');
const os = require('os');
const {join} = require('path');

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');

const {reRequire, stopAll} = mockRequire;

const parseOptions = require('.');

test('putout: parse-options: custom options rules overrides default match', (t) => {
    const customOptions = {
        rules: {
            'remove-only': 'on',
        },
    };
    
    const readOptions = stub().returns([
        join(__dirname, '..'),
        customOptions,
    ]);
    
    const {rules} = parseOptions({
        readOptions,
    });
    
    const result = rules['remove-only'];
    
    t.equal(result, 'on');
    t.end();
});

test('putout: parse-options: options rules overrides default match', (t) => {
    const customOptions = {
        rules: {
            'remove-only': 'off',
        },
    };
    
    const options = {
        rules: {
            'remove-only': 'on',
        },
    };
    
    const readOptions = stub().returns([
        join(__dirname, '..'),
        customOptions,
    ]);
    
    const {rules} = parseOptions({
        options,
        readOptions,
    });
    
    const result = rules['remove-only'];
    
    t.equal(result, 'on');
    t.end();
});

test('putout: parseOptions: readHomeOptions', (t) => {
    const readCodeMods = stub().returns([
        __dirname, {
        },
    
    ]);
    const readOptions = stub().returns([
        __dirname, {
            rules: {
                'remove-console': 'off',
            },
        },
    ]);
    
    const readHomeOptions = stub().returns({
        rules: {
            'remove-unused-variables': 'off',
        },
    });
    
    mockRequire('../../putout.json', {
    });
    
    const parseOptions = reRequire('.');
    
    const result = parseOptions({
        readOptions,
        readHomeOptions,
        readCodeMods,
    });
    
    const expected = {
        dir: __dirname,
        rules: {
            'remove-console': 'off',
            'remove-unused-variables': 'off',
        },
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: custom options more important then default match', (t) => {
    const empty = {};
    
    const readCodeMods = stub().returns([__dirname, empty]);
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    
    mockRequire('../../putout.json', {
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    });
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'off',
        },
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: custom match more important then custom options', (t) => {
    const empty = {};
    
    const readCodeMods = stub().returns([__dirname, empty]);
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: no code mods directory: .putout', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    
    const {readdirSync} = fs;
    fs.readdirSync = () => {
        throw 'error';
    };
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: code mods directory: .putout: exclude node_modules', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    
    const {readdirSync} = fs;
    fs.readdirSync = () => [
        'node_modules',
    ];
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        plugins: [],
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const hello = stub();
    
    mockRequire('../../putout.json', empty);
    
    const {readdirSync} = fs;
    fs.readdirSync = () => [
        'hello',
    ];
    
    mockRequire(join(__dirname, 'hello'), hello);
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: '.',
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
        plugins: [
            ['hello', hello],
        ],
    };
    
    stopAll();
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules: error', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    
    const {readdirSync} = fs;
    fs.readdirSync = () => {
        throw 'error';
    };
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: '.',
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readOptions: do not returns dir, load rules can not read', (t) => {
    const empty = {};
    
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const readOptions = stub().returns(['', empty]);
    
    mockRequire('../../putout.json', empty);
    
    const {readdirSync} = fs;
    fs.readdirSync = () => {
        throw 'error';
    };
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readHomeOptions,
        readCodeMods,
        readOptions,
        rulesdir: '.',
    });
    
    const expected = {
        dir: '',
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readOptions: .putout.json', (t) => {
    const empty = {};
    
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const readOptions = stub().returns(['../..', {}]);
    const sync = (a) => {
        if (a === '.putout.json')
            return '../../putout.json';
        
        throw 'error';
    };
    
    mockRequire('../../putout.json', empty);
    mockRequire('find-up', {sync});
    
    const {readdirSync} = fs;
    fs.readdirSync = () => {
        throw 'error';
    };
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readHomeOptions,
        readCodeMods,
        readOptions,
        rulesdir: '.',
    });
    
    const expected = {
        dir: '../..',
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: can not readd dir', (t) => {
    const empty = {};
    
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const readOptions = stub().returns(['.', empty]);
    
    mockRequire('../../putout.json', empty);
    
    const {readdirSync} = fs;
    fs.readdirSync = () => {
        throw 'error';
    };
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readHomeOptions,
        readCodeMods,
        readOptions,
        rulesdir: '.',
    });
    
    const expected = {
        dir: '.',
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readHomeOptions', (t) => {
    const empty = {};
    const readOptions = stub().returns([
        '.', {
            rules: {
                'remove-console': 'off',
            },
        },
    ]);
    
    const readCodeMods = stub().returns(empty);
    
    const {homedir} = os;
    const {readdirSync} = fs;
    
    os.homedir = stub().returns('/');
    fs.readdirSync = () => {
        throw 'error';
    };
    
    mockRequire('./package.json', empty);
    mockRequire('../../putout.json', empty);
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readCodeMods,
        rulesdir: '.',
    });
    
    const expected = {
        dir: '.',
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-console': 'off',
            'remove-only': 'on',
        },
    };
    
    os.homedir = homedir;
    fs.readdirSync = readdirSync;
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: no args', (t) => {
    const empty = {};
    const {homedir} = os;
    const read = stub().returns(['', {}]);
    const sync = stub();
    
    os.homedir = stub().returns('/');
    
    mockRequire('./recursive-read', read);
    mockRequire('./package.json', empty);
    mockRequire('../../putout.json', empty);
    mockRequire('find-up', {
        sync,
    });
    
    const parseOptions = reRequire('.');
    
    const result = parseOptions();
    
    const expected = {
        dir: '',
    };
    
    os.homedir = homedir;
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readOptions: package.json', (t) => {
    const empty = {};
    
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const read = stub().returns(['', {}]);
    
    mockRequire('../../putout.json', empty);
    mockRequire('./recursive-read', read);
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readHomeOptions,
        readCodeMods,
    });
    
    delete result.dir;
    
    const expected = {
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});
