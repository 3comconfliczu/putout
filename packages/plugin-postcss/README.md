# @putout/plugin-postcss [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-postcss.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-postcss"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/postcss?path=packages/plugin-postcss
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/postcss.svg?path=packages/plugin-postcss

`postcss` plugin helps to migrate to latest `postcss` version according to [migration guide](https://evilmartians.com/chronicles/postcss-8-plugin-migration).

## Install

```
npm i @putout/plugin-postcss -D
```

## Rules

```json
{
    "rules": {
        "postcss/replace-loader-with-creator": "on"
    }
}
```

## replace-loader-with-creator


### ❌ Incorrect code example

```js
module.exports = postcss.plugin('postcss-dark-theme-class', (opts = {}) => {
    checkOpts(opts)
    
    return (root, result) => {
        root.walkAtRules((atrule) => {
        })
    }
})
```

### ✅ Correct code Example

```js
module.exports = (opts = {}) => {
    checkOpts(opts)
    
    return {
        postcssPlugin: 'postcss-dark-theme-class',
        Once(root) {
            root.walkAtRules((atrule) => {})
        }
    }
};

module.exports.postcss = true
```

## License

MIT

