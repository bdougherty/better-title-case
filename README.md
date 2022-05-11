# better-title-case

> Convert a string to title case based on the [Daring Fireball](https://daringfireball.net/2008/05/title_case) rules.

## Rules

- If the string is all-caps, it will be corrected
- The following words are not capitalized by default: a, an, and, at, but, by, for, in, nor, of, on, or, so, the, to, up, yet, v, v., vs, and vs.
- Words with capital letters other than the first are assumed to be capitalized properly and are skipped
- It also skips any word that looks like a file path, file name, or URL
- The first and last word are always capitalized
- Sub-strings (those that are within quotes or parens/braces) are capitalized according to the same rules

## Installation

```
$ npm install --save better-title-case
```

## Usage

```js
import titleCase from 'better-title-case';
console.log(titleCase('Nothing to Be Afraid of?'));
// Nothing to Be Afraid Of?
```

## Advanced

You can configure `better-title-case` to add your own excluded words to the default list, or to prevent the use of the default list by passing a `config` object as the second parameter.

### excludedWords

Type: `[string]`<br>
Default: `[]`

Additional words to exclude from capitalization.

```js
titleCase('Nothing to be afraid of?', {
	excludedWords: ['be']
});
// 'Nothing to be Afraid Of?'
```

### useDefaultExcludedWords

Type: `boolean`<br>
Default: `true`

Disable the usage of the default list of excluded words.

```js
titleCase('Nothing to be afraid of?', {
	useDefaultExcludedWords: false
});
// 'Nothing To Be Afraid Of?'
```

### preserveWhitespace

Type: `boolean`<br>
Default: `false`

Maintain extra whitespace between words. By default, all whitespace between words is collapsed to a single space.

```js
titleCase('Nothing  to be   afraid of?', {
	preserveWhitespace: true
});
// 'Nothing  To Be   Afraid Of?'
```

## License

MIT © [Brad Dougherty](https://brad.is)
