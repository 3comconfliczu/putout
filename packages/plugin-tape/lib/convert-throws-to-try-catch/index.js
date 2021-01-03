'use strict';

const {template} = require('putout');
const insertRequireTryCatch = require('../insert-require-try-catch');

module.exports.report = () => 'try-catch should be used instead of t.throws';

module.exports.replace = () => ({
    't.throws(__a, __b, __c)': ({__a, __b}, path) => {
        const tryCatchNode = template.ast.fresh(`
            const [error] = tryCatch(__a)
        `);
        
        tryCatchNode.declarations[0].init.arguments[0] = __a;
        
        path.insertBefore(tryCatchNode);
        insertRequireTryCatch(path);
        
        return `t.equal(error.message, '${__b.pattern}', __c)`;
    },
});
