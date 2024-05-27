<script setup lang="ts">
const { params } = useRoute()

const url = `page/${params.slug}`
const { data: page } = await useApiFetch.get(url)

// Page head data
useHead({
	...(page.value?.title && { title: page.value?.title }),
	meta: [
		...(page.value?.title ? [{ hid: 'title', name: 'title', content: page.value?.title }] : []),
		...(page.value?.lead ? [{ hid: 'description', name: 'description', content: page.value?.lead }] : []),
		...(page.value?.title ? [{ hid: 'og:title', property: 'og:title', content: page.value?.title }] : []),
		...(page.value?.lead ? [{ hid: 'og:description', property: 'og:description', content: page.value?.lead }] : []),
		...(page.value?.picture ? [{ hid: 'og:image', property: 'og:image', content: page.value?.picture.default }] : [])
	]
})
</script>
<template>
	<div v-if="page" class="container">
		<div class="content-title">
			<h1 v-text="page.title" />
		</div>
		<div class="content-container">
			<p v-if="page.lead" class="lead" v-text="page.lead" />
			<div v-if="page.content" class="container-content" v-html="page.content" />
		</div>
	</div>
</template>
