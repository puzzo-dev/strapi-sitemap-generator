// ESLint v9+ flat config for React + TypeScript
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

// Global ignores for tooling/config files we don't lint
const ignoredFiles = [
    'tailwind.config.ts',
    '**/tailwind.config.ts',
    'vite.config.ts',
    '**/vite.config.ts',
    'postcss.config.js',
    '**/postcss.config.js',
    'eslint.config.js',
    '**/eslint.config.js',
];

export default [
    {
        ignores: ignoredFiles,
    },
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            react,
            'react-hooks': reactHooks,
        },
        ignores: [
            'tailwind.config.ts',
            'vite.config.ts',
            'postcss.config.js',
            'eslint.config.js',
        ],
        rules: {
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'off',
            'react-hooks/exhaustive-deps': 'off',
            'no-console': 'off',
            'no-undef': 'off',
            'no-unused-vars': 'off',
            'no-var': 'error',
            'eqeqeq': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
];
