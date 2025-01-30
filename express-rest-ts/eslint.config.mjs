import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ files: ['src/**/*.js'], languageOptions: { sourceType: 'script' } },
	{ languageOptions: { globals: { ...globals.node, ...globals.browser } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'import/first': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
			'no-undef': ['error', { typeof: true }],
			'no-import-assign': 'error',
			'no-unreachable': 'error',
			'no-extra-boolean-cast': 'off',
		},
	},
];
