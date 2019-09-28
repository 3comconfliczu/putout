'use strict';

module.exports.report = () => 'useState should be used instead of Component';

module.exports.fix = (path) => {
    const {node} = path;
    
    node.imported.name = 'useState';
    node.local.name = 'useState';
};

module.exports.traverse = ({push}) => {
    return {
        ImportDeclaration(path) {
            const {source} = path.node;
            
            if (source.value !== 'react')
                return;
            
            const name = 'Component';
            const specifiersPaths = path.get('specifiers');
            for (const specPath of specifiersPaths) {
                if (!specPath.isImportSpecifier())
                    continue;
                
                if (!specPath.get('imported').isIdentifier({name}))
                    continue;
                
                push(specPath);
            }
        },
    };
};
