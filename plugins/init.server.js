import { defineNuxtPlugin } from 'nuxt/app'
import { useCoreStore } from '~/modules/propercore/store/core'

export default defineNuxtPlugin(async () => {
	// Init core
	const coreStore = useCoreStore()
	await coreStore.initApp()
})
