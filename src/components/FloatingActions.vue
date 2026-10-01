<script setup>
// Floating WhatsApp button (always) and scroll-to-top button (after scrolling down).
import { ref, onMounted, onBeforeUnmount } from "vue";
import Icon from "./Icon.vue";
import { whatsappLink, generalMessage } from "../utils/whatsapp.js";

const showTop = ref(false);
const onScroll = () => (showTop.value = window.scrollY > 600);
onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
    <Transition name="fade">
      <button v-if="showTop" type="button" class="grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-charcoal-900 shadow-lg transition hover:border-brand-400 hover:text-brand-600" aria-label="Back to top" title="Back to top" @click="toTop">
        <Icon name="up" class="h-5 w-5" />
      </button>
    </Transition>
    <a :href="whatsappLink(generalMessage())" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp" title="Chat on WhatsApp"
      class="group relative grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_25px_-6px_rgb(37_211_102/.7)] transition hover:scale-105 hover:bg-whatsapp-dark">
      <span class="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-25 motion-reduce:hidden" />
      <Icon name="whatsapp" class="relative h-7 w-7" />
    </a>
  </div>
</template>
