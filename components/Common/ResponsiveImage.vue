<template>
	<picture v-if="image">
		<source
			v-if="image.webp"
			:srcset="image.webp"
			type="image/webp"
			class="img-fluid"
		>
		<source
			v-if="image.default"
			:srcset="image.default"
			:type="imageType"
			class="img-fluid"
		>
		<img
			:draggable="false"
			:src="image.default ? image.default : image"
			:alt="title"
			class="img-fluid"
		>
	</picture>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
	image: {
		type: [Object, Boolean, String]
	},
	title: {
		type: String
	}
})

const imageType = computed(() => {
	if (props.image && props.image.default) {
		return `image/${props.image.default.split('.').pop().toLowerCase()}`
	}
	return null
})
</script>
