## About
This repository demonstrates an integration between the Figma plugin [Tokens Studio](https://tokens.studio/), and [Style Dictionary](https://amzn.github.io/style-dictionary/) with some customisation so that the following requirements have been met:
- A single file of CSS variables is created, containing all primitives (static tokens), alisases (theme tokens) and component tokens.
- Aliases are not resolved, so that the relationships between tokens (i.e. when a token equals a token) are preserved.
- Typography composite tokens are properly parsed (i.e. a typography token containing a font weight, font size, line height, and font family is properly parsed preserving aliases).

## Running the repository
First, install dependencies
```
yarn install
```
