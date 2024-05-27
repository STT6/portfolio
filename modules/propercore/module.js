import { fileURLToPath } from 'url'
import path from 'path'
import { defineNuxtModule } from '@nuxt/kit'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineNuxtModule({
	name: 'propercore-module',
	configKey: 'propercore-module',
	setup (_, nuxt) {
		// Auto register composables
		nuxt.hook('imports:dirs', (dirs) => {
			dirs.push(path.resolve(__dirname, './composables'))
		})

		// Auto register pages
		nuxt.hook('pages:extend', (pages) => {
			pages.push({
				name: 'propercore-page',
				path: '/page/:slug',
				file: path.resolve(__dirname, './pages/page/[slug].vue')
			})
		})

		// Pinia store modules are auto imported
	}
})
