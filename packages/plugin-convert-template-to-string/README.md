# @putout/plugin-convert-template-to-string [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-template-to-string.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-template-to-string"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to find and remove useless `template string`.

## Install

```
npm i @putout/plugin-convert-template-to-string
```

## Rule

```json
{
    "rules": {
        "convert-template-to-string": "on"
    }
}
```

## ❌ Incorrect code example

```js
const s = `${a + b}`;
```

## ✅ Correct code Example

```js
const s = String(a + b);
```

## License

MIT
