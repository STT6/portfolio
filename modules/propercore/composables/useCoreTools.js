import { useCoreStore } from '~/modules/propercore/store/core'

/**
 * Get locale translation
 *
 * @param key
 * @param defaultValue
 * @returns {*}
 */
export const $locale = (key, defaultValue) => {
	const jslocales = useCoreStore().getLocales
	try {
		return key.split('.').reduce((o, i) => o[i], jslocales)
	} catch (e) {
		return defaultValue || key
	}
}

/**
 * Get setting value
 *
 * @param key
 * @param defaultValue
 * @returns {*}
 */
export const $setting = (key, defaultValue) => {
	const jssettings = useCoreStore().getSettings
	try {
		return key.split('.').reduce((o, i) => o[i], jssettings)
	} catch (e) {
		return defaultValue || key
	}
}
