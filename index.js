const StyleDictionary = require('style-dictionary').extend({
  source: ['output.tokens.json'],
  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css',
        'typography/shorthand',
      ],
      buildPath: 'tokens/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
      options: {
        outputReferences: true,
      },
    },
  },
});

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

StyleDictionary.buildAllPlatforms();
