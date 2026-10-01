<script setup>
// Product search box. By default it opens the Products page with the search;
// with `live`, it just updates v-model as you type (used on the Products page itself).
import { ref, watch, useId, onMounted } from "vue";
import { useRouter } from "vue-router";
import Icon from "./Icon.vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  live: { type: Boolean, default: false },
  placeholder: { type: String, default: "Search cables, fans, LED bulbs, switches…" },
  dark: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
});
const emit = defineEmits(["update:modelValue", "submitted"]);
const router = useRouter();
const text = ref(props.modelValue);
const inputId = useId();
const inputEl = ref(null);
onMounted(() => props.autofocus && inputEl.value?.focus());
watch(() => props.modelValue, (v) => (text.value = v));

function onInput() {
  if (props.live) emit("update:modelValue", text.value);
}
function submit() {
  const q = text.value.trim();
  if (props.live) emit("update:modelValue", q);
  else router.push({ name: "products", query: q ? { q } : {} });
  emit("submitted");
}
</script>

<template>
  <form role="search" class="relative w-full" @submit.prevent="submit">
    <label class="sr-only" :for="inputId">Search products</label>
    <Icon name="search" :class="['pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2', dark ? 'text-white/60' : 'text-gray-400']" />
    <input ref="inputEl" :id="inputId" v-model="text" type="search" :placeholder="placeholder" autocomplete="off" @input="onInput"
      :class="['w-full rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition',
        dark ? 'border border-white/15 bg-white/10 text-white placeholder-white/50 focus:border-brand-400 focus:bg-white/15'
             : 'border border-gray-200 bg-gray-50 text-charcoal-900 placeholder-gray-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15']" />
  </form>
</template>
