<script setup>
// Product picture with a graceful fallback if the file is missing.
// Paths like "/images/…" are resolved against the site's base path, so the site also works from a sub-folder
// (e.g. GitHub Pages at /munir-e-s-/).
import { computed, ref, watch } from "vue";
const props = defineProps({ src: String, alt: { type: String, default: "" }, eager: Boolean });
const failed = ref(false);
watch(() => props.src, () => (failed.value = false));
const withBase = (s) => (s && s.startsWith("/") && !s.startsWith("//") ? import.meta.env.BASE_URL + s.slice(1) : s);
const url = computed(() => withBase(failed.value ? "/images/placeholder.svg" : props.src));
</script>

<template>
  <img :src="url" :alt="alt" :loading="eager ? 'eager' : 'lazy'" decoding="async" width="600" height="600" @error="failed = true" />
</template>
