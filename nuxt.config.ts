// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			title: 'Starter',
			meta: [
				{ charset: 'utf-8' }
			],
			link: [
				// { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=FONTFAMILY:300,400,700&subset=latin-ext&display=swap' },
				// { rel: 'preconnect', href: 'href="https://fonts.gstatic.com' },
				// { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
			]
		}
	},
	vite: {
		css: {
			devSourcemap: process.env.NODE_ENV === 'development'
		}
	},
	experimental: {
		typedPages: true,
		headNext: true,
		asyncContext: true,
		viewTransition: true
	},
	modules: [
		'@nuxtjs/eslint-module',
		['@nuxtjs/stylelint-module', {
			chokidar: true,
			lintInWorker: true
		}],
		'@formkit/nuxt',
		'./modules/propercore/module',
		'@pinia/nuxt',
		'@nuxtjs/i18n'
	],
	css: [
		'~/assets/scss/main.scss'
	],
	runtimeConfig: {
		public: {
			API_BASE_URL: process.env.API_BASE_URL,
			GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID
		}
	},
	formkit: {
		configFile: './formkit.config.js'
	},
	i18n: {
		locales: [
			{
				code: 'sl',
				name: 'Slovenščina',
				iso: 'sl_SI'
			},
			{
				code: 'en',
				name: 'English',
				iso: 'en_EN',
			}
		],
		defaultLocale: 'en',
		rootRedirect: null,
		detectBrowserLanguage: false,
		strategy: 'prefix',
		vueI18n: './i18n.config.ts'
	}
})
