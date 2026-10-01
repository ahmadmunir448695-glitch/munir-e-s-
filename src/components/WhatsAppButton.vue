<script setup>
// Reusable WhatsApp link button. Pass `message` to pre-fill the chat.
import { computed } from "vue";
import Icon from "./Icon.vue";
import { whatsappLink, generalMessage } from "../utils/whatsapp.js";

const props = defineProps({
  message: { type: String, default: "" },
  label: { type: String, default: "WhatsApp" },
  variant: { type: String, default: "solid" }, // solid | outline | light | icon
  size: { type: String, default: "md" }, // sm | md | lg
  block: { type: Boolean, default: false },
});
const href = computed(() => whatsappLink(props.message || generalMessage()));
const sizes = { sm: "px-3 py-2 text-xs", md: "px-5 py-3 text-sm", lg: "px-6 py-3.5 text-base" };
const variants = {
  solid: "bg-whatsapp text-white hover:bg-whatsapp-dark shadow-[0_8px_20px_-8px_rgb(37_211_102/.7)]",
  outline: "border border-whatsapp/50 bg-white text-whatsapp-dark hover:bg-whatsapp/10",
  light: "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20",
};
</script>

<template>
  <a v-if="variant === 'icon'" :href="href" target="_blank" rel="noopener" :aria-label="label" :title="label"
    class="inline-grid h-10 w-10 place-items-center rounded-xl bg-whatsapp text-white transition hover:bg-whatsapp-dark">
    <Icon name="whatsapp" class="h-5 w-5" />
  </a>
  <a v-else :href="href" target="_blank" rel="noopener"
    :class="['inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition duration-200 active:scale-[.98]', sizes[size], variants[variant], block && 'w-full']">
    <Icon name="whatsapp" :class="size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'" />
    <span>{{ label }}</span>
  </a>
</template>
