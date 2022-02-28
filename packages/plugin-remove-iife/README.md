# @putout/plugin-remove-iife [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-iife.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-iife"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove [iife](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).

## Install

```
npm i @putout/plugin-remove-iife
```

## Rule

```json
{
    "rules": {
        "remove-iife": "on"
    }
}
```

## ❌ Example of incorrect code

```js
(function() {
    console.log('hello');
})();
```

## ✅ Example of correct code

```js
console.log('hello');
```

## License

MIT
