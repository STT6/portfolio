type TypeOfUseFetch = typeof useFetch
interface InterfaceUseApiFetch extends TypeOfUseFetch {
	get: typeof useFetch
	post: typeof useFetch
	update: typeof useFetch
	delete: typeof useFetch
}

const request: TypeOfUseFetch = (url, options) => {
	const { $i18n } = useNuxtApp()
	const config = useRuntimeConfig()
	const { params, ...rest } = options || {}
	const key = options?.key || `${url}-${JSON.stringify(params)}-${options?.method || 'GET'}`
	return useFetch(url, {
		baseURL: config.public.API_BASE_URL,
		params: {
			...($i18n ? { lang: $i18n.locale } : {}),
			...params
		},
		...rest,
		key
	})
}

const useApiFetch: InterfaceUseApiFetch = function (url, options) {
	return request(url, options)
}

useApiFetch.get = (url, options) => request(url, { ...options, method: 'get' })
useApiFetch.post = (url, options) => request(url, { ...options, method: 'post' })
useApiFetch.update = (url, options) => request(url, { ...options, method: 'put' })
useApiFetch.delete = (url, options) => request(url, { ...options, method: 'delete' })

export default useApiFetch
