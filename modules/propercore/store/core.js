import { defineStore } from 'pinia'

export const useCoreStore = defineStore({
	id: 'propercore-store',

	state: () => ({
		locales: [],
		settings: [],
		menus: [],
		languages: []
	}),
	actions: {
		async initApp () {
			// Initial app call to get core data from backend
			// const response = await useApiFetch.get('init')
			// this.locales = response.locales
			// this.settings = response.settings
			// this.menus = response.menus
			// this.languages = response.languages
		}
	},
	getters: {
		getLocales: state => state.locales,
		getSettings: state => state.settings,
		getMenus: state => state.menus,
		getLanguages: state => state.languages
	}
})
