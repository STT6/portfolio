<script setup lang="ts">
import CookiesConsent from '@/components/Common/CookiesConsent.vue'
</script>

<template>
    <div>
        <AppHeader />
        <slot />
        <AppFooter />
    </div>
</template>
