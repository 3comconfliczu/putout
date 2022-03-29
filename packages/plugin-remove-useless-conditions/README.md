# @putout/plugin-remove-useless-conditions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-conditions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-conditions "npm"

> The **if** statement executes a statement if a specified condition is **truthy**. If the condition is **falsy**, another statement can be executed.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `conditions`.

## Install

```
npm i @putout/plugin-remove-useless-conditions
```

## Rule

```json
{
    "rules": {
        "remove-useless-conditions": "on"
    }
}
```

## ❌ Example of incorrect code

```js
if (zone?.tooltipCallback) {
    zone.tooltipCallback(e);
}

if (a)
    alert('hello');
else
    alert('hello');
```

## ✅ Example of correct code

```js
zone?.tooltipCallback(e);

alert('hello');
```

## License

MIT
