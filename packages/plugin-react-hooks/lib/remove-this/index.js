'use strict';

const {replaceWith} = require('putout').operator;

const {traverseClass} = require('../common');

module.exports.report = ({name}) => `should be used "${name}" instead of "this.${name}"`;

module.exports.fix = ({path}) => {
    replaceWith(path, path.get('property'));
};

module.exports.find = (ast, {push, traverse}) => {
    traverseClass(traverse, ast, {
        ThisExpression(path) {
            const {parentPath} = path;
            const propertyPath = parentPath.get('property');
            
            const {name} = propertyPath.node;
            push({
                name,
                path: parentPath,
            });
        },
    });
};

