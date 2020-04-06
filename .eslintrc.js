const [OFF, WARN, ERROR] = [0, 1, 2];

module.exports = {
  root: true,

  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },

  extends: [
    'eslint-config-airbnb',
    'eslint-config-prettier',
    'eslint-config-prettier/react',
  ],
  plugins: ['eslint-plugin-react-hooks', 'eslint-plugin-prettier'],

  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    'no-console': [ERROR, { allow: ['error', 'warn', 'info'] }],

    'jsx-a11y/anchor-is-valid': [
      ERROR,
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],

    'react-hooks/rules-of-hooks': ERROR, // Checks rules of Hooks
    'react-hooks/exhaustive-deps': WARN, // Checks effect dependencies

    'react/jsx-filename-extension': [
      ERROR,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],

    'import/extensions': [ERROR, 'always', { ignorePackages: true }],

    'prettier/prettier': ERROR,
  },

  overrides: [
    {
      files: ['**/*.d.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        // type reference
        'spaced-comment': OFF,
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },

        project: 'tsconfig.json',

        warnOnUnsupportedTypeScriptVersion: true,
      },
      plugins: [
        'eslint-plugin-react-hooks',
        '@typescript-eslint/eslint-plugin',
        'eslint-plugin-import/config/typescript',
        'eslint-plugin-prettier',
      ],

      rules: {
        'default-case': OFF,

        'no-dupe-class-members': OFF,

        'no-array-constructor': OFF,
        '@typescript-eslint/no-array-constructor': WARN,
        '@typescript-eslint/no-namespace': ERROR,
        'no-unused-vars': OFF,
        '@typescript-eslint/no-unused-vars': [
          WARN,
          {
            args: 'none',
            ignoreRestSiblings: true,
          },
        ],
        'no-useless-constructor': OFF,
        '@typescript-eslint/no-useless-constructor': WARN,
      },
    },
    {
      files: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx'],
      parser: '@typescript-eslint/parser',
      rules: {
        'import/no-extraneous-dependencies': WARN,
        'react/prefer-stateless-function': WARN,
      },
    },
  ],
};
