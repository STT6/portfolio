// Source: https://kas.kim/blog/using-dayjs-in-nuxt-3-as-plugin/
import dayjs from 'dayjs'
import sl from 'dayjs/locale/sl'
// import relativeTime from 'dayjs/plugin/relativeTime.js'

declare module '#app' {
	interface NuxtApp {
		$dayjs: dayjs.Dayjs
	}
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
	}
}

export default defineNuxtPlugin((nuxtApp) => {
	// dayjs.extend(relativeTime)
	// eslint-disable-next-line import/no-named-as-default-member
	dayjs.locale(sl)
	nuxtApp.provide('dayjs', dayjs)
})
