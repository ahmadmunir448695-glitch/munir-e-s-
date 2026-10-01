<script setup>
// Product picture with a graceful fallback if the file is missing.
import { ref, watch } from "vue";
const props = defineProps({ src: String, alt: { type: String, default: "" }, eager: Boolean });
const failed = ref(false);
watch(() => props.src, () => (failed.value = false));
</script>

<template>
  <img :src="failed ? '/images/placeholder.svg' : src" :alt="alt" :loading="eager ? 'eager' : 'lazy'" decoding="async" width="600" height="600" @error="failed = true" />
</template>
