import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import prettier from 'eslint-plugin-prettier';
import _import from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import * as cssPlugin from 'eslint-plugin-css';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:import/recommended',
      'prettier',
    ),
  ),
  {
    plugins: {
      prettier,
      css: cssPlugin,
      import: fixupPluginRules(_import),
      'unused-imports': unusedImports,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },

      ecmaVersion: 2020,
      sourceType: 'module',
    },

    settings: {
      'import/resolver': {
        node: {
          paths: ['src'],
        },
      },
    },

    rules: {
      'no-useless-computed-key': 0,
      'import/no-named-as-default': 0,

      'no-console': [
        'warn',
        {
          allow: ['error'],
        },
      ],

      'no-eval': 'error',
      'import/first': 'error',
      'operator-linebreak': 0,
      'no-param-reassign': 0,
      'object-curly-newline': 0,
      'arrow-body-style': 0,
      'import/prefer-default-export': 0,
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
    },
  },
];
