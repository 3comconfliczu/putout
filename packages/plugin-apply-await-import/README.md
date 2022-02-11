# @putout/plugin-apply-await-import [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-await-import.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-await-import"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to apply `await-import`.

## Install

```
npm i @putout/plugin-apply-await-import
```

## Rule

```json
{
    "rules": {
        "apply-await-import": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const {readFile} = import('fs/promises');
```

## ✅ Example of correct code

```js
const {readFile} = await import('fs/promises');
```

## License

MIT
