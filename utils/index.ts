// https://github.com/vuejs/core/issues/5303#issuecomment-1543596383
import {
	toRaw,
	isRef,
	isReactive,
	isProxy
} from 'vue'

export function deepToRaw<T extends Record<string, any>> (sourceObj: T): T {
	const objectIterator = (input: any): any => {
		if (Array.isArray(input)) {
			return input.map(item => objectIterator(item))
		} if (isRef(input) || isReactive(input) || isProxy(input)) {
			return objectIterator(toRaw(input))
		} if (input && typeof input === 'object') {
			return Object.keys(input).reduce((acc, key) => {
				acc[key as keyof typeof acc] = objectIterator(input[key])
				return acc
			}, {} as T)
		}
		return input
	}

	return objectIterator(sourceObj)
}

export function isTargetBlank (url: string) {
	return /https?:\/\/.*/.test(url)
}

export function getLocaleSlugs (slugs: Record<string, string>) {
	if (!slugs) { return {} }
	const i18nSlugs: {
		[key: string]: {
			slug: string
		}
	} = {}
	for (const locale of Object.keys(slugs)) {
		i18nSlugs[locale] = {
			slug: slugs[locale]
		}
	}
	return i18nSlugs
}
