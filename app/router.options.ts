import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
	scrollBehavior: (to, _, savedPosition) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (!to.hash) {
					resolve({
						left: savedPosition?.left || 0,
						top: savedPosition?.top || 0
					})
				} else {
					const top = window.pageYOffset + document?.getElementById(to.hash.substring(1))?.getBoundingClientRect()?.top || 0
					resolve({
						left: 0,
						top: top || 0
					})
				}
			}, 500)
		})
	}
}
