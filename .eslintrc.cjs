module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'@nuxtjs/eslint-config-typescript',
		'plugin:vue/vue3-recommended'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['vue', '@typescript-eslint'],
	// add your custom rules here
	rules: {
		'vue/html-indent': ['error', 'tab'],
		'vue/no-v-html': 'off',
		'vue/html-closing-bracket-newline': 'error',
		'vue/require-default-prop': 'off',
		'vue/multi-word-component-names': 'off',
		'vue/script-setup-uses-vars': 'error',
		'vue/no-v-for-template-key': 'off',
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'no-console':
			process.env.NODE_ENV === 'production'
				? 'error'
				: 'off',
		camelcase: 'off'
	}
}
