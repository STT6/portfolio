import { defineNuxtPlugin } from 'nuxt/app'
import * as klaro from 'klaro'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			klaro
		}
	}
})
