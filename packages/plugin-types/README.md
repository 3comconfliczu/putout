# @putout/plugin-types [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-types.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-types "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to help with transforming code related to types.

## Install

```
npm i putout @putout/plugin-types -D
```

## Options

```json
{
    "rules": {
        "types/declare": "on",
        "types/convert-typeof-to-istype": "on"
    }
}
```

## Rules

### declare

Based on [`@putout/operator-declare`](https://github.com/coderaiser/putout/tree/master/packages/operator-declare#putoutoperator-declare-).
Supported assertions:

- `isString`;
- `isNumber`;
- `isFn`;
- `isBool`;
- `isObject`;
- `isUndefined`;
- `isSymbol`;
- `isNull`;

#### ❌ Example of incorrect code

```js
const isString = (a) => typeof a === 'string';
isString('hello');
```

#### ✅ Example of correct code

```js
const isString = (a) => typeof a === 'string';
isString('hello');
```

When you want to skip some declaration use `dismiss`:

```json
{
    "rules": {
        "types/declare": ["on", {
            "dismiss": [
                "isString"
            ]
        }]
    }
}
```

### convert-typeof-to-is-type

> The `typeof` operator returns a string indicating the type of the unevaluated operand.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

#### ❌ Example of incorrect code

```js
if (typeof a === 'boolean')
    return x;
```

#### ✅ Example of correct code

```js
const isBool = (a) => typeof a === 'boolean';

if (isBool(a))
    return x;
```

## License

MIT
