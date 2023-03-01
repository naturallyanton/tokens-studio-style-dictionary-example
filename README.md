## About

This repository demonstrates an integration between the Figma plugin [Tokens Studio](https://tokens.studio/), and [Style Dictionary](https://amzn.github.io/style-dictionary/) with some customisation so that the following requirements have been met:

- A single file of CSS variables is created, containing all primitives (static tokens), alisases (theme tokens) and component tokens. Check `tokens/tokens.css`.
- Aliases are not parsed, so that the relationships between tokens (i.e. when a token equals a token) are preserved. For example, `--font-size-200: var(--font-size-base)*2;`.
- Typography composite tokens preserve aliases (i.e. a typography token containing a font weight, font size, line height, and font family). For example, `--content-lg: var(--font-weight-400) var(--font-size-100)/normal var(--font-family-content);`.

## Running the repository

First, install dependencies:

```
yarn install
```

Paste the JSON exported from the Tokens Studio plugin to the `input.tokens.json` file.

Compile the input tokens into a format compatible with Style Dictionary:

```
yarn build-tokens
```

Compile the generated `output.tokens.json` into CSS variables running

```
node index
```

## In detail

Input tokens from the `input.tokens.json` file are compiled running the following script from the [token-transformer](https://www.npmjs.com/package/token-transformer) plugin:

```
"build-tokens":
"token-transformer input.tokens.json output.tokens.json --expandTypography=false --preserveRawValue=true --resolveReferences=false",
```

Style Dictionary is configured so that references are preserved in the output:

```
options: {
        outputReferences: true,
      },
```

A transformer transforms all tokens of type `typography` so that the output is a single value containing different alisases comprising a valid CSS `font` property:

```
StyleDictionary.registerTransform({
  name: 'typography/shorthand',
  type: 'value',
  transitive: true,
  matcher: ({ type }) => type === 'typography',
  transformer: ({ value }) => {
    const { fontWeight, fontSize, lineHeight = 'normal', fontFamily } = value;
    return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
  },
});
```

Note that, currently, line-height is not properly managed via Tokens Studio. Until a solution has been found, the `lineHeight` value is hardcoded to the standard `normal`.

## To do

- [ ] Find the most appropriate solution to manage line height tokens in Tokens Studio.
- [ ] When a token references another token within the same set, its value is parsed instead of preserving the alias.
- [ ] Solve the `--size-base` issue, where `8px` is parsed as `8rem`.
