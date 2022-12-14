module.exports = {
  // for normal env
  // plugins run before presets
  // plugins loading order, first to last
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }], // supporting decorators, need to place before `class-properties`
    ['@babel/plugin-proposal-class-properties', { loose: true }], // supporting `handleChange = () => {}` syntax
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    '@babel/plugin-syntax-dynamic-import', // supporting `() => import('./Home')` syntax
    'babel-plugin-lodash', // for lodash tree shaking
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'lib', style: false },
      'antd',
    ], // for `antd`, `style: true` loading `.less` file
  ],

  // presets loading order, last to first
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
        loose: false,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  env: {
    // for test env
    test: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-syntax-dynamic-import',
        'babel-plugin-lodash',
      ],
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        '@babel/preset-react',
      ],
    },
  },
};
